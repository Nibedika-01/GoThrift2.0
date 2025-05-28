import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import LandingPage from './Pages/LandingPage';
import HomePage from './Pages/HomePage';
import Checkout from './Pages/CheckoutPage';
import CartSideBar from './Components/HomePage/CartSideBar';
import LoginHomePage from './Pages/LoginPage';
import Signup from './Pages/SignupPage';
import ProductDetailPage from './Pages/ProductDetailPage'
import UserProfilePage from './Components/HomePage/UserProfilePage'

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
          <Route path='/product/:id' element={<ProductDetailPage />} />
          <Route path='/user' element={<UserProfilePage/>}/>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;