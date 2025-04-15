import { useState, useEffect } from "react";
import { getEvents } from "../utils/api";
import { MapPin } from 'lucide-react';
import Loading from "./Loading";
import Error from "./Error";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data.events); 
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch events");
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim()) {
        const lowerQuery = value.toLowerCase();
        const filtered = events.filter((event) => {
          return (
            event.title?.toLowerCase().includes(lowerQuery) ||
            event.description?.toLowerCase().includes(lowerQuery) ||
            event.category?.toLowerCase().includes(lowerQuery) ||
            event.location?.toLowerCase().includes(lowerQuery) ||
            event.keywords?.some((keyword) =>
              keyword.toLowerCase().includes(lowerQuery)
            ) ||
            event.tags?.some((tag) =>
              tag.toLowerCase().includes(lowerQuery)
            )
          );
        });
        setFilteredEvents(filtered);
      } else {
        setFilteredEvents([]);
      }
};

  return (
    <section aria-labelledby="search-heading" className="max-w-2xl mx-auto p-4">
        <h2 id="search-heading" className="sr-only">Search Events</h2>
        <label htmlFor="event-search" className="sr-only">Search Events</label>
        <input
            id="event-search"
            type="text"
            placeholder="Search for events..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 border rounded-lg bg-violet-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {loading && <Loading />}
        {error && <Error message={error} />}
        {searchQuery && (
            <div className="mt-4">
            {filteredEvents.length > 0 ? (
                <ul className="space-y-2">
                {filteredEvents.map((event) => (
                    <li
                    key={event._id}
                    className="bg-white p-4 rounded shadow hover:bg-purple-50 transition">
                    <h3 className="text-lg font-semibold text-purple-700">{event.title}</h3>
                    <p className="text-sm text-gray-800">{event.description}</p>
                    <div className="flex justify-center items-center gap-1 text-sm text-gray-600 mt-2">
                        <MapPin className="w-4 h-4 text-purple-500" />
                            <span>{event.location}</span>
                    </div>
                    </li>
                ))}
                </ul>
            ) : (
                <p className="text-sm text-gray-500 mt-2">
                No events found for <strong>"{searchQuery}"</strong>
                </p>
            )}
            </div>
        )}
    </section>
  );
};

export default SearchBar;
