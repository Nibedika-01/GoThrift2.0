import React, { useState } from 'react'
import HomePageNav from '../Components/HomePage/NavHomePage'
import HeroHomePage from '../Components/HomePage/HeroHomePage'
import FooterLandingPage from '../Components/LandingPage/FooterLandingPage'
import FloatingSellComponent from '../Components/HomePage/Selling'



const HomePage = () => {

  return (
    <>
    <HomePageNav />
    <HeroHomePage/>
    <FloatingSellComponent/>
    <FooterLandingPage/>
    </>
  )
}

export default HomePage
