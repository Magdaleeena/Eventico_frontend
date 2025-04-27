import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getEventById } from "../utils/api";
import Loading from "../components/Loading";
import Error from "../components/Error";
import EventActions from "./EventActions";
import { Calendar, MapPin, Users, Mail, Phone, ExternalLink } from "lucide-react";
import UpdateEvent from "./UpdateEvent";   
import DeleteEvent from "./DeleteEvent";



const SingleEvent = () => {
    const { eventId } = useParams();    
    const { user, loading: authLoading } = useAuth();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

    const handleUpdateSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    const handleDeleteSuccess = () => {
        setSuccessMessage("Event deleted successfully!");
        setTimeout(() => {
            navigate("/events"); 
        }, 2000);
    }

    if (authLoading || loading) return <Loading />;       
    if (error) return <Error message={error} />;
    if (!event) return <p>Event does not exist!</p>;

    const isAdminCreator = user && user.role === 'admin' && (
        event.createdBy?._id?.toString() === user.id?.toString() ||
        event.createdBy?._id?.toString() === user._id?.toString()
      );

    return (
        <section className="max-w-4xl mx-auto p-6">
            {successMessage && (
                <div className="mb-6 bg-green-100 text-green-800 px-4 py-3 rounded-md text-center">
                    {successMessage}
                </div>
            )}
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
            {isAdminCreator ? (
            <div className="mt-8">
                {/* Separate buttons from the form */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6 w-fit">
                <button
                    onClick={() => setShowUpdateForm(true)}
                    className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition"
                >
                    Edit Event
                </button>
                <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
                >
                    Delete Event
                </button>
                </div>

                {/* Form section - not inside buttons flex */}
                {showUpdateForm && (
                <div className="w-full">
                    <UpdateEvent event={event} onSuccess={handleUpdateSuccess} />
                </div>
                )}

                {showDeleteConfirm && (
                <div className="w-full">
                    <DeleteEvent eventId={event._id} onSuccess={handleDeleteSuccess} />
                </div>
                )}
            </div>
            ) : (
            <EventActions event={event} />
            )}
            
        </section>
        );
};

export default SingleEvent;