import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import cart from '../../assets/Images/cart_icon.png';
import userPicture from '../../assets/Images/user_icon.png';
import CartSideBar from "./CartSideBar";
import UserProfileSidebar from "./ProfileSidebar";
import SearchModal from "./SearchModal";
import AuthContext from "../../AuthContext";

const Navbar = () => {

  const { user, logout, loading } = useContext(AuthContext)
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigateLogin = useNavigate();

  const handleAuthAction = () => {
    if (user) {
      logout();
    } else {
      navigateLogin("/login")
    }
  }
  if (loading) {
    return <div>Loading.....</div>
  }


  const handleCategoryClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsCategoryOpen(false); // Close dropdown after clicking
    setIsMainMenuOpen(false); // Close main menu on mobile
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-rose-50 border-b border-rose-200 shadow-md z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo & Brand */}
        <Link to="/" className="items-center space-x-0 l:space-x-reverse">
          <span className="text-[27px] text-rose-700 font-extrabold tracking-wide">Go</span>
          <span className="text-[32px] text-rose-700 font-extrabold">Thrift</span>
        </Link>

        {/* Buttons on right */}
        <div className="flex items-center space-x-4 md:order-2 text-sm md:text-base">
          <button
            onClick={handleAuthAction}
            className="text-white bg-rose-700 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-rose-200 font-medium rounded-md px-3 py-1.5 sm:px-4 sm:py-2"
          >
            {user ? "Logout" : "Login"}
          </button>

          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative w-6 sm:w-8 cursor-pointer focus:ring-4 focus:outline-none focus:ring-rose-200 font-medium rounded-lg flex items-center"
          >
            <img src={cart} alt="Cart Icon" className="w-full" />
          </button>

          {isCartOpen && <CartSideBar closeCart={() => setIsCartOpen(!isCartOpen)} />}

          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="relative w-6 sm:w-8 p-1 pb-0 cursor-pointer focus:ring-4 focus:outline-none focus:ring-rose-200 font-medium rounded-lg flex items-center"
          >
            <img src={userPicture} alt="User Icon" />
          </button>
          {isProfileOpen && <UserProfileSidebar closeProfile={() => setIsProfileOpen(false)} />}
        </div>


        {/* Hamburger Menu */}
        <button
          onClick={() => setIsMainMenuOpen(!isMainMenuOpen)}
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
          <ul className="flex flex-col font-medium p-2 md:p-0 mt-4 border border-rose-100 rounded-lg bg-rose-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-rose-50">
            {/* Category dropdown */}
            <li>
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                id="dropdownNavbarLink"
                className="flex items-center justify-between w-full py-2 px-3 text-rose-700 rounded-sm hover:bg-rose-100 md:hover:bg-transparent md:border-0 md:hover:text-rose-600 md:p-0 md:w-auto"
              >
                Category
                <svg className={`w-2.5 h-2.5 ms-2.5 transition-transform duration-200 ${isCategoryOpen ? 'transform rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              {isCategoryOpen && (
                <div
                  id="dropdownNavbar"
                  className="absolute z-10 font-normal bg-rose-50 divide-y divide-rose-100 rounded-lg shadow-sm w-44"
                >
                  <ul className="py-2 text-sm text-rose-700" aria-labelledby="dropdownLargeButton">
                    <li>
                      <a
                        href="#tops"
                        onClick={() => handleCategoryClick('tops')}
                        className="block px-4 py-2 hover:bg-rose-100 hover:text-rose-800"
                      >
                        Tops
                      </a>
                    </li>
                    <li>
                      <a
                        href="#bottoms"
                        onClick={() => handleCategoryClick('bottoms')}
                        className="block px-4 py-2 hover:bg-rose-100 hover:text-rose-800"
                      >
                        Bottoms
                      </a>
                    </li>
                    <li>
                      <a
                        href="#dresses"
                        onClick={() => handleCategoryClick('dresses')}
                        className="block px-4 py-2 hover:bg-rose-100 hover:text-rose-800"
                      >
                        Dresses
                      </a>
                    </li>
                    <li>
                      <a
                        href="#accessories"
                        onClick={() => handleCategoryClick('accessories')}
                        className="block px-4 py-2 hover:bg-rose-100 hover:text-rose-800"
                      >
                        Accessories
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            {/* search button */}
            <li>
              <button
                onClick={() => {
                  setIsSearchOpen(true);

                }}
                className="flex items-center justify-center w-full py-2 px-3 text-rose-700 rounded-sm hover:bg-rose-100 md:hover:bg-transparent md:border-0 md:hover:text-rose-600 md:p-0 md:w-auto"
              >
                <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                Search
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Search modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        initialQuery={searchQuery}
        onQueryChange={setSearchQuery}
      />    </nav>
  );
};

export default Navbar;