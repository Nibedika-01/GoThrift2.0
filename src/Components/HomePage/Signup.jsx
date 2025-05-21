import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <section className="bg-rose-50 dark:bg-rose-100 min-h-screen flex flex-col items-center justify-center px-4 space-y-4 font-body">
            
            {/* Logo outside the card */}
            <Link to="/" className="flex items-center justify-center text-rose-700">
                <span className="text-[30px] font-extrabold tracking-wide">Go</span>
                <span className="text-[35px] font-extrabold">Thrift</span>
            </Link>

            {/* Signup Card */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <h1 className="text-xl font-bold text-center text-rose-700 md:text-2xl ">
                    Create an account
                </h1>

                <form className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-rose-700">Your email</label>
                        <input type="email" id="email" className="w-full p-2.5 border border-rose-200 rounded-lg bg-rose-50 text-rose-800 placeholder:text-rose-400 focus:ring-rose-300 focus:border-rose-400" placeholder="name@gmail.com" required />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1 text-sm font-medium text-rose-700">Password</label>
                        <input type="password" id="password" className="w-full p-2.5 border border-rose-200 rounded-lg bg-rose-50 text-rose-800 placeholder:text-rose-400 focus:ring-rose-300 focus:border-rose-400" placeholder="••••••••" required />
                    </div>

                    <div>
                        <label htmlFor="confirm-password" className="block mb-1 text-sm font-medium text-rose-700">Confirm Password</label>
                        <input type="password" id="confirm-password" className="w-full p-2.5 border border-rose-200 rounded-lg bg-rose-50 text-rose-800 placeholder:text-rose-400 focus:ring-rose-300 focus:border-rose-400" placeholder="••••••••" required />
                    </div>

                    <div className="flex items-start gap-2">
                        <input id="terms" type="checkbox" className="w-4 h-4 text-rose-600 border-rose-300 rounded focus:ring-rose-500" required />
                        <label htmlFor="terms" className="text-sm text-rose-600">
                            I accept the <Link to="/terms" className="font-medium hover:underline text-rose-600">Terms and Conditions</Link>
                        </label>
                    </div>

                    <button type="submit" className="w-full text-white bg-rose-600 hover:bg-rose-500 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Create an account
                    </button>

                    <p className="text-sm text-center text-rose-600">
                        Already have an account? <Link to="/login" className="font-medium text-rose-500 hover:underline">Login here</Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Signup;
