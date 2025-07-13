import { useNavigate } from "react-router-dom";
import hero from "../../assets/Images/hero_img.png";
import heroMobile from "../../assets/Images/hero_mobile.png";
import { useEffect, useRef, useState } from "react";

const HeroLandingPage = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Set up Intersection Observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const goToHomePage = () => {
    navigate('/home');
  };

  return (
    <div
      ref={sectionRef}
      className="w-full bg-[#f5f2eb] pt-28 min-h-screen flex justify-center"
    >
      <div className="relative flex flex-col items-center lg:flex-row-reverse w-full max-w-6xl">
        {/* Image Section with slide-in animation */}
        <div
          className={`w-full h-64 lg:w-1/2 lg:h-auto rounded-lg overflow-hidden shadow-lg transform transition-transform duration-1000 ease-out ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
        >
          <img
            className="h-full w-full object-cover block lg:hidden"
            src={heroMobile}
            alt="Hero Mobile"
          />
          <img
            className="h-full w-full object-cover hidden lg:block"
            src={hero}
            alt="Hero Desktop"
          />
        </div>

        {/* Text Content with slide-in animation */}
        <div
          className={`max-w-lg bg-gradient-to-br from-rose-100 via-rose-50 to-rose-200 md:max-w-2xl md:z-10 md:shadow-2xl md:absolute md:top-1/2 md:-translate-y-1/2 lg:w-3/5 lg:left-0 lg:ml-20 xl:ml-12 rounded-3xl border border-rose-300 transform transition-transform duration-1000 ease-out ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          }`}
        >
          <div className="flex flex-col p-8 md:px-12">
            <h2 className="text-3xl font-logo font-extrabold text-rose-700 uppercase lg:text-5xl tracking-wide drop-shadow-md">
              Thrift With Style
            </h2>
            <p className="mt-4 font-body text-rose-800 text-sm lg:text-base leading-relaxed">
              Discover affordable fashion treasures that don't cost the earth. Our curated thrift collection is perfect for
              fashionistas who love style <em>and</em> sustainability.
            </p>
            <button
              onClick={goToHomePage}
              className="mt-8 inline-block w-full text-lg font-body font-semibold text-white bg-rose-700 border-2 border-rose-600 py-3 px-8 hover:bg-rose-600 hover:shadow-lg transition-all duration-300 md:w-48 rounded-full shadow-md cursor-pointer"
            >
              Visit Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroLandingPage;