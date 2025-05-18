
import FeatureLandingPage from '../Components/LandingPage/FeatureLandingPage';
import FooterLandingPage from '../Components/LandingPage/FooterLandingPage';
import AboutUsLandingPage from '../Components/LandingPage/AboutUsLandingPage';
import NavLandingPage from '../Components/LandingPage/NavLandingPage';
import HeroLandingPage from '../Components/LandingPage/HeroLandingPage';

const LandingPage = () => {
    return (
        <>
            <NavLandingPage/>
            <HeroLandingPage/>
            <FeatureLandingPage/>
            <AboutUsLandingPage/>
            <FooterLandingPage/>
        </>

    );
};

export default LandingPage;
