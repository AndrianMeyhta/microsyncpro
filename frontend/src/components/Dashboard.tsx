import { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await api.get('/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error: any) {
        setMessage(`Failed to fetch profile: ${error.response?.data?.error || error.message}`);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100"><div className="text-lg text-gray-600">Loading profile...</div></div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-emerald-700 mb-8 text-center">Dashboard</h2>
        {message && (
          <p className="mb-6 w-full text-center rounded-lg px-4 py-2 text-sm bg-red-100 text-red-700 border border-red-200">{message}</p>
        )}
        <p className="mb-4 text-lg text-gray-700 font-semibold">Welcome, <span className="text-emerald-600">{profile.email}</span>!</p>
        <p className="mb-4 text-gray-600">Your User ID: <span className="font-mono text-gray-800">{profile.id}</span></p>
        <p className="mb-8 text-gray-500 italic">{profile.message}</p>
        <button
          onClick={handleLogout}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
