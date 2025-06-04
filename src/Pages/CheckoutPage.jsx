import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../CartContext";

const Checkout = () => {
    const { cart, removeFromCart } = useContext(CartContext);
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

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = () => {
        if (paymentMethod === "cod") {
            if (formData.city.toLowerCase() !== "hetauda") {
                setShowCityError(true);
                setTimeout(() => setShowCityError(false), 2000);
                return;
            }
            // Proceed with COD order (e.g., show success message)
            console.log("Order placed with Cash on Delivery");
        } else if (paymentMethod === "online") {
            setShowPaymentPopup(true);
        }
    };

    const handlePayNow = () => {
        // Mock payment processing (replace with actual payment gateway logic)
        console.log("Processing online payment");
        setShowPaymentPopup(false);
    };

    // Calculate subtotal
    const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    const shipping = 50;
    const total = subtotal + shipping;

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
                    <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
                        <h3 className="text-lg font-semibold text-rose-700 mb-4">Complete Payment</h3>
                        <div className="flex flex-col gap-4">
                            {/* Placeholder QR Code */}
                            <img
                                src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg"
                                alt="QR Code for Payment"
                                className="w-full max-w-xs mx-auto rounded-lg"
                            />
                            <p className="text-sm text-rose-500 text-center">
                                Scan the QR code to complete your payment
                            </p>
                            {/* File Upload for Payment Proof */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setPaymentProof(e.target.files[0])}
                                className="p-3 border border-rose-200 rounded-lg w-full"
                            />
                        </div>
                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                onClick={() => setShowPaymentPopup(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                            >
                                Close
                            </button>
                            <button
                                onClick={handlePayNow}
                                className="px-4 py-2 bg-rose-700 text-white rounded-md hover:bg-rose-600 transition"
                            >
                                Pay Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Link to="/home" className="text-rose-600 hover:text-rose-500 mb-6 inline-block">
                ← Back to Products
            </Link>
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                {/* Left Side - Checkout Form */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-2xl font-bold text-rose-700 mb-6">Checkout</h2>

                    {/* Contact Information */}
                    <div className="mb-6">
                        <label className="block text-lg text-rose-600 font-medium mb-1" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Shipping Info */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-rose-600 mb-4">Shipping Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="p-3 border border-rose-200 rounded-lg"
                                placeholder="First name"
                            />
                            <input
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="p-3 border border-rose-200 rounded-lg"
                                placeholder="Last name"
                            />
                            <input
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="p-3 border border-rose-200 rounded-lg sm:col-span-2"
                                placeholder="Address"
                            />
                            <input
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                className="p-3 border border-rose-200 rounded-lg"
                                placeholder="City"
                            />
                        </div>
                    </div>

                    {/* Payment */}
                    <div>
                        <h3 className="text-lg font-semibold text-rose-600 mb-4">Payment Method</h3>
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

                    {/* Place Order Button */}
                    <button
                        onClick={handlePlaceOrder}
                        className="mt-6 w-full bg-rose-700 text-white font-semibold py-3 rounded-lg hover:bg-rose-600 transition"
                    >
                        Place Order
                    </button>
                </div>

                {/* Right Side - Order Summary */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-2xl font-bold text-rose-700 mb-4">Order Summary</h3>
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
                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-rose-700">
                                                        <h3>
                                                            <Link to={`/product/${product.id}`}>{product.name}</Link>
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
                                    <p>Rs. {subtotal}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Shipping</p>
                                    <p>Rs. {shipping}</p>
                                </div>
                                <div className="flex justify-between font-bold border-t border-rose-100 pt-2">
                                    <p>Total</p>
                                    <p>Rs. {total}</p>
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