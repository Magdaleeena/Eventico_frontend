import axios from 'axios';

const api = axios.create({
  baseURL: 'https://eventico-backend.onrender.com/api',
});


// Fetch events for search
export const getAllEventsForSearch = async () => {
  try {
    const { data } = await api.get('/events', { 
      params: {
        limit: 100
      },
    });
    return data.events;
  } catch (error) {
    console.log('Error fetching all events for search', error);
    throw error;
  }
}

// Fetch all events 
export const getEvents = async (options = {}) => {
    const {
        page = 1,
        limit = 9,
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

// USER: Sign up
export const signUpUser = async (userData) => {
  try {
    const { data } = await api.post('/users/register', userData);
    return data;
  } catch (error) {
    console.error('Error signing up:', error.response?.data || error.message);
    throw error;
  }
};

// USER: Sign in (login)
export const loginUser = async (credentials) => {
  try {
    const { data } = await api.post('/users/login', credentials);
    localStorage.setItem('token', data.token);    // Save the token for future authenticated API requests
    return data;
  } catch (error) {
    console.error('Error logging in:', error.response?.data || error.message);
    throw error;
  }
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// USER: Get profile
export const getUserProfile = async () => {
  try {
    const { data } = await api.get('/users/me');
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error.response?.data || error.message);
    throw error;
  }
};

// USER: Update profile
export const updateUserProfile = async (updatedData) => {
  try {
    const { data } = await api.put('/users/me', updatedData);
    return data;
  } catch (error) {
    console.error('Error updating profile:', error.response?.data || error.message);
    throw error;
  }
};

// USER: Delete own profile
export const deleteUserProfile = async () => {
  try {
    const { data } = await api.delete('/users/me');
    return data;
  } catch (error) {
    console.error('Error deleting profile:', error.response?.data || error.message);
    throw error;
  }
};


// Sign Up for an event
export const signUpForEvent = async (eventId) => {
  try {
    const { data } = await api.post(`/events/${eventId}/signup`);
    return data;
  } catch (err) {
    console.error('Error signing up for event:', err.response?.data || err.message);
    throw err;
  }
};

// Unsign Up from an event
export const unSignUpFromEvent = async (eventId) => {
  try {
    const { data } = await api.post(`/events/${eventId}/unsignup`);
    return data;
  } catch (err) {
    console.error('Error unsigning from event:', err.response?.data || err.message);
    throw err;
  }
};

// Create Event for admins
export const createEvent = async (eventData) => {
  try {
    const token = localStorage.getItem('token'); 
    const { data } = await api.post('/events', eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error('Error creating event:', error.response?.data || error.message);
    throw error;
  }
};

// Update an Event (Admin only)
export const updateEvent = async (eventId, updatedData) => {
  try {
    const { data } = await api.put(`/events/${eventId}`, updatedData);
    return data;
  } catch (error) {
    console.error('Error updating event:', error.response?.data || error.message);
    throw error;
  }
};

// Delete an Event (Admin only)
export const deleteEvent = async (eventId) => {
  try {
    const { data } = await api.delete(`/events/${eventId}`);
    return data;
  } catch (error) {
    console.error('Error deleting event:', error.response?.data || error.message);
    throw error;
  }
};


