import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../utils/api";
import Loading from "../components/Loading";
import Error from "../components/Error";
import EventActions from "./EventActions";
import { Calendar, MapPin, Users, Mail, Phone, ExternalLink } from "lucide-react";

const SingleEvent = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true);
                const data = await getEventById(eventId);
                setEvent(data);
                setLoading(false);
            }
            catch (err) {
                setError("Failed to load this event");
                setLoading(false);
            }
        };
        fetchEvent();
    }, [eventId]);

    if (loading) return <Loading />;
    if (error) return <Error message={error} />;
    if (!event) return <p>Event does not exist!</p>;

    return (
        <section className="max-w-4xl mx-auto p-6">
            <h2 className="sr-only">Event details for {event.title}</h2>
            <div className="flex items-start justify-between mb-4">
                <h1 className="text-4xl font-bold text-purple-700">{event.title}</h1>
                <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full h-fit">
                {event.category}
                </span>
            </div>
            <div className="text-gray-600 space-y-2 mb-6">
                <p className="flex items-center gap-2"><Calendar className="w-5 h-5 text-purple-500" /> {new Date(event.date).toLocaleDateString()}</p>
                <p className="flex items-center gap-2"><MapPin className="w-5 h-5 text-purple-500" /> {event.location}</p>
                <p className="flex items-center gap-2"><Users className="w-5 h-5 text-purple-500" /> Max participants: {event.maxParticipants}</p>
            </div>
            <p className="text-lg text-gray-800">{event.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
            {event.tags?.map((tag) => (
                <span key={tag} className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">#{tag}
                </span>
                ))}
            </div>
            {event.image && (
            <img src={event.image} alt={event.title} className="mt-6 rounded shadow-lg max-h-96 w-full object-cover"/>
            )}
            <p className="text-sm text-gray-500 mt-4">
            Organized by{" "}
            <span className="font-semibold">
                {event.createdBy?.firstName} {event.createdBy?.lastName}
            </span>
            </p>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-500" />
                <a
                href={`mailto:${event.organizerContact?.email}`}
                className="text-purple-600 underline"
                >
                {event.organizerContact?.email}
                </a>
            </p>
            <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-purple-500" />
                <a
                href={`tel:${event.organizerContact?.phone}`}
                className="text-purple-600 underline"
                >
                {event.organizerContact?.phone}
                </a>
            </p>
            <p className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-purple-500" />
                <a
                href={event.eventURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 underline"
                >
                View on Eventico
                </a>
            </p>
            </div>
            <EventActions event={event} />
        </section>
    );
};

export default SingleEvent;