import Checkout from './Components/CheckoutPage/Checkout'
import CartSideBar from './Components/HomePage/CartSideBar'
import LoginHomePage from './Components/HomePage/LoginHomePage'
import Signup from './Components/HomePage/Signup'
import UserProfile from './Components/UserPage/UserProfile'
import AdminAddItem from './Pages/Admin/AdminAddItem'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import AdminUserManagement from './Pages/Admin/AdminUserManagement'
import HomePage from './Pages/HomePage'
import LandingPage from './Pages/LandingPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path='/login' element={<LoginHomePage/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/cart' element={<CartSideBar/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/user' element={<UserProfile/>}/>
        <Route path='/admin' element={<AdminDashboard/>}/>
        <Route path='/admin/users' element={<AdminUserManagement/>}/>
        <Route path='/admin/add-item' element={<AdminAddItem/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
