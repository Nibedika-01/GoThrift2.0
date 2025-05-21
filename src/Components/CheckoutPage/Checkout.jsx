import React, { useState } from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState("credit");

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    return (
        <div className="bg-pink-50 min-h-screen p-6 font-sans">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                {/* Left Side - Checkout Form */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-2xl font-bold text-rose-700 mb-6">Checkout</h2>

                    {/* Contact Information */}
                    <div className="mb-6">
                        <label className="block text-lg text-rose-600 font-medium mb-1" htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-3 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Shipping Info */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-rose-600 mb-4">Shipping Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input className="p-3 border border-rose-200 rounded-lg" placeholder="First name" />
                            <input className="p-3 border border-rose-200 rounded-lg" placeholder="Last name" />
                            <input className="p-3 border border-rose-200 rounded-lg sm:col-span-2" placeholder="Address" />
                            <input className="p-3 border border-rose-200 rounded-lg" placeholder="City" />
                            <input className="p-3 border border-rose-200 rounded-lg" placeholder="Postal Code" />
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
                                    value="credit"
                                    checked={paymentMethod === "credit"}
                                    onChange={handlePaymentChange}
                                    className="mr-2 accent-rose-400"
                                />
                                Credit card
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="paypal"
                                    checked={paymentMethod === "paypal"}
                                    onChange={handlePaymentChange}
                                    className="mr-2 accent-rose-400"
                                />
                                Cash on delivery
                            </label>
                        </div>

                        {paymentMethod === "credit" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input className="p-3 border border-rose-200 rounded-lg" placeholder="Card Number" />
                                <input className="p-3 border border-rose-200 rounded-lg" placeholder="Expiry Date (MM/YY)" />
                                <input className="p-3 border border-rose-200 rounded-lg" placeholder="CVV" />
                            </div>
                        )}
                    </div>

                    {/* Place Order Button */}
                    <button className="mt-6 w-full bg-rose-700 text-white font-semibold py-3 rounded-lg hover:bg-rose-600 transition">
                        Place Order
                    </button>
                </div>

                {/* Right Side - Order Summary */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-2xl font-bold text-rose-700 mb-4">Order Summary</h3>
                    <div className="mt-8">
                        <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                <li className="flex py-6">
                                    <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" alt="Salmon orange fabric pouch" className="size-full object-cover" />
                                    </div>
                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-rose-700">
                                                <h3>
                                                    <Link to="#">Throwback Hip Bag</Link>
                                                </h3>
                                                <p className="ml-4">Rs. 1100</p>
                                            </div>
                                            <p className="mt-1 text-sm text-rose-500">Salmon</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="text-rose-500">Qty 1</p>
                                            <div className="flex">
                                                <button type="button" className="font-medium text-rose-600 hover:text-rose-500 cursor-pointer">Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li className="flex py-6">
                                    <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg" alt="Blue canvas satchel" className="size-full object-cover" />
                                    </div>
                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-rose-700">
                                                <h3>
                                                    <Link to="#">Medium Stuff Satchel</Link>
                                                </h3>
                                                <p className="ml-4">Rs. 1200</p>
                                            </div>
                                            <p className="mt-1 text-sm text-rose-500">Blue</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="text-rose-500">Qty 1</p>
                                            <div className="flex">
                                                <button type="button" className="font-medium text-rose-600 hover:text-rose-500">Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                {/* More items... */}
                            </ul>

                            <div className="mt-10 space-y-2 text-rose-600">
                                <div className="flex justify-between">
                                    <p>Subtotal</p>
                                    <p>Rs. 2300</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Shipping</p>
                                    <p>Rs. 50</p>
                                </div>
                                <div className="flex justify-between font-bold border-t border-rose-100 pt-2">
                                    <p>Total</p>
                                    <p>Rs. 2350</p>
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
