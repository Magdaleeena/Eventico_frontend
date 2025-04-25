import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/api';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { useAuth } from '../context/AuthContext';

function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginUser(formData);

      login(response.user, response.token); 

      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Sign In</h2>

      {error && <Error message={error} />}
      {loading && <Loading />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border rounded px-4 py-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border rounded px-4 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-700 text-white w-full py-2 rounded"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
        {localStorage.getItem('user') && (
      <p className="text-purple-700 mt-4">
        Welcome, {JSON.parse(localStorage.getItem('user')).username}!
      </p>
    )}
    </div>
  );
}

export default SignIn;
