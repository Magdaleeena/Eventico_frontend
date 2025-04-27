import { useEffect, useState } from 'react';
import { updateEvent } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import Error from '../components/Error';

const UpdateEvent = ({ event }) => {
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        date: event.date ? event.date.slice(0, 10) : '',
        location: event.location || '',
        maxParticipants: event.maxParticipants || '',
        keywords: event.keywords?.join(', ') || '',
        category: event.category || '',
        tags: event.tags?.join(', ') || '',
        image: event.image || '',
        eventURL: event.eventURL || '',
        status: event.status || 'active',
        organizerEmail: event.organizerContact?.email || '',
        organizerPhone: event.organizerContact?.phone || '',
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await updateEvent(event._id, {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        location: formData.location,
        maxParticipants: formData.maxParticipants,
        keywords: formData.keywords.split(',').map((k) => k.trim()),
        category: formData.category,
        tags: formData.tags.split(',').map((t) => t.trim()),
        image: formData.image,
        eventURL: formData.eventURL,
        status: formData.status,
        organizerContact: {
          email: formData.organizerEmail,
          phone: formData.organizerPhone,
        },
      });
      navigate(0); // Refresh current page
    } catch (err) {
      console.error('Failed to update event:', err);
      setError('Failed to update event');
    } finally {
      setSaving(false);
    }
  };

  if (!formData) return <Loading message="Loading event data..." />;
  if (error) return <Error message={error} />;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
  <h2 className="text-2xl font-bold mb-6 text-purple-700">Update Event</h2>

  <form onSubmit={handleSubmit} className="space-y-4">

    <div>
      <label className="block font-medium text-gray-700 mb-1">Title</label>
      <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full border border-gray-300 p-2 rounded mt-1" />
    </div>

    <div>
      <label className="block font-medium text-gray-700 mb-1">Date</label>
      <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full border border-gray-300 p-2 rounded mt-1" />
    </div>

    <div>
      <label className="block font-medium text-gray-700 mb-1">Location</label>
      <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full border border-gray-300 p-2 rounded mt-1" />
    </div>

    <div>
      <label className="block font-medium text-gray-700 mb-1">Description</label>
      <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required className="w-full border border-gray-300 p-2 rounded mt-1" />
    </div>

    <div>
      <label className="block font-medium text-gray-700 mb-1">Max Participants</label>
      <input type="number" name="maxParticipants" value={formData.maxParticipants} onChange={handleChange} required className="w-full border border-gray-300 p-2 rounded mt-1" />
    </div>

    <div>
      <label className="block font-medium text-gray-700 mb-1">Keywords (comma-separated)</label>
      <input type="text" name="keywords" value={formData.keywords} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded mt-1" />
    </div>

    <div>
      <label className="block font-medium text-gray-700 mb-1">Category</label>
      <input type="text" name="category" value={formData.category} onChange={handleChange} required className="w-full border border-gray-300 p-2 rounded mt-1" />
    </div>

    <div>
      <label className="block font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
      <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded mt-1" />
    </div>

    <div>
      <label className="block font-medium text-gray-700 mb-1">Image URL</label>
      <input type="url" name="image" value={formData.image} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded mt-1" />
    </div>

    <div>
      <label className="block font-medium text-gray-700 mb-1">Event URL</label>
      <input type="url" name="eventURL" value={formData.eventURL} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded mt-1" />
    </div>

    <div>
      <label className="block font-medium text-gray-700 mb-1">Status</label>
      <input type="text" name="status" value={formData.status} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded mt-1" />
    </div>

    <h4 className="text-lg font-semibold mt-6 mb-2 text-gray-800">Organizer Contact</h4>

    <div>
      <label className="block font-medium text-gray-700 mb-1">Organizer Email</label>
      <input type="email" name="organizerEmail" value={formData.organizerEmail} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded mt-1" />
    </div>

    <div>
      <label className="block font-medium text-gray-700 mb-1">Organizer Phone</label>
      <input type="tel" name="organizerPhone" value={formData.organizerPhone} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded mt-1" />
    </div>

    <div className="flex justify-between mt-6">
      <button type="submit" disabled={saving} className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition">
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
      <button type="button" onClick={() => navigate(-1)} className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition">
        Cancel
      </button>
    </div>

  </form>
</div>

    
  );
};

export default UpdateEvent;
