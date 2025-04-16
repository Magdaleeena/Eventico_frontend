import { MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <Link to={`/events/${event._id}`} className="block">
    <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-lg transition hover:cursor-pointer">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-bold text-purple-700 mb-1">{event.title}</h3>
      <p className="text-gray-600 text-sm mb-2">{event.description}</p>

      <div className="flex items-center text-sm text-gray-500 gap-2 mb-1">
        <Calendar className="w-4 h-4 text-purple-500" />
        {new Date(event.date).toLocaleDateString()}
      </div>

      <div className="flex items-center text-sm text-gray-500 gap-2">
        <MapPin className="w-4 h-4 text-purple-500" />
        {event.location}
      </div>
    </div>
    </Link>
  );
};

export default EventCard;
