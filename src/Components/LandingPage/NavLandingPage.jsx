import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const NavLandingPage = () => {

  //to navigate from landing page to home page
  const navigate = useNavigate();
  const gotoHomepage = () => {
    navigate('/home')
  }

  //to toggle hamburger icon
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  return (
    <nav className="fixed top-0 left-0 w-full bg-rose-50 border-b border-rose-200 shadow-md z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="items-center font-logo leading-none">
          <span className="text-[27px] text-rose-700 font-extrabold tracking-wide">Go</span>
          <span className="text-[32px] text-rose-700 font-extrabold">Thrift</span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
          onClick={gotoHomepage}
            type="button"
            className="text-white bg-rose-600 hover:bg-rose-500 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Visit Store
          </button>
          <button
            onClick={ () => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-rose-600 rounded-lg md:hidden hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-300"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        <div
          className={`items-center justify-between w-full md:flex md:w-auto ${isMenuOpen ? 'flex':'hidden'}`}
          id="navbar-cta"
        >
          <ul className="flex flex-col font-body font-medium p-4 md:p-0 mt-4 border border-rose-100 rounded-lg bg-rose-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-rose-50">
            <li>
              <a
                href="#"
                className="block py-2 px-3 bg-rose-700 text-rose-50 rounded-sm md:bg-transparent md:text-rose-600 hover:bg-rose-600"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a href="#features"
                className="block py-2 px-3 md:p-0 text-rose-700 rounded-sm md:bg-transparent md:text-rose-600 md:dark:text-rose-700"
              >
                Features
              </a>

            </li>
            <li>
              <a
                href="#aboutUs"
                className="block py-2 px-3 md:p-0 text-rose-700 rounded-sm hover:bg-rose-100 md:hover:bg-transparent md:hover:text-rose-600 md:dark:hover:text-rose-700"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#footer"
                className="block py-2 px-3 md:p-0 text-rose-700 rounded-sm hover:bg-rose-100 md:hover:bg-transparent md:hover:text-rose-600 md:dark:hover:text-rose-700"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavLandingPage;
