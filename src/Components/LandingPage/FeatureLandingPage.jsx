import React, { useEffect, useRef, useState } from 'react';
import secure from '../../assets/Images/secure_icon.png';
import bag from '../../assets/Images/affordable_icon.png';
import cart from '../../assets/Images/cart_icon.png';
import mobile from '../../assets/Images/mobile_icon.png';

const FeatureLandingPage = () => {
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

  return (
    <section
      id="features"
      ref={sectionRef}
      className="w-full bg-[#f5f2eb] min-h-screen py-8 md:py-12 lg:py-20"
    >
      <div className="max-w-screen-xl mx-auto px-4 space-y-6">
        {/* Heading */}
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl text-rose-700">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-rose-700 sm:text-lg sm:leading-7">
            Cute features made just for you to sparkle every day.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3">
          {/* Feature 1 */}
          <div
            className={`bg-rose-50 relative overflow-hidden rounded-lg border select-none hover:shadow hover:shadow-teal-200 p-2 transform transition-all duration-700 ease-out ${
              isVisible
                ? 'translate-y-0 scale-100 opacity-100 animate-bounce-once'
                : 'translate-y-16 scale-90 opacity-0'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="h-12 w-12">
                <img src={bag} alt="Bag Icon" className="h-12 w-12" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-rose-700">Affordable</h3>
                <p className="text-sm text-rose-700">
                  Look good, save money, and support sustainable fashion!
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div
            className={`bg-rose-50 relative overflow-hidden rounded-lg border select-none hover:shadow hover:shadow-teal-200 p-2 transform transition-all duration-700 ease-out ${
              isVisible
                ? 'translate-y-0 scale-100 opacity-100 animate-bounce-once'
                : 'translate-y-16 scale-90 opacity-0'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="h-12 w-12">
                <img src={cart} alt="Cart Icon" className="h-12 w-12" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-rose-700">Shopping Cart</h3>
                <p className="text-sm text-rose-700">
                  Girlies can add their products and review them in cart section.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div
            className={`bg-rose-50 relative overflow-hidden rounded-lg border select-none hover:shadow hover:shadow-teal-200 p-2 transform transition-all duration-700 ease-out ${
              isVisible
                ? 'translate-y-0 scale-100 opacity-100 animate-bounce-once'
                : 'translate-y-16 scale-90 opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="h-12 w-12">
                <img src={secure} alt="Secure Icon" className="h-12 w-12" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-rose-700">User Authentication</h3>
                <p className="text-sm text-rose-700">Signup and Login</p>
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div
            className={`bg-rose-50 relative overflow-hidden rounded-lg border select-none hover:shadow hover:shadow-teal-200 p-2 transform transition-all duration-700 ease-out ${
              isVisible
                ? 'translate-y-0 scale-100 opacity-100 animate-bounce-once'
                : 'translate-y-16 scale-90 opacity-0'
            }`}
            style={{ transitionDelay: '450ms' }}
          >
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="h-12 w-12">
                <img src={mobile} alt="Mobile Icon" className="h-12 w-12" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-rose-700">Mobile Friendly Design</h3>
                <p className="text-sm text-rose-700">
                  Responsive UI for seamless use on phone and tablets.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 5 */}
          <div
            className={`bg-rose-50 relative overflow-hidden rounded-lg border select-none hover:shadow hover:shadow-teal-200 p-2 transform transition-all duration-700 ease-out ${
              isVisible
                ? 'translate-y-0 scale-100 opacity-100 animate-bounce-once'
                : 'translate-y-16 scale-90 opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="h-12 w-12">
                <img src={secure} alt="Secure Icon" className="h-12 w-12" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-rose-700">Authentication</h3>
                <p className="text-sm text-rose-700">
                  Authentication using NextAuth.js and middlewares.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 6 */}
          <div
            className={`bg-rose-50 relative overflow-hidden rounded-lg border select-none hover:shadow hover:shadow-teal-200 p-2 transform transition-all duration-700 ease-out ${
              isVisible
                ? 'translate-y-0 scale-100 opacity-100 animate-bounce-once'
                : 'translate-y-16 scale-90 opacity-0'
            }`}
            style={{ transitionDelay: '750ms' }}
          >
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="h-12 w-12">
                <img src={bag} alt="Bag Icon" className="h-12 w-12" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-rose-700">Subscriptions</h3>
                <p className="text-sm text-rose-700">
                  Free and paid subscriptions using Stripe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureLandingPage;