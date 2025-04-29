import { useEffect, useState } from "react";
import { getEvents } from "../utils/api";
import Loading from "../components/Loading";
import Error from "../components/Error";
import EventCard from "../components/EventCard";
import SortDropdown from "../components/SortDropDown";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("date");        
  const [sortOrder, setSortOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await getEvents({ page, sortBy, sortOrder, limit: 9 });
        setEvents(data.events);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (err) {
        setError("Failed to load events");
        setLoading(false);
      }
    };
    fetchEvents();
  }, [page, sortBy, sortOrder]);

  return (
    <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-purple-700">All Events</h1>      
        <div className="flex justify-end mb-4">
        <SortDropdown
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
        />
        </div>
        {loading && <Loading />}
        {error && <Error message={error} />}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
            <EventCard key={event._id} event={event} />
        ))}
        </div>
        <div className="flex justify-center mt-6 gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
        </div>
    </div>
  );
};

export default Events;

  