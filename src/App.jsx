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
import AdminLogin from './Components/AdminPage/AdminLogin';
import AdminDashboard from './Components/AdminPage/AdminDashboard';
import AddClothing from './Components/AdminPage/AddClothing';
import ViewOrders from './Components/AdminPage/ViewOrders';
import ViewInventory from './Components/AdminPage/ViewInventory';
import SellClothesPage from './Pages/SellingClothesPage';
import VerifyEmail from './Pages/VerifyEmail';


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
          <Route path='/products/:id' element={<ProductDetailPage />} />
          <Route path='/user' element={<ProfileSidebar />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/" element={<PaymentComponent />} />
          <Route path="/payment-success" element={<Success />} />
          <Route path="/payment-failure" element={<Failure />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/add-clothing" element={<AddClothing />} />
          <Route path="/view-orders" element={<ViewOrders/>} />
          <Route path="/view-inventory" element={<ViewInventory/>} />
          <Route path="/sell-clothes" element={<SellClothesPage/>}/>
          <Route path="/verify-email" element={<VerifyEmail/>}/>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;