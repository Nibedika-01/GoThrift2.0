import HomePageNav from './Components/HomePage/NavHomePage'
import HomePage from './Pages/HomePage'
import LandingPage from './Pages/LandingPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
