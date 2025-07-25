import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post('/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      setMessage('Login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      setMessage(`Login failed: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">Login</h2>
        <div className="w-full flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-700" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <label className="text-sm font-medium text-gray-700" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-4 transition shadow-md"
          >
            Login
          </button>
        </div>
        {message && (
          <p className={`mt-6 w-full text-center rounded-lg px-4 py-2 text-sm ${message.includes('success') ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>{message}</p>
        )}
        <p className="mt-6 text-gray-600 text-sm">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline font-medium">Register here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
