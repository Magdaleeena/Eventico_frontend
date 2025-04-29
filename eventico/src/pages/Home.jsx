import { Link } from 'react-router-dom';
import { getEvents } from '../utils/api';
import { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';

const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchUpComingEvents = async () => {
      try {
        const data = await getEvents({ page: 1, sortBy: 'date', sortOrder: 'asc', limit: 10 });
        const now = new Date();
        const futureEvents = data.events.filter((event) => new Date(event.date) > now);
        setUpcomingEvents(futureEvents.slice(0, 3));
      }
      catch (err) {
        console.log('Failed to load upcoming events!', err)
      };      
    };
    fetchUpComingEvents();
  }, [])

  return (
    <div className="min-h-screen">
      <section className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-5xl font-bold text-purple-700 mb-6">
          Create. Discover. Celebrate - All Your Events in One Place.
        </h1>
        <p className="max-w-xl text-xl mb-8">
          From intimate meetups to big experiences — browse, host, and join events built around what you love.
        </p>
        <p className="max-w-xl text-purple-700 text-2xl font-semibold mb-8">
          Sign up today and book your spot!
        </p>
        <Link
          to="/events"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition">
          Explore Now
        </Link>
      </section>

      <section className="max-w-6xl  items-center justify-center text-center mx-auto px-6 py-10">
        <h2 className="text-3xl font-semibold text-purple-700 mb-6">Upcoming Events</h2>

        {upcomingEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No upcoming events found.</p>
        )}

      </section>
    </div>
  );
};

export default Home;

