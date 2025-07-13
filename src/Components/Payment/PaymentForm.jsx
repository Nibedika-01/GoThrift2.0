import React, { useState } from "react";
import axios from "axios";
import { generateUniqueId } from "esewajs";

const PaymentComponent = () => {
  const [amount, setAmount] = useState("");

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
              onChange={(e) => setAmount(e.target.value)}
              required
              placeholder="Enter amount"
              className="w-full p-4 pl-12 rounded-xl border-2 border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-200 bg-rose-50"
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

export default PaymentComponent;