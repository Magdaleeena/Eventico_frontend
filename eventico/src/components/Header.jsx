import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b shadow-sm bg-white">
      <h1 className="text-3xl font-bold text-purple-700">Eventico</h1>    
      <nav className="space-x-6 font-medium flex items-center">
        <Link to="/" className="hover:text-purple-700">Home</Link>
        <Link to="/events" className="hover:text-purple-700">Events</Link>
        <Link to="/create" className="hover:text-purple-700">Create Event</Link>
        <Link
          to="/search"
          className="hover:text-purple-700 inline-flex items-center justify-center w-8 h-8 rounded-md transition-colors"
          title="Search"
          aria-label="Search">
          <Search className="w-5 h-5" />
        </Link>
      </nav>

      <div className="flex items-center space-x-4">
        <Link
          to="/login"
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-md transition"
        >
          Sign In
        </Link>
        <Link
          to="/signup"
          className="border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-medium px-4 py-2 rounded-md transition"
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Header;
