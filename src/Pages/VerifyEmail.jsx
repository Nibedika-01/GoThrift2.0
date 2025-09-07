import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const hasRun = useRef(false); // prevents re-run

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const verifyEmail = async () => {
      const token = searchParams.get('token');
      if (!token) {
        setMessage('Invalid verification link');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/verify-email?token=${token}`);
        setMessage(response.data.message);
        setTimeout(() => navigate('/login'), 3000);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Verification failed');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);


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
          <h2 className="text-3xl font-bold text-rose-700 mb-2">Email Verification</h2>
          {loading ? (
            <p className="text-rose-500 text-sm">Verifying your email...</p>
          ) : (
            <>
              <p className="text-rose-500 text-sm mb-4">{message}</p>
              {message.includes('successfully') && (
                <p className="text-green-600 text-xs">Redirecting to login page...</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;