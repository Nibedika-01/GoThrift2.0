import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";
import CartContext from "../CartContext";
import axios from "axios";
import { generateUniqueId } from "esewajs";

// PaymentComponent integrated within Checkout
const PaymentComponent = ({ amount, handlePayment, onClose }) => {
  return (
    <div className="bg-white p-6 rounded-3xl max-w-md w-full relative shadow-2xl">
      <div className="absolute top-0 left-0 w-24 h-24 bg-rose-200 rounded-full -translate-x-12 -translate-y-12 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-pink-200 rounded-full translate-x-10 translate-y-10 opacity-50"></div>
      <h3 className="text-lg font-semibold text-rose-700 mb-4 relative z-10">eSewa Payment</h3>
      <form onSubmit={handlePayment} className="flex flex-col gap-4 relative z-10">
        <div className="flex flex-col">
          <label htmlFor="amount" className="text-sm font-semibold text-rose-700 mb-2">
            Amount (Rs.):
          </label>
          <div className="relative">
            <input
              type="number"
              id="amount"
              value={amount}
              readOnly
              className="w-full p-4 pl-12 rounded-xl border-2 border-rose-200 bg-rose-50 text-rose-700 cursor-not-allowed"
              placeholder="Amount"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a5 5 0 00-10 0v2m-2 7h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl hover:from-rose-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
          >
            Pay with eSewa
          </button>
        </div>
      </form>
    </div>
  );
};

