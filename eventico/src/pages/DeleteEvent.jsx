import { useState } from 'react';
import { deleteEvent } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import Error from '../components/Error';

const DeleteEvent = ({ eventId }) => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    setDeleting(true);
    setError('');

    try {
      await deleteEvent(eventId);
      navigate('/events'); 
    } catch (err) {
      console.error('Failed to delete event:', err);
      setError('Failed to delete event');
    } finally {
      setDeleting(false);
    }
  };

  if (!eventId) return null;
  if (error) return <Error message={error} />;

  return (
    <div className="mt-6">
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
      >
        {deleting ? 'Deleting...' : 'Confirm Delete Event'}        
      </button>
    </div>
  );
};

export default DeleteEvent;
