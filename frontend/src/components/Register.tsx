import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await api.post('/register', {
        email,
        password,
      });
      setMessage(`Registration successful: ${response.data.message}. You can now login.`);
      navigate('/login');
    } catch (error: any) {
      setMessage(`Registration failed: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center">Register</h2>
        <div className="w-full flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-700" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <label className="text-sm font-medium text-gray-700" htmlFor="password">Password (min 6 characters)</label>
          <input
            id="password"
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <button
            onClick={handleRegister}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg mt-4 transition shadow-md"
          >
            Register
          </button>
        </div>
        {message && (
          <p className={`mt-6 w-full text-center rounded-lg px-4 py-2 text-sm ${message.includes('success') ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>{message}</p>
        )}
        <p className="mt-6 text-gray-600 text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 hover:underline font-medium">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
