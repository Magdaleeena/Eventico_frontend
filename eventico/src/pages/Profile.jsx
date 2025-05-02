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
       <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
        <img
          src={profile.profileImage || "/images/default_profile_img.png"}
          alt={`${profile.firstName} ${profile.lastName}'s profile picture`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center sm:text-left">
        <h2 className="text-3xl font-bold text-purple-700">{profile.firstName} {profile.lastName}</h2>
        <p className="text-gray-500">@{profile.username}</p>
      </div>
    </div>

    <div className="space-y-6">
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <dt className="font-semibold text-gray-700">Email</dt>
          <dd className="text-gray-600">{profile.email}</dd>
        </div>
        <div>
          <dt className="font-semibold text-gray-700">Phone</dt>
          <dd className="text-gray-600">{profile.phone || 'Not provided'}</dd>
        </div>
        <div>
          <dt className="font-semibold text-gray-700">Role</dt>
          <dd className="text-gray-600">{profile.role}</dd>
        </div>
        <div>
          <dt className="font-semibold text-gray-700">Location</dt>
          <dd className="text-gray-600">{profile.location || 'Not provided'}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="font-semibold text-gray-700">Bio</dt>
          <dd className="text-gray-600 text-justify">{profile.bio || 'Not provided'}</dd>
        </div>
        <div>
          <dt className="font-semibold text-gray-700">Date of Birth</dt>
          <dd className="text-gray-600">{profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : 'Not provided'}</dd>
        </div>
        <div>
          <dt className="font-semibold text-gray-700">Verified</dt>
          <dd className="text-gray-600">{profile.isVerified ? 'Yes' : 'No'}</dd>
        </div>
        <div>
          <dt className="font-semibold text-gray-700">Active</dt>
          <dd className="text-gray-600">{profile.isActive ? 'Yes' : 'No'}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="font-semibold text-gray-700">Last Login</dt>
          <dd className="text-gray-600">{profile.lastLogin ? new Date(profile.lastLogin).toLocaleString() : 'Not available'}</dd>
        </div>
      </dl>
    </div>

    <div className="mt-6">
      <h3 className="text-2xl font-bold text-purple-700 mb-4">Social Links</h3>
      <ul className="list-disc list-inside ml-4 text-gray-600 space-y-1">
        <li><strong>LinkedIn:</strong> {profile.social?.linkedin || 'Not provided'}</li>
        <li><strong>Twitter:</strong> {profile.social?.twitter || 'Not provided'}</li>
        <li><strong>Website:</strong> {profile.social?.website || 'Not provided'}</li>
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
        
  
        <div className="mt-6">
            <button
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            onClick={() => navigate('/edit-profile')}
            >
            Edit Profile
            </button>
      </div>
      <div className="mt-3">
        <button
          className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition"
          onClick={() => navigate('/delete-profile')}
        >
          Delete Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
