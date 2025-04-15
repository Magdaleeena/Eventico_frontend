import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      <section className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-5xl font-bold text-purple-700 mb-6">
          Create. Discover. Celebrate - All Your Events in One Place.
        </h1>
        <p className="max-w-xl text-xl mb-8">
          From intimate meetups to big experiences — browse, host, and join events built around what you love.
        </p>
        <Link
          to="/events"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition">
          Explore Now
        </Link>
      </section>
    </div>
  );
};

export default Home;

