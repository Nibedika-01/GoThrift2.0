import React, { useState } from "react";
import shoppingBag from "../../assets/Images/shoppingBag_icon.png";
import message from "../../assets/Images/message_icon.png";
import phone from "../../assets/Images/phone_icon.png";
import calendar from "../../assets/Images/calender_icon.png";
import setting from "../../assets/Images/setting_icon.png";
import ReactTooltip from "react-tooltip";

const UserProfile = () => {
  const [userData] = useState({
    name: "Sarah Anderson",
    email: "sarah.anderson@example.com",
    phone: "+1 (555) 123-4567",
    membershipStatus: "Premium",
    createdAt: "2023-01-15",
    totalPurchases: "$2,459",
    rewardPoints: 1250,
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Profile Picture */}
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-rose-200 shadow-md">
              <img
                src={userData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d";
                }}
              />
            </div>

            {/* User Details */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-rose-600 mb-2">{userData.name}</h1>
              <div className="flex flex-col gap-2 text-rose-500">
                <div className="flex items-center gap-2">
                  <img src={message} alt="email" className="w-5 h-5" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={phone} alt="phone" className="w-5 h-5" />
                  <span>{userData.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={calendar} alt="calendar" className="w-5 h-5" />
                  <span>Member since {new Date(userData.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase Info */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center sm:justify-start">
            <div className="bg-pink-100 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <img src={shoppingBag} alt="bag" className="w-6 h-6" />
                <div>
                  <p className="text-sm text-rose-400">Total Purchases</p>
                  <p className="font-semibold text-rose-600">{userData.totalPurchases}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center sm:justify-start">
            <button className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors duration-200">
              <img src={setting} alt="settings" className="w-5 h-5" /> Account Settings
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-rose-500 border border-rose-400 rounded-lg hover:bg-pink-100 transition-colors duration-200">
              <img src={shoppingBag} alt="orders" className="w-5 h-5" /> Order History
            </button>
          </div>
        </div>
      </div>
      <ReactTooltip />
    </div>
  );
};

export default UserProfile;
