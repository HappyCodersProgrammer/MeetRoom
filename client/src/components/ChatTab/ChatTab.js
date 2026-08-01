import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
// import Chat from '../LiveChat/Chat';
import Chat from "../Chat/Chat";
import Participant from "../Participant/Participant";
const ChatTab = () => {
	return (
		<Tabs className="w-full px-2 lg:px-4 text-gray-200">
			<TabList className="flex justify-around py-1 bg-chat font-semibold rounded-md">
				<Tab className="cursor-pointer hover:bg-green-500 active:bg-green-500 transition-all py-2 px-4 rounded-lg">
					Chat(5)
				</Tab>
				<Tab className="cursor-pointer hover:bg-green-500 active:bg-green-500 transition-all py-2 px-4 rounded-lg">
					Participents
				</Tab>
			</TabList>

			<div className="bg-chat my-4 rounded-md p-2">
				<TabPanel>
					<Chat />
				</TabPanel>

				<TabPanel>
					<Participant />
				</TabPanel>
			</div>
		</Tabs>
	);
};

export default ChatTab;
