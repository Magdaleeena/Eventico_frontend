import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import Error from '../components/Error';

const SignOut = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    try {
      logout();
      setTimeout(() => {
        setShowMessage(false);
        navigate('/');
      }, 2000); // 2-second delay before redirect
    } catch (err) {
      setError('There was a problem signing you out. Please try again.');
      console.error('Logout error:', err);
    }
  }, [logout, navigate]);

  if (error) return <Error message={error} />;

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <Loading message="Signing out..." />
      {showMessage && (
        <p className="mt-4 text-purple-700 font-medium">
          You are being signed out. We hope to see you again soon! 
        </p>
      )}
    </div>
  );
};

export default SignOut;


