import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import Error from '../components/Error';

const categories = [
  'Music',
  'Arts',
  'Social',
  'Health & Wellness',
  'Education',
  'Entertainment',
  'Food & Drink',
  'Conference',
  'Sports',
  'Technology',
  'Networking',
];

const CreateEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    maxParticipants: '',
    keywords: '',
    category: '',
    tags: '',
    image: '',
    eventURL: '',
    organizerEmail: '',
    organizerPhone: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!user || user.role !== 'admin') {
    return <Error message="Access denied. Admins only." />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        title: formData.title,
        date: formData.date,
        location: formData.location,
        description: formData.description,
        maxParticipants: parseInt(formData.maxParticipants, 10),
        keywords: formData.keywords.split(',').map((kw) => kw.trim()),
        category: formData.category,
        tags: formData.tags.split(',').map((tag) => tag.trim()),
        image: formData.image,
        eventURL: formData.eventURL,
        organizerContact: {
          email: formData.organizerEmail,
          phone: formData.organizerPhone,
        },
        status: 'active', 
      };

      await createEvent(payload);
      navigate('/events');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to create event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Create New Event</h2>

      {loading && <Loading message="Creating event..." />}
      {error && <Error message={error} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Date</label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded mt-1"
            rows="4"
          ></textarea>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Max Participants</label>
          <input
            type="number"
            name="maxParticipants"
            value={formData.maxParticipants}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Keywords (comma-separated)</label>
          <input
            type="text"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded mt-1"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Event URL</label>
          <input
            type="url"
            name="eventURL"
            value={formData.eventURL}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Organizer Email</label>
          <input
            type="email"
            name="organizerEmail"
            value={formData.organizerEmail}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
        </div>        
        <div>
          <label className="block font-medium text-gray-700">Organizer Phone</label>
          <input
            type="tel"
            name="organizerPhone"
            value={formData.organizerPhone}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;

  