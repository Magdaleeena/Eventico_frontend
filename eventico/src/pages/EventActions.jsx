import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { signUpForEvent, unSignUpFromEvent, getUserProfile } from '../utils/api';
import Loading from '../components/Loading';
import Error from '../components/Error';

const EventActions = ({ event }) => {
  const { user, loading: authLoading } = useAuth();
  const [signedUp, setSignedUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCalendarBtn, setShowCalendarBtn] = useState(false);

  useEffect(() => {
    const checkSignupStatus = async () => {      
      try {
        
        const profile = await getUserProfile();
        const isSignedUp = profile.eventsSignedUp?.some(ev => ev._id === event._id);
        setSignedUp(isSignedUp);
        setShowCalendarBtn(isSignedUp);
        setError('');
      } catch (err) {
        console.error('Error checking signup status:', err);
        setError('Failed to load signup status.');
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role !== 'admin' && event?._id) {
      checkSignupStatus();
    } else {
      setLoading(false);
    }
  }, [event._id, user]);

  const handleSignUp = async () => {
    try {
      setActionLoading(true);
      await signUpForEvent(event._id);
      setSignedUp(true);
      setShowCalendarBtn(true);
      setError('');
    } catch (err) {
      console.error('Error signing up:', err);
      setError(err.response?.data?.msg || 'Error signing up.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUnSignUp = async () => {
    try {
      setActionLoading(true);
      await unSignUpFromEvent(event._id);
      setSignedUp(false);
      setShowCalendarBtn(false);
      setError('');
    } catch (err) {
      console.error('Error cancelling signup:', err);
      setError(err.response?.data?.msg || 'Error cancelling signup.');
    } finally {
      setActionLoading(false);
    }
  };

  const addToGoogleCalendar = () => {
    const start = new Date(event.date).toISOString().replace(/[-:]|\.\d{3}/g, '');
    const end = new Date(new Date(event.date).getTime() + 60 * 60 * 1000)
      .toISOString()
      .replace(/[-:]|\.\d{3}/g, '');

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${start}/${end}&details=${encodeURIComponent(
      event.description
    )}&location=${encodeURIComponent(event.location)}`;

    window.open(googleCalendarUrl, '_blank');
  };

  if (authLoading || loading) return null;
  if (!user || user.role === 'admin') return null;

  
  if (error) return <Error message={error} />;

  return (
    <div className="mt-6 space-y-3">
      {!signedUp ? (
        <button
          onClick={handleSignUp}
          disabled={actionLoading}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          {actionLoading ? 'Signing up...' : 'Sign Up for Event'}
        </button>
      ) : (
        <>
          <button
            onClick={handleUnSignUp}
            disabled={actionLoading}
            className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition"
          >
            {actionLoading ? 'Cancelling...' : 'Cancel Sign Up'}
          </button>

          {showCalendarBtn && (
            <button
              onClick={addToGoogleCalendar}
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
            >
              Add to Google Calendar
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default EventActions;

