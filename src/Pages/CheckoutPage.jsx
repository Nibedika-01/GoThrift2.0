import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";
import CartContext from "../CartContext";
import axios from "axios";
import { generateUniqueId } from "esewajs";

// PaymentComponent integrated within Checkout
const PaymentComponent = ({ amount, setAmount, handlePayment, onClose }) => {
  return (
    <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
      <h3 className="text-lg font-semibold text-rose-700 mb-4">eSewa Payment</h3>
      <form onSubmit={handlePayment} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="amount" className="text-rose-600 font-medium mb-1">
            Amount (Rs.):
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="Enter amount"
            className="p-3 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-rose-700 text-white rounded-md hover:bg-rose-600 transition"
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
  const [showCityError, setShowCityError] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
  });
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Redirects to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [user, navigate, location]);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
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
      alert("Error initiating payment. Please try again.");
    }
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (paymentMethod === "cod") {
      if (formData.city.toLowerCase() !== "hetauda") {
        setShowCityError(true);
        setTimeout(() => setShowCityError(false), 2000);
        return;
      }
      try {
        const response = await fetch("http://localhost:5000/api/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            sessionId,
            userId: user.userId,
            paymentMethod,
            shippingInfo: formData,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          alert("Order placed successfully");
          navigate("/home");
        } else {
          alert(data.message || "Error placing order");
        }
      } catch (error) {
        alert("Could not connect to server");
      }
    } else if (paymentMethod === "online") {
      setAmount(total.toFixed(2)); // Pre-fill amount with cart total
      setShowPaymentPopup(true);
    }
  };

  // Calculate subtotal
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const shipping = 150;
  const total = subtotal + shipping;

  if (!user) return null;

  return (
    <div className="bg-pink-50 min-h-screen p-6 font-sans">
      {/* City Error Message */}
      {showCityError && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50 transition-opacity duration-300">
          Cash on Delivery is only available in Hetauda
        </div>
      )}
      {/* Payment Popup */}
      {showPaymentPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <PaymentComponent
            amount={amount}
            setAmount={setAmount}
            handlePayment={handlePayment}
            onClose={() => setShowPaymentPopup(false)}
          />
        </div>
      )}
      <Link
        to="/home"
        className="text-rose-600 hover:text-rose-500 mb-6 inline-block"
      >
        ← Back to Products
      </Link>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Left Side - Checkout Form */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-rose-700 mb-6">Checkout</h2>
          <div className="mb-6">
            <label
              className="block text-lg text-rose-600 font-medium mb-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-rose-600 mb-4">
              Shipping Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="p-3 border border-rose-200 rounded-lg"
                placeholder="First name"
              />
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="p-3 border border-rose-200 rounded-lg"
                placeholder="Last name"
              />
              <input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="p-3 border border-rose-200 rounded-lg sm:col-span-2"
                placeholder="Address"
              />
              <input
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="p-3 border border-rose-200 rounded-lg"
                placeholder="City"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-rose-600 mb-4">
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
                  className="mr-2 accent-rose-400"
                />
                Pay Online
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={handlePaymentChange}
                  className="mr-2 accent-rose-400"
                />
                Cash on Delivery
                <span className="ml-2 text-sm text-rose-400">
                  (Only available in Hetauda)
                </span>
              </label>
            </div>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full bg-rose-700 text-white font-semibold py-3 rounded-lg hover:bg-rose-600 transition"
          >
            Place Order
          </button>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-2xl font-bold text-rose-700 mb-4">
            Order Summary
          </h3>
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cart.length === 0 ? (
                  <li className="py-6 text-rose-500">Your cart is empty</li>
                ) : (
                  cart.map((product) => (
                    <li key={product.id} className="flex py-6">
                      <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="ml NavLink flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-rose-700">
                            <h3>
                              <Link to={`/product/${product.id}`}>
                                {product.name}
                              </Link>
                            </h3>
                            <p className="ml-4">Rs. {product.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-rose-500">
                            {product.color}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-rose-500">
                            Qty {product.quantity || 1}
                          </p>
                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => removeFromCart(product.id)}
                              className="font-medium text-rose-600 hover:text-rose-500 cursor-pointer"
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
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>Rs. {subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p>Rs. {shipping.toFixed(2)}</p>
                </div>
                <div className="flex justify-between font-bold border-t border-rose-100 pt-2">
                  <p>Total</p>
                  <p>Rs. {total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;