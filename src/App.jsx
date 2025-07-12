import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import LandingPage from './Pages/LandingPage';
import HomePage from './Pages/HomePage';
import Checkout from './Pages/CheckoutPage';
import CartSideBar from './Components/HomePage/CartSideBar';
import LoginHomePage from './Pages/LoginPage';
import Signup from './Pages/SignupPage';
import ProductDetailPage from './Pages/ProductDetailPage'
import ProfileSidebar from './Components/HomePage/ProfileSidebar'
import Success from './Components/Payment/Success';
import Failure from './Components/Payment/Failure';
import PaymentComponent from './Components/Payment/PaymentForm';


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
          <Route path='/product/:id' element={<ProductDetailPage />} />
          <Route path='/user' element={<ProfileSidebar />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/" element={<PaymentComponent />} />
          <Route path="/payment-success" element={<Success />} />
          <Route path="/payment-failure" element={<Failure />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;