const Checkout = () => {
  const { user, token } = useContext(AuthContext);
  const { cart, sessionId, removeFromCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [cityError, setCityError] = useState("");
  const [showError, setShowError] =useState(false);
  const [amount, setAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
  });
  
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    if(cityError){
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 2000)
      return() => clearTimeout(timer);
    }
  }, [cityError])

  // Redirects to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [user, navigate, location]);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
    setCityError("");
    setSuccessMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setCityError("");
    setSuccessMessage("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      setCityError("Please enter a valid amount");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/initiate-payment",
        {
          amount,
          productId: generateUniqueId(),
        }
      );
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error initiating payment:", error);
      setCityError("Error initiating payment. Please try again.");
    }
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      setCityError("Your cart is empty");
      return;
    }

    if (paymentMethod === "cod") {
      const isHetauda = formData.city.toLowerCase() === "hetauda" ||
        formData.address.toLowerCase().includes("hetauda");
      if (!isHetauda) {
        setCityError("Cash on Delivery is only available in Hetauda");
        return;
      }
      try {
        const requestBody = {
          sessionId,
          paymentMethod,
          status: "Pending",
          shippingInfo: formData,
          items: cart.map((product) => ({
            product: product._id || product.id,
            quantity: product.quantity || 1,
            totalAmount: product.price,
          })),
        };
        const response = await fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        console.log("Response:", data); // Log the response
        if (response.ok) {
          setSuccessMessage("Order placed successfully! Redirecting to home...");
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        } else {
          setCityError(data.message || "Error placing order");
        }
      } catch (error) {
        console.error("Error placing order:", error);
        setCityError("Could not connect to server");
      }
    } else if (paymentMethod === "online") {
      setAmount(total.toFixed(2));
      setShowPaymentPopup(true);
    }
  };

  // Calculate subtotal
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  // Set shipping based on city or address
  const isHetauda = formData.city.toLowerCase() === "hetauda" ||
    formData.address.toLowerCase().includes("hetauda");
  const shipping = isHetauda ? 0 : 150;
  const total = subtotal + shipping;

  if (!user) return null;

  return (
    <div className="bg-gradient-to-br from-pink-50 to-rose-100 min-h-screen flex flex-col items-center justify-start p-5 px-4 pt-4">
      {/* Payment Popup */}
      {showPaymentPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <PaymentComponent
            amount={amount}
            setAmount={setAmount}
            handlePayment={handlePayment}
            onClose={() => setShowPaymentPopup(false)}
          />
        </div>
      )}
      {/* Success Message Overlay */}
      {successMessage && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-center max-w-md w-full">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-green-700 text-sm">{successMessage}</p>
          </div>
        </div>
      )}
      <div className="max-w-5xl w-full relative">
        <Link
          to="/home"
          className="absolute left-0 top-0 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-full p-2 transition-all duration-200 flex items-center"
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          {/* Left Side - Checkout Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-rose-200 rounded-full -translate-x-16 -translate-y-16 opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-pink-200 rounded-full translate-x-12 translate-y-12 opacity-50"></div>
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-rose-700 mb-2">Checkout</h2>
                <p className="text-rose-500 text-sm">Complete your order details below</p>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-rose-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 pl-12 rounded-xl border-2 border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-200 bg-rose-50"
                      placeholder="Enter your email"
                    />
                    <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-rose-700 mb-4">
                    Shipping Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 pl-12 rounded-xl border-2 border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-200 bg-rose-50"
                        placeholder="First name"
                      />
                      <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="relative">
                      <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 pl-12 rounded-xl border-2 border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-200 bg-rose-50"
                        placeholder="Last name"
                      />
                      <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="relative sm:col-span-2">
                      <input
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 pl-12 rounded-xl border-2 border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-200 bg-rose-50"
                        placeholder="Address"
                      />
                      <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div className="relative">
                      <input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 pl-12 rounded-xl border-2 border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-200 bg-rose-50"
                        placeholder="City"
                      />
                      <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 6.343a8 8 0 010 11.314m-11.314 0a8 8 0 010-11.314m11.314 0L12 12l5.657-5.657m-11.314 0L12 12l-5.657-5.657m11.314 0a8 8 0 01-11.314 11.314m11.314-11.314L12 12l-5.657 5.657" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-rose-700 mb-4">
                    Payment Method
                  </h3>
                  <div className="flex flex-col gap-2 mb-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        value="online"
                        checked={paymentMethod === "online"}
                        onChange={handlePaymentChange}
                        className="mr-2 w-5 h-5 accent-rose-400"
                      />
                      <span className="text-sm font-semibold text-rose-700">Pay Online</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={handlePaymentChange}
                        className="mr-2 w-5 h-5 accent-rose-400"
                      />
                      <span className="text-sm font-semibold text-rose-700">
                        Cash on Delivery
                        <span className="ml-2 text-xs text-rose-400">
                          (Only available in Hetauda)
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
          {/* Right Side - Order Summary */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-rose-200 rounded-full -translate-x-16 -translate-y-16 opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-pink-200 rounded-full translate-x-12 translate-y-12 opacity-50"></div>
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-rose-700 mb-2">Order Summary</h3>
                <p className="text-rose-500 text-sm">Review your cart items</p>
              </div>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-rose-100">
                  {cart.length === 0 ? (
                    <li className="py-6 text-rose-500 text-center">Your cart is empty</li>
                  ) : (
                    cart.map((product) => (
                      <li key={product.id} className="flex py-6">
                        <div className="size-24 shrink-0 overflow-hidden rounded-xl border-2 border-rose-200">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-rose-700">
                              <h3>
                                <Link to={`/product/${product.id}`} className="hover:text-rose-800">
                                  {product.name}
                                </Link>
                              </h3>
                              <p className="ml-4">Rs. {product.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-rose-500">{product.color}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-rose-500">Qty {product.quantity || 1}</p>
                            <div className="flex">
                              <button
                                type="button"
                                onClick={() => removeFromCart(product.id)}
                                className="font-medium text-rose-600 hover:text-rose-800 transition-colors duration-200"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
                <div className="mt-10 space-y-2 text-rose-600">
                  <div className="flex justify-between text-sm font-semibold">
                    <p>Subtotal</p>
                    <p>Rs. {subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-sm font-semibold">
                    <p>Shipping</p>
                    <p>Rs. {shipping.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-base font-bold border-t border-rose-100 pt-2">
                    <p>Total</p>
                    <p>Rs. {total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Error Message */}
        {showError && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-red-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-700 text-sm">{cityError}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;