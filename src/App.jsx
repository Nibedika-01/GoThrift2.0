import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import LandingPage from './Pages/LandingPage';
import HomePage from './Pages/HomePage';
import Checkout from './Components/CheckoutPage/Checkout';
import CartSideBar from './Components/HomePage/CartSideBar';
import LoginHomePage from './Components/HomePage/LoginHomePage';
import Signup from './Components/HomePage/Signup';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginHomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<CartSideBar />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;