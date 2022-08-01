import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import Join from './pages/Join/Join';
import SignIn from './pages/Register/SignIn';
import ReceiveSingleCall from './pages/ReceiveSingleCall/ReceiveSingleCall';
import SingleCall from './pages/SingleCall/SingleCall';
// import GroupCall from './pages/GroupCall/GroupCall';
import SupportPage from './pages/SupportPage/SupportPage';
import SignUp from './pages/Register/SignUp';
import LiveChat from './components/LiveChat/LiveChat';
import VideoConference from './pages/VideoConference/VideoConference';
import RequireAuth from './pages/Register/RequireAuth';
import Video from './components/Video/Video';
import Slider from './components/Slider/Slider';
import Chat from './components/Chat/Chat';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}> </Route>
        <Route path="/signIn" element={<SignIn />}> </Route>
        <Route path="/signup" element={<SignUp />}> </Route>
        <Route path="/join" element={<Join />}> </Route>
        <Route path="/liveChat" element={<LiveChat />}> </Route>
        <Route path="/single" element={<SingleCall />}> </Route>
        <Route path="/receive" element={<ReceiveSingleCall />}> </Route>
        <Route path="/support" element={<SupportPage />}> </Route>
        <Route path="/about" element={<About />}> </Route>
        <Route path="/contact" element={<Contact />}> </Route>
        <Route path="/conference" element={<RequireAuth>
          <VideoConference></VideoConference>
        </RequireAuth>}> </Route>
        <Route path="/conference" element={<VideoConference />}> </Route>
        <Route path="/Video" element={<Video />}> </Route>
        <Route path="/slide" element={<Slider />}> </Route>
        <Route path="/chat" element={<Chat />}> </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
