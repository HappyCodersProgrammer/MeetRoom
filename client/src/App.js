import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConferenceRoom from "./ConferenceRoom/ConferenceRoom";
import HomeConference from "./ConferenceRoom/HomeConference/HomeConference";
import UserConference from "./ConferenceRoom/UserConference/UserConference";
import GroupRoom from "./ConferenceRoom/VideoConference/GroupRoom";
import LiveBroadCast from "./ConferenceRoom/VideoConference/LiveBroadCast";
import SingleRoom from "./ConferenceRoom/VideoConference/SingleRoom";
import AddMember from "./Dashboard/AddMember";
import AllUser from "./Dashboard/AllUser";
import Dashboard from "./Dashboard/Dashboard";
import ManageMember from "./Dashboard/ManageMember";
import Error from "./components/Error/Error";
import Footer from "./components/Footer/Footer";
import LiveChat from "./components/LiveChat/LiveChat";
import MeetingSchedule from "./components/MeetingSchedule/MeetingSchedule";
import Navbar from "./components/Navbar/Navbar";
import auth from "./firebase.init";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import RequireAuth from "./pages/Register/RequireAuth";
import SignIn from "./pages/Register/SignIn";
import SignUp from "./pages/Register/SignUp";
import SupportPage from "./pages/SupportPage/SupportPage";

function App() {
	const [user] = useAuthState(auth);

	return (
		<>
			{!user ? <Navbar /> : ""}
			<Routes>
				{/* ================Website Route =================*/}
				<Route path="/" element={<Home />}></Route>
				<Route path="/signIn" element={<SignIn />}></Route>
				<Route path="/signup" element={<SignUp />}></Route>
				<Route path="/support" element={<SupportPage />}></Route>
				<Route path="/about" element={<About />}></Route>
				<Route path="/contact" element={<Contact />}></Route>
				<Route path="/schedule" element={<MeetingSchedule />}></Route>
				<Route
					path="/dashboard"
					element={
						<RequireAuth>
							<Dashboard />
						</RequireAuth>
					}
				>
					<Route path="/dashboard/users" element={<AllUser />}></Route>
					<Route path="/dashboard/addMembers" element={<AddMember />}></Route>
					<Route
						path="/dashboard/manageMembers"
						element={<ManageMember />}
					></Route>
					<Route index element={<AllUser />}></Route>
				</Route>
				{/* ================VideoConference Room Route =================*/}
				<Route
					path="/conference"
					element={
						<RequireAuth>
							<ConferenceRoom />
						</RequireAuth>
					}
				>
					<Route index element={<HomeConference />}></Route>
					<Route path="/conference/users" element={<UserConference />}></Route>
					{/* single room */}
					<Route path="/conference/room/:roomID" element={<SingleRoom />} />
					{/* group room */}
					<Route path="/conference/room/group/:roomGroupID" element={<GroupRoom />} />
					{/* live broadcast */}
					<Route path="/conference/broadcast/:broadcastID" element={<LiveBroadCast />} />
					{/* just chat live */}
					<Route path="/conference/live-chat" element={<LiveChat />} />
				</Route>
				<Route path="*" element={<Error />}></Route>
			</Routes>
			<ToastContainer />
			{!user ? <Footer /> : ""}
		</>
	);
}

export default App;
