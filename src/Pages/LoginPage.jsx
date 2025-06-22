import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../AuthContext'; // Create next

const LoginHomePage = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isLogin ? 'login' : 'register';
      const response = await fetch(`http://localhost:5000/api/user/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      console.log('Response status:', response.status); // Debug
      const data = await response.json();
      console.log('Response data:', data); // Debug
      if (response.ok) {
        login(data.token, data.userId);
        navigate(from, { replace: true });
      } else {
        setError(data.message || 'Error occurred');
      }
    } catch (err) {
        console.error('Fetch error:', err.message); // Debug
      setError('Could not connect to server');
    }
  };

    return (
    <div className="bg-pink-50 min-h-screen flex items-center justify-center pt-16">
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-rose-700 mb-6 text-center">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg text-rose-600 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block text-lg text-rose-600 font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
              placeholder="Enter password"
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-rose-700 text-white font-semibold py-3 rounded-lg hover:bg-rose-600 transition"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-rose-600">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-rose-700 underline hover:text-rose-600"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginHomePage
