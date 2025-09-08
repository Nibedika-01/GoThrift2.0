import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        setIsLoggedIn(!!token);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        setIsLoggedIn(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("adminToken", data.token);
                setIsLoggedIn(true);
                setError("");
            } else {
                setError(data.message || "Invalid credentials");
            }
        } catch (err) {
            setError("Error: Could not connect to server");
        }
    };

    return (
        <div className="gradient-bg min-h-screen p-6 font-sans">
            <div className="max-w-5xl mx-auto">
                {isLoggedIn ? (
                    <div>
                        <div className="flex justify-between items-center mb-8 relative">
                            <button
                                onClick={() => navigate("/home")}
                                className="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-full transition-all duration-200"
                                title="Go back"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <h1 className="text-3xl md:text-4xl font-bold text-rose-700 text-center flex-1">
                                Admin Dashboard
                            </h1>
                            <button
                                onClick={handleLogout}
                                className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-4 py-2 rounded-xl font-semibold btn-hover shadow-lg"
                            >
                                Logout
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Add Items",
                                    desc: "Upload new clothing items",
                                    link: "/add-clothing",
                                    icon: (
                                        <svg
                                            className="w-6 h-6 text-rose-500 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                    ),
                                },
                                {
                                    title: "View Orders",
                                    desc: "Check customer orders",
                                    link: "/view-orders",
                                    icon: (
                                        <svg
                                            className="w-6 h-6 text-rose-500 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            {/* Example path for a clipboard or document icon */}
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2"
                                            />
                                        </svg>
                                    ),
                                },
                                {
                                    title: "View Inventory",
                                    desc: "Manage existing inventory",
                                    link: "/view-inventory",
                                    icon: (
                                        <svg
                                            className="w-6 h-6 text-rose-500 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            {/* Example path for a box or inventory icon */}
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M20 7l-8 8-4-4-6 6"
                                            />
                                        </svg>
                                    ),
                                }
                            ].map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.link}
                                    className="bg-white rounded-2xl shadow-md p-6 transition card-hover relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-24 h-24 bg-rose-200 rounded-full -translate-x-12 -translate-y-12 opacity-50"></div>
                                    <div className="flex items-center mb-2">
                                        {/* Render the SVG directly */}
                                        {item.icon}
                                        <h2 className="text-xl font-semibold text-rose-700">{item.title}</h2>
                                    </div>
                                    <p className="text-rose-500 text-sm">{item.desc}</p>
                                </a>
                            ))}
                        </div>

                    </div>
                ) : (
                    <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
                        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative overflow-hidden animate-fadeIn">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-rose-200 rounded-full -translate-x-16 -translate-y-16 opacity-50"></div>
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-pink-200 rounded-full translate-x-12 translate-y-12 opacity-50"></div>
                            <button
                                onClick={() => navigate("/")}
                                className="absolute top-4 left-4 p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-full transition-all duration-200"
                                title="Go back"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div className="text-center mb-8 relative z-10">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-bold text-rose-700 mb-2">Admin Login</h2>
                                <p className="text-rose-500 text-sm">Sign in to your admin account</p>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-rose-700 mb-2">Username</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-4 pl-12 rounded-xl border-2 border-rose-200 bg-rose-50 placeholder-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-300"
                                                placeholder="Enter username"
                                            />
                                            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-rose-700 mb-2">Password</label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-4 pl-12 rounded-xl border-2 border-rose-200 bg-rose-50 placeholder-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-300"
                                                placeholder="Enter password"
                                            />
                                            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                {error && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                                        <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-red-700 text-sm">{error}</p>
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:scale-105 transition-transform shadow-lg"
                                >
                                    Sign In
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
