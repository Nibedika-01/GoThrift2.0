import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin-dashboard');
      } else {
        setErrorMsg(data.message || 'Invalid credentials');
        setTimeout(() => setErrorMsg(''), 3000);
      }
    } catch (err) {
      setErrorMsg('Error: Could not connect to server');
      setTimeout(() => setErrorMsg(''), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 px-4 font-sans relative" style={{ background: 'linear-gradient(135deg, #fce7f3 0%, #fff1f2 100%)' }}>
      <div className="absolute top-0 left-0 w-32 h-32 bg-rose-200 rounded-full -translate-x-16 -translate-y-16 opacity-50" />
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-pink-200 rounded-full translate-x-12 translate-y-12 opacity-50" />

      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative overflow-hidden animate-fadeIn">
        <button
          onClick={() => navigate('/login')}
          className="absolute top-4 left-4 p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-full transition-all duration-200"
          title="Go back"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-rose-700 mb-2">Admin Login</h2>
          <p className="text-rose-500 text-sm">Sign in to your admin account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-rose-700 mb-2">Username</label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full p-4 pl-12 rounded-xl border-2 border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-rose-50 placeholder-rose-400"
                  placeholder="Enter username"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-rose-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-4 pl-12 rounded-xl border-2 border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-rose-50 placeholder-rose-400"
                  placeholder="Enter password"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 text-sm">{errorMsg}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:scale-105 shadow-lg transition-all"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
