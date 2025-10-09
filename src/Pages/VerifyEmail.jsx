import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyEmailCode = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);
  const email = location.state?.email || '';

  // Auto-focus first input on mount and check email
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
    if (!email) {
      setError('No email provided. Please sign up again.');
    }
  }, [email]);

  // Handle countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const countdownTimer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownTimer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdownTimer);
    }
  }, [countdown]);

  // Handle input change for each digit
  const handleInputChange = (index, value) => {
    if (/[^0-9]/.test(value)) return; // Allow only digits
    const newCode = [...code];
    newCode[index] = value.slice(-1); // Take last digit
    setCode(newCode);

    // Move focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace to move to previous input
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste from clipboard
  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setCode(pasted.split(''));
      inputRefs.current[5].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const codeString = code.join('');
    if (!email) {
      setError('No email provided. Please sign up again.');
      setSuccessMessage('');
      return;
    }
    if (!codeString || codeString.length !== 6) {
      setError('Please enter a 6-digit verification code');
      setSuccessMessage('');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      console.log('Sending payload:', { email, code: codeString }); // Debug log
      const response = await axios.post('http://localhost:5000/api/verify-email-code', {
        email,
        code: codeString,
      });
      setSuccessMessage(response.data.message);
      if (response.data.success) {
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setCode(['', '', '', '', '', '']); // Clear inputs on failure
      }
    } catch (error) {
      console.error('Verification error:', error.response?.data, error); // Debug log
      const errorMessage =
        error.response?.status === 404
          ? 'Verification service unavailable. Please try again later.'
          : error.response?.data?.message || 'Verification failed. Please check the code or try again.';
      setError(errorMessage);
      setCode(['', '', '', '', '', '']);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      setError('Please sign up again to receive a verification code');
      setSuccessMessage('');
      return;
    }
    if (countdown > 0) {
      setError(`Please wait ${countdown} seconds before resending`);
      setSuccessMessage('');
      return;
    }
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/resend-verification', { email });
      setSuccessMessage(response.data.message || 'Verification code resent successfully');
      setCountdown(20);

      const messageTimer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);

      return () => {
        clearTimeout(messageTimer);
      };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend verification code');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 to-rose-100 min-h-screen flex items-center justify-center p-5 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-rose-200 rounded-full -translate-x-16 -translate-y-16 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-pink-200 rounded-full translate-x-12 translate-y-12 opacity-50"></div>
        <div className="text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full mb-4">
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <h2 className="text-3xl font-bold text-rose-700 mb-4">Email Verification</h2>
          <p className="text-rose-500 text-sm mb-4">Enter the 6-digit code sent to {email || 'your email'}</p>
          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center mb-6">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-green-700 text-sm">{successMessage}</p>
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center mb-6">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} onPaste={handlePaste}>
            <div className="flex justify-center space-x-2 mb-6">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-10 h-10 text-center text-lg border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  disabled={loading}
                  maxLength="1"
                  aria-label={`Verification code digit ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-2 rounded-lg hover:from-rose-600 hover:to-pink-600 disabled:opacity-50"
              disabled={loading}
              aria-label="Verify code"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>
          </form>
          <button
            type="button"
            onClick={handleResendVerification}
            className="mt-4 text-rose-500 text-sm hover:underline disabled:opacity-50"
            disabled={loading || countdown > 0}
            aria-label="Resend verification code"
          >
            {countdown > 0 ? `Resend Code (${countdown}s)` : 'Resend Code'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailCode;