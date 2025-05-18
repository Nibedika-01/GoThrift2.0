// src/Pages/LandingPage.jsx
import React from 'react';
import LandingPageNavBar from '../Components/LandingPage/LandingPageNavBar';
import HeroSection from '../Components/LandingPage/LandingPageHero';
import FeatureLandingPage from '../Components/LandingPage/FeatureLandingPage';
import FooterLandingPage from '../Components/LandingPage/FooterLandingPage';
import AboutUsLandingPage from '../Components/LandingPage/AboutUsLandingPage';

const LandingPage = () => {
    return (
        <>
            <LandingPageNavBar />
            <HeroSection />
            <FeatureLandingPage/>
            <AboutUsLandingPage/>
            <FooterLandingPage/>
        </>

    );
};

export default LandingPage;
