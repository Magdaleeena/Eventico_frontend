import axios from 'axios';

const api = axios.create({
  baseURL: 'https://eventico-backend.onrender.com/api',
});

// Fetch all events
export const getEvents = async (options = {}) => {
    const {
        page = 1,
        limit = 10,
        category,
        sortBy = 'date',
        sortOrder = 'asc',
      } = options;

    try {
    const { data } = await api.get('/events', {
        params: {
            page,
            limit,
            category,
            sortBy,
            sortOrder,
        },
    });
    return data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Fetch a single event by ID
export const getEventById = async (eventId) => {
  try {
    const { data } = await api.get(`/events/${eventId}`);
    return data;
  } catch (error) {
    console.error(`Error fetching event with ID ${eventId}:`, error);
    throw error;
  }
};

// Local frontend search (no need for async here)
export const searchEventsLocally = (events, query) => {
  return events.filter((event) =>
    event.name.toLowerCase().includes(query.toLowerCase())
  );
};

