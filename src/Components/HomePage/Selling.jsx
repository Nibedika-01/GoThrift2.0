import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FloatingSellComponent = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/sell-clothes');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main floating button */}
      <div
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Subtle shining animation ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 opacity-30 animate-pulse"></div>
        
        {/* Main button */}
        <div className="relative bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        onClick={handleGetStarted}>
          <div className="relative flex items-center gap-2">
            {/* Icon */}
            <svg 
              className="w-5 h-5 text-rose-600" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
              <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd"/>
            </svg>
            
            {/* Text */}
            <span className="text-rose-700 font-semibold text-sm whitespace-nowrap">
              How to sell clothes?
            </span>
            
            {/* Arrow */}
            <svg 
              className={`w-4 h-4 text-rose-600 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        
        {/* Tooltip/Popup on hover */}
        {isHovered && (
          <div className="absolute bottom-full right-0 mb-2 w-64 bg-white/90 backdrop-blur-md border border-white/30 rounded-lg p-4 shadow-xl animate-fadeIn">
            <div className="text-rose-700 font-semibold text-sm mb-2">
              Start selling your clothes today!
            </div>
            <div className="text-rose-600 text-xs mb-3">
              Easy steps to list your items and reach buyers
            </div>
            <button 
              className="w-full bg-rose-500 text-white text-xs py-2 px-3 rounded-md hover:bg-rose-600 transition-colors duration-200"
              onClick={handleGetStarted}
            >
              Get Started
            </button>
            
            {/* Arrow pointing down */}
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white/90"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingSellComponent;