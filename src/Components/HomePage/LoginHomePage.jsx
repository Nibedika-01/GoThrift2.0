import React from 'react'
import { Link } from 'react-router-dom'

const LoginHomePage = () => {
    return (
        <>
            <section className="bg-rose-50 dark:bg-rose-100 min-h-screen">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Link to="/" className=" items-center mb-6 text-3xl text-rose-700 ">
                        <span className="text-[30px] text-rose-700 font-extrabold tracking-wide">Go</span>
                        <span className="text-[35px] text-rose-700 font-extrabold">Thrift</span>
                    </Link>
                    <div className="w-full bg-white rounded-2xl shadow-md border border-rose-200 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 sm:p-8">
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-rose-700 md:text-2xl">
                                Login your account
                            </h1>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-rose-700">
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-rose-50 border border-rose-300 text-rose-800 rounded-lg focus:ring-rose-400 focus:border-rose-400 block w-full p-2.5"
                                        placeholder="name@gmail.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-rose-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-rose-50 border border-rose-300 text-rose-800 rounded-lg focus:ring-rose-400 focus:border-rose-400 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            className="w-4 h-4 text-rose-600 bg-rose-100 border-rose-300 rounded focus:ring-rose-400"
                                        />
                                        <label htmlFor="remember" className="ml-2 text-sm text-rose-600">
                                            Remember me
                                        </label>
                                    </div>
                                    <Link to="/forgot-password" className="text-sm text-rose-500 hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-rose-600 hover:bg-rose-500 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Login
                                </button>
                                <p className="text-sm font-light text-rose-500">
                                    This cutie doesn’t have an account yet?{' '}
                                    <Link to="/signup" className="font-medium text-rose-600 hover:underline">
                                        Sign up here
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default LoginHomePage
