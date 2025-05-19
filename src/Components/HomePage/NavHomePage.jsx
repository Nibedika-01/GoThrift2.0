import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

  //toggle the hamburger icon
const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-rose-50 border border-rose-100 shadow-md z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center space-x-0.5l:space-x-reverse">
          <span className="text-[27px] text-rose-700 font-extrabold tracking-wide">Go</span>
          <span className="text-[32px] text-rose-700 font-extrabold">Thrift</span>
        </Link>

        {/* Buttons on right */}
        <div className="flex items-center space-x-4 md:order-2">
          <Link
            to="/login"
            className="text-rose-700 hover:text-white border border-rose-600 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-rose-200 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            Login
          </Link>
          <Link
            to="/cart"
            className="relative text-rose-700 hover:text-white border border-rose-600 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-rose-200 font-medium rounded-lg text-sm p-2 flex items-center"
        
          >
            Cart
          </Link>
        </div>

        {/* Hamburger Menu */}
        <button
          onClick={ () => setIsMainMenuOpen(!isMainMenuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-rose-600 rounded-lg md:hidden hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-200"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

        {/* Main Navigation Links */}
        <div className={`w-full md:block md:w-auto ${isMainMenuOpen ? 'flex' : 'hidden'}`} id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-rose-100 rounded-lg bg-rose-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-rose-50">
            <li>
              <Link to="/" className="block py-2 px-3 text-rose-50 bg-rose-700 rounded-sm md:bg-transparent md:text-rose-700 md:p-0" aria-current="page">
                Home
              </Link>
            </li>
            <li>
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className="flex items-center justify-between w-full py-2 px-3 text-rose-700 rounded-sm hover:bg-rose-100 md:hover:bg-transparent md:border-0 md:hover:text-rose-600 md:p-0 md:w-auto"
              >
                Category
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              <div
                id="dropdownNavbar"
                className="z-10 hidden font-normal bg-rose-50 divide-y divide-rose-100 rounded-lg shadow-sm w-44"
              >
                <ul className="py-2 text-sm text-rose-700" aria-labelledby="dropdownLargeButton">
                  <li>
                    <Link to="/tops" className="block px-4 py-2 hover:bg-rose-100 hover:text-rose-800">
                      Tops
                    </Link>
                  </li>
                  <li>
                    <Link to="/bottoms" className="block px-4 py-2 hover:bg-rose-100 hover:text-rose-800">
                      Bottoms
                    </Link>
                  </li>
                  <li>
                    <Link to="/dresses" className="block px-4 py-2 hover:bg-rose-100 hover:text-rose-800">
                      Dresses
                    </Link>
                  </li>
                </ul>
                <div className="py-1">
                  <Link to="/accessories" className="block px-4 py-2 text-sm text-rose-700 hover:bg-rose-100 hover:text-rose-800">
                    Accessories
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <Link to="/about" className="block py-2 px-3 text-rose-700 rounded-sm hover:bg-rose-100 md:hover:bg-transparent md:border-0 md:hover:text-rose-600 md:p-0">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block py-2 px-3 text-rose-700 rounded-sm hover:bg-rose-100 md:hover:bg-transparent md:border-0 md:hover:text-rose-600 md:p-0">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
