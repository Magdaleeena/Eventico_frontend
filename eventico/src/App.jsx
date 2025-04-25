import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import CreateEvent from './pages/CreateEvent';
import Search from './pages/Search';
import SingleEvent from './pages/SingleEvent';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SignOut from './pages/SignOut';


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<SingleEvent />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/search" element={<Search />} />        
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn/>} /> 
        <Route path="/signout" element={<SignOut />} />      
      </Routes>
      <Footer />
    </>
  );
}

export default App;
