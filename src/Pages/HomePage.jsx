import React, { useState } from 'react'
import HomePageNav from '../Components/HomePage/NavHomePage'
import HeroHomePage from '../Components/HomePage/HeroHomePage'
import FooterLandingPage from '../Components/LandingPage/FooterLandingPage'



const HomePage = () => {

  return (
    <>
    <HomePageNav />
    <HeroHomePage/>
    <FooterLandingPage/>
    </>
  )
}

export default HomePage
