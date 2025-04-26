import { useEffect, useState } from 'react';
import { getUserProfile } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();          
     
        if (response && (response.user || response.firstName)) {
          setProfile(response.user || response);
        } else {
          throw new Error("Invalid profile data");
        }
      } catch (err) {
        setError('Failed to load profile');
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfile();
  }, []);

  if (loading) return <Loading message="Loading profile..." />;
  if (error) return <Error message={error} />;
  if (!profile || !profile.firstName) return <Error message="Could not load your profile. Please try again." />;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex justify-center items-center">
          <img 
            src={profile.profileImage || "/images/default_profile_img.png"} 
            alt="Profile" 
            className="w-full h-full rounded-full object-cover" 
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-purple-700">{profile.firstName} {profile.lastName}</h2>
          <p className="text-gray-500">{profile.username}</p>
        </div>
      </div>
  
      <div className="space-y-4">
        <div className="flex justify-between">
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone || 'Not provided'}</p>
        </div>
        <div className="flex justify-between">
          <p><strong>Role:</strong> {profile.role}</p>
          <p><strong>Location:</strong> {profile.location || 'Not provided'}</p>
        </div>
        <div className="flex justify-between">
          <p><strong>Bio:</strong> {profile.bio || 'Not provided'}</p>
          <p><strong>Date of Birth:</strong> {profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : 'Not provided'}</p>
        </div>
        <div className="flex justify-between">
          <p><strong>Verified:</strong> {profile.isVerified ? 'Yes' : 'No'}</p>
          <p><strong>Active:</strong> {profile.isActive ? 'Yes' : 'No'}</p>
        </div>
        <div className="flex justify-between">
          <p><strong>Last Login:</strong> {profile.lastLogin ? new Date(profile.lastLogin).toLocaleString() : 'Not available'}</p>
        </div>
  
        <div className="mt-4">
          <strong>Social Links:</strong>
          <ul className="list-disc list-inside ml-4">
            <li>LinkedIn: {profile.social?.linkedin || 'Not provided'}</li>
            <li>Twitter: {profile.social?.twitter || 'Not provided'}</li>
            <li>Website: {profile.social?.website || 'Not provided'}</li>
          </ul>
        </div>
  
        {profile.role !== 'admin' && (
        <div className="mt-4">
            <strong>Events Signed Up:</strong>
            <ul className="list-disc list-inside ml-4">
            {Array.isArray(profile.eventsSignedUp) && profile.eventsSignedUp.length > 0 ? (
                profile.eventsSignedUp.map((event, idx) => (
                <li key={event._id || idx} className="mb-2">
                    <Link to={`/events/${event._id}`} className="text-purple-600 hover:underline">
                    {event.title || 'Untitled Event'}
                    </Link>
                    <div className="text-sm text-gray-600">
                    {event.date ? new Date(event.date).toLocaleDateString() : 'Unknown Date'} — {event.location || 'Unknown Location'}
                    </div>
                </li>
                ))
            ) : (
                <li>None</li>
            )}
            </ul>
        </div>
        )}
  
        {profile.role === 'admin' && (
        <div className="mt-4">
            <strong>Events Managed:</strong>
            <ul className="list-disc list-inside ml-4">
            {Array.isArray(profile.eventsManaged) && profile.eventsManaged.length > 0 ? (
                profile.eventsManaged.map((event, idx) => (
                <li key={event._id || idx} className="mb-2">
                    <Link to={`/events/${event._id}`} className="text-purple-600 hover:underline">
                    {event.title || 'Untitled Event'}
                    </Link>
                    <div className="text-sm text-gray-600">
                    {event.date ? new Date(event.date).toLocaleDateString() : 'Unknown Date'} — {event.location || 'Unknown Location'}
                    </div>
                </li>
                ))
            ) : (
                <li>None</li>
            )}
            </ul>
        </div>
        )}
        </div>
  
        <div className="mt-6">
            <button
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            onClick={() => navigate('/edit-profile')}
            >
            Edit Profile
            </button>
      </div>
    </div>
  );
}

export default Profile;

/* <div className="mt-4">
          <strong>Events Signed Up:</strong>
          <ul className="list-disc list-inside ml-4">
            {profile.eventsSignedUp?.length > 0 ? (
              profile.eventsSignedUp.map((eventId, idx) => (
                <li key={eventId || idx}>{eventId}</li>
              ))
            ) : (
              <li>None</li>
            )}
          </ul>
        </div>
*/