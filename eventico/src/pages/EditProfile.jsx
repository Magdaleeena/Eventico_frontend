import { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import Error from '../components/Error';

const EditProfile = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        const user = response.user || response;

        // Ensure all editable fields are initialized
        setFormData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          phone: user.phone || '',
          profileImage: user.profileImage || '',
          bio: user.bio || '',
          location: user.location || '',
          dateOfBirth: user.dateOfBirth ? user.dateOfBirth.slice(0, 10) : '',
          social: {
            linkedin: user.social?.linkedin || '',
            twitter: user.social?.twitter || '',
            website: user.social?.website || '',
          },
        });
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('social.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        social: {
          ...prev.social,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await updateUserProfile(formData);
      navigate('/profile');
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading message="Loading profile..." />;
  if (error) return <Error message={error} />;
  if (!formData) return null;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="w-full border px-4 py-2 rounded" />
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="w-full border px-4 py-2 rounded" />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full border px-4 py-2 rounded" />
        <input type="text" name="profileImage" value={formData.profileImage} onChange={handleChange} placeholder="Profile Image URL" className="w-full border px-4 py-2 rounded" />
        <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" rows="3" className="w-full border px-4 py-2 rounded" />
        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full border px-4 py-2 rounded" />
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
        
        <h4 className="font-semibold mt-4">Social Links</h4>
        <input type="text" name="social.linkedin" value={formData.social.linkedin} onChange={handleChange} placeholder="LinkedIn" className="w-full border px-4 py-2 rounded" />
        <input type="text" name="social.twitter" value={formData.social.twitter} onChange={handleChange} placeholder="Twitter" className="w-full border px-4 py-2 rounded" />
        <input type="text" name="social.website" value={formData.social.website} onChange={handleChange} placeholder="Website" className="w-full border px-4 py-2 rounded" />

        <div className="flex justify-between mt-6">
        <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
            Save Changes
        </button>

        <button
            type="button"
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            onClick={() => navigate('/profile')}
        >
            Cancel
        </button>
        </div>
            </form>
            </div>
  );
};

export default EditProfile;
