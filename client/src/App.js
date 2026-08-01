import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConferenceRoom from "./features/conference/ConferenceRoom";
import HomeConference from "./features/conference/home/HomeConference";
import UserConference from "./features/conference/users/UserConference";
import GroupRoom from "./features/conference/components/VideoConference/GroupRoom";
import LiveBroadCast from "./features/conference/components/VideoConference/LiveBroadCast";
import SingleRoom from "./features/conference/components/VideoConference/SingleRoom";
import AddMember from "./features/dashboard/AddMember";
import AllUser from "./features/dashboard/AllUser";
import Dashboard from "./features/dashboard/Dashboard";
import ManageMember from "./features/dashboard/ManageMember";
import Error from "./components/Error/Error";
import Footer from "./components/Footer/Footer";
import LiveChat from "./components/LiveChat/LiveChat";
import MeetingSchedule from "./components/MeetingSchedule/MeetingSchedule";
import Navbar from "./components/Navbar/Navbar";
import auth from "./firebase.init";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import RequireAuth from "./features/auth/pages/RequireAuth";
import SignIn from "./features/auth/pages/SignIn";
import SignUp from "./features/auth/pages/SignUp";
import SupportPage from "./pages/SupportPage/SupportPage";
import BroadcastViewer from "./features/conference/components/VideoConference/BroadcastViewer";

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
				<Route path="/broadcast-view/:broadcastID" element={<BroadcastViewer />} />
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
