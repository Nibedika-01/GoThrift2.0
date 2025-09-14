import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'animate.css';

const SellClothesPage = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const navigate = useNavigate();

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="bg-rose-50 min-h-screen font-sans">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => navigate('/home')}
          className="p-3 bg-rose-100 text-rose-500 rounded-full hover:bg-rose-200 hover:text-rose-700 transform hover:scale-110 transition-all duration-300 shadow-md animate__animated animate__fadeIn"
          title="Back to Home"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-rose-200 to-pink-200 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-rose-400"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 animate__animated animate__fadeInDown">
            Sell Your Wardrobe
          </h1>
          <p className="text-base sm:text-lg md:text-xl opacity-90 animate__animated animate__fadeInUp animate__delay-1s">
            Transform your clothes into cash with our vibrant thrifting community
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-16">
        {/* How to Sell Section */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 sm:p-10 mb-10 transform hover:shadow-2xl transition-shadow duration-300 animate__animated animate__fadeInUp">
          <div className="flex items-center mb-6 sm:mb-8">
            <div className="bg-rose-100 p-3 sm:p-4 rounded-full mr-3 sm:mr-4 transform hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.707 10.293l-8-8A1 1 0 009 2H4a1 1 0 00-1 1v5a1 1 0 00.293.707l8 8a1 1 0 001.414 0l5-5a1 1 0 000-1.414zM6 6a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-rose-600">How to Sell Your Clothes</h2>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {[
              {
                step: 1,
                title: 'Clean Your Clothes',
                description:
                  'Dry clean or wash your clothes to ensure they’re in top condition. Fresh, clean items attract more buyers and higher offers.',
              },
              {
                step: 2,
                title: 'Schedule a Meeting',
                description:
                  'Arrange a direct meeting for us to inspect your clothes. We prioritize in-person quality checks to maintain our standards.',
              },
              {
                step: 3,
                title: 'Fair Pricing',
                description:
                  'We’ll assess your clothes based on brand, condition, and market trends to set a competitive price that benefits both sides.',
              },
              {
                step: 4,
                title: 'Get Paid',
                description:
                  'Receive 60% of the sale price after your item sells. The remaining 40% covers platform fees, marketing, and processing.',
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="flex flex-col sm:flex-row items-start sm:items-center transform transition-all duration-500 hover:-translate-y-1 animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <span className="bg-rose-300 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-0 sm:mr-4 mb-2 sm:mb-0">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-semibold text-rose-500 text-lg sm:text-xl mb-1">{item.title}</h3>
                  <p className="text-gray-600 max-w-xl">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What We Don't Accept Section */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 sm:p-10 mb-10 transform hover:shadow-2xl transition-shadow duration-300 animate__animated animate__fadeInUp animate__delay-150">
          <div className="flex items-center mb-6 sm:mb-8">
            <div className="bg-red-100 p-3 sm:p-4 rounded-full mr-3 sm:mr-4 transform hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-red-600">Items We Don’t Accept</h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {[
              'Torn or ripped clothes',
              'Stained or discolored clothes',
              'Clothes with excessive wrinkles',
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center p-3 sm:p-4 bg-red-50 rounded-lg transform hover:-translate-y-1 transition-all duration-300 animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 mr-2 sm:mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-red-700 font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-3 sm:p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded animate__animated animate__fadeIn animate__delay-150">
            <p className="text-yellow-800 text-sm sm:text-base">
              <strong>Note:</strong> We maintain high quality standards to ensure the best experience for our buyers and to uphold our reputation as a trusted thrift store.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl shadow-xl p-6 sm:p-10 text-center relative overflow-hidden animate__animated animate__zoomIn">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/light-wool.png')] opacity-10"></div>
          <h2 className="text-2xl sm:text-3xl font-bold text-rose-600 mb-4 relative z-10">Ready to Sell Your Clothes?</h2>
          <p className="text-base sm:text-lg mb-6 text-gray-700 opacity-90 relative z-10 max-w-xl mx-auto">
            Contact us to start your thrifting journey with us!
          </p>

          <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 sm:p-8 mb-6 border border-white/50 relative z-10 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="bg-rose-100 p-3 sm:p-4 rounded-full transform hover:rotate-12 transition-transform duration-300">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-rose-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm5.25-.75a.75.75 0 1 1 0 1.5a.75.75 0 0 1 0-1.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-rose-600">Contact Us on Instagram</h3>
                <p className="text-gray-600 opacity-90 max-w-xs sm:max-w-sm">We’ll respond to your messages within hours!</p>
              </div>
            </div>

            <a
              href="https://instagram.com/_nibedika"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-rose-500 text-white px-6 sm:px-8 py-2 rounded-full font-semibold hover:bg-rose-600 transform hover:scale-105 transition-all duration-300 shadow-lg mx-auto"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm5.25-.75a.75.75 0 1 1 0 1.5a.75.75 0 0 1 0-1.5z" />
              </svg>
              @_nibedika
            </a>
          </div>

          <div className="text-sm sm:text-base text-gray-600 space-y-2 relative z-10 max-w-md mx-auto">
            <p className="flex items-center justify-center">
               Send us photos of your clothes or we'll arrange a meeting
            </p>
            <p className="flex items-center justify-center">
               We’ll verify quality and condition
            </p>
            <p className="flex items-center justify-center">
               Start earning from your wardrobe today!
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 sm:p-10 mt-10 animate__animated animate__fadeInUp animate__delay-200 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-rose-600 mb-6 sm:mb-8">Frequently Asked Questions</h2>

          <div className="space-y-3 sm:space-y-4">
            {[
              {
                id: 'faq1',
                question: 'How long does it take to sell my clothes?',
                answer:
                  'The selling time varies depending on the brand, condition, and demand. Popular brands typically sell within 2-4 weeks, while others may take longer.',
              },
              {
                id: 'faq2',
                question: 'What happens if my clothes don’t sell?',
                answer:
                  'If clothes don’t sell after 3 months, we’ll contact you to either collect them back or donate them to charity (with your permission).',
              },
              {
                id: 'faq3',
                question: 'Can I set my own prices?',
                answer:
                  'We collaborate to set competitive prices based on brand, condition, and market demand to ensure your clothes sell quickly.',
              },
            ].map((faq, index) => (
              <div
                key={faq.id}
                className="border border-rose-200 rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-lg animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <button
                  onClick={() => toggleSection(faq.id)}
                  className="w-full text-left p-4 sm:p-5 focus:outline-none bg-rose-50 hover:bg-rose-100 transition-colors duration-300"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800 text-base sm:text-lg">{faq.question}</h3>
                    <svg
                      className={`w-5 h-5 sm:w-6 sm:h-6 text-rose-500 transform transition-transform duration-300 ${
                        expandedSection === faq.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {expandedSection === faq.id && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 animate__animated animate__fadeIn">
                    <p className="text-gray-600 text-sm sm:text-base">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellClothesPage;
