# MeetRoom

**Professional Video, Audio & Chat Conferencing — inspired by Google Meet & Zoom.**

MeetRoom is a full-stack real-time communication platform featuring one-to-one video calls, group video conferences, live broadcasting, in-call chat, online chat rooms, and screen sharing. Built with a professional dark UI using React, Express, Socket.IO, WebRTC (simple-peer), and Firebase Authentication.

![Tech Stack](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Tech Stack](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss)
![Tech Stack](https://img.shields.io/badge/Socket.IO-4-010101?logo=socketdotio)
![Tech Stack](https://img.shields.io/badge/WebRTC-Ready-333333?logo=webrtc)
![Tech Stack](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Architecture Overview](#architecture-overview)
- [Deployment](#deployment)

---

## Features

### Video Conferencing
1. **One-to-One Video Call** — P2P WebRTC video/audio with in-call chat via data channels
2. **Group Video Call** — Multi-party WebRTC mesh with participant sidebar and group chat
3. **Live Broadcast** — One-to-many streaming with viewer count, fullscreen, and screen sharing
4. **Screen Sharing** — Share your screen during 1-to-1, group, or broadcast sessions
5. **In-Call Chat** — WebRTC data-channel chat (1-to-1) and Socket.IO relayed chat (group)
6. **Online Chat Rooms** — Standalone Socket.IO chat rooms with emoji support

### Meeting Controls
7. **Toggle Camera / Microphone** — Individual mute/unmute with visual state feedback
8. **Meeting Controls Bar** — Glass-morphic bottom bar (Google Meet style)
9. **Room Sharing** — Copy meeting link with one click
10. **Recording** — In-call recording via MediaRecorder API; auto-saves as `.webm` and downloads when stopped
11. **Participant List** — View all participants in group calls with avatars
12. **Responsive Sidebar** — Chat and participants panel with mobile close button

### Authentication & UI
13. **Authentication** — Firebase email/password sign-in & sign-up with route protection
14. **Professional Dark UI** — Tailwind CSS + DaisyUI, mobile-first responsive design
15. **Mobile Drawer** — Collapsible sidebar navigation for mobile devices
16. **Real-Time Notifications** — Toast notifications for events (join, leave, errors)

---

## Tech Stack

### Client (`client/`)

| Category          | Technology                          |
|-------------------|-------------------------------------|
| Framework         | React 18                            |
| Build             | Create React App (react-scripts 5)  |
| Styling           | Tailwind CSS 3, DaisyUI 2           |
| Routing           | React Router DOM 6                  |
| Auth              | Firebase Auth 9, react-firebase-hooks|
| Realtime          | Socket.IO Client 4                  |
| WebRTC            | simple-peer                         |
| Icons             | react-icons                         |
| Chat UI           | @emoji-mart/react, react-scroll-to-bottom |
| Carousel          | Swiper 8                            |
| Data Fetching     | React Query                         |
| Forms             | react-hook-form                     |
| Notifications     | react-toastify                      |

### Server (root)

| Category          | Technology                          |
|-------------------|-------------------------------------|
| Runtime           | Node.js                             |
| Framework         | Express 4                           |
| Realtime          | Socket.IO 4                         |
| CORS              | cors                                |
| Config            | dotenv                              |
| Dev Server        | nodemon                             |

---

## Project Structure

```
MeetRoom/
├── client/                          # React frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   ├── robots.txt
│   │   └── _redirects
│   ├── src/
│   │   ├── assets/                  # Static images and icons
│   │   │   ├── 24x7.jpg
│   │   │   ├── user.jpg
│   │   │   ├── logo.svg
│   │   │   └── images/
│   │   │       ├── 404.png
│   │   │       ├── arch.jpeg
│   │   │       ├── error.gif
│   │   │       ├── group.png
│   │   │       ├── load.gif
│   │   │       ├── logo.png
│   │   │       ├── man-computer.png
│   │   │       ├── online-meeting.png
│   │   │       ├── user.png
│   │   │       ├── video-meeting.png
│   │   │       └── watchbg.jpg
│   │   ├── components/              # Shared/reusable components by domain
│   │   │   ├── Chat/
│   │   │   │   ├── Chat.js
│   │   │   │   ├── GroupChat.js
│   │   │   │   └── SignleChat.js
│   │   │   ├── ChatTab/ChatTab.js
│   │   │   ├── Error/Error.js
│   │   │   ├── Footer/Footer.js
│   │   │   ├── LeftNavbar/LeftNavbar.js
│   │   │   ├── LiveChat/
│   │   │   │   ├── Chat.js
│   │   │   │   ├── LiveChat.css
│   │   │   │   └── LiveChat.js
│   │   │   ├── MeetingSchedule/MeetingSchedule.js
│   │   │   ├── Navbar/Navbar.js
│   │   │   ├── Notification/Notification.js
│   │   │   ├── Participant/Participant.js
│   │   │   ├── RoomHome/RoomHome.js
│   │   │   ├── Schedule/Schedule.js
│   │   │   ├── Slider/
│   │   │   │   ├── Participants.js
│   │   │   │   ├── ParticipantSlide.css
│   │   │   │   └── ParticipantSlide.js
│   │   │   ├── Team/
│   │   │   │   ├── Teams.js
│   │   │   │   └── TeamsCard.js
│   │   │   ├── Users/Users.js
│   │   │   └── Video/
│   │   │       ├── CallControls.jsx
│   │   │       ├── GroupVideo.js
│   │   │       ├── SingleVideo.js
│   │   │       ├── VideoHeader.jsx
│   │   │       ├── VideoStyle.js
│   │   │       ├── VideoTile.jsx
│   │   │       └── GroupVideo copy.js
│   │   ├── config/                  # Shared configuration
│   │   │   ├── iceServers.js        # WebRTC ICE/TURN servers config
│   │   │   └── socket.js            # Socket.IO server URL
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useAdmin.js
│   │   │   ├── useRoom.js
│   │   │   ├── useSchedules.js
│   │   │   └── useToken.js
│   │   ├── features/                # Feature modules
│   │   │   ├── conference/          # Conference room feature
│   │   │   │   ├── ConferenceRoom.js  # Main conference layout
│   │   │   │   ├── components/
│   │   │   │   │   ├── ModalConference/
│   │   │   │   │   │   ├── CreateBroadcastRoom.js
│   │   │   │   │   │   ├── CreateChatRoom.js
│   │   │   │   │   │   ├── CreateGroupRoom.js
│   │   │   │   │   │   ├── CreateSingleRoom.js
│   │   │   │   │   │   └── JoinBroadcast.js
│   │   │   │   │   └── VideoConference/
│   │   │   │   │       ├── ChatLive.js
│   │   │   │   │       ├── GroupRoom.js
│   │   │   │   │       ├── LiveBroadCast.js
│   │   │   │   │       ├── SingleRoom.js
│   │   │   │   │       └── VideoConference.js
│   │   │   │   ├── home/
│   │   │   │   │   └── HomeConference.js
│   │   │   │   ├── notifications/
│   │   │   │   │   └── NotificationConference.js
│   │   │   │   ├── schedule/
│   │   │   │   │   ├── ScheduleConference.js
│   │   │   │   │   └── SingleSchedule.js
│   │   │   │   ├── settings/
│   │   │   │   │   ├── SettingConference.js
│   │   │   │   │   └── SettingRow.js
│   │   │   │   └── users/
│   │   │   │       └── UserConference.js
│   │   │   ├── dashboard/           # Admin dashboard feature
│   │   │   │   ├── Dashboard.js
│   │   │   │   ├── AddMember.js
│   │   │   │   ├── AllUser.js
│   │   │   │   ├── ManageMember.js
│   │   │   │   └── components/
│   │   │   │       ├── MemberRow.js
│   │   │   │       ├── MyReview.js
│   │   │   │       └── UserRow.js
│   │   │   └── auth/                # Authentication feature
│   │   │       └── pages/
│   │   │           ├── Loading.js
│   │   │           ├── RequireAdmin.js
│   │   │           ├── RequireAuth.js
│   │   │           ├── SignIn.js
│   │   │           └── SignUp.js
│   │   ├── pages/                   # Public-facing pages
│   │   │   ├── About/About.js
│   │   │   ├── Contact/Contact.js
│   │   │   ├── Home/Home.js
│   │   │   └── SupportPage/SupportPage.js
│   │   ├── firebase.init.js         # Firebase initialization
│   │   ├── App.js                   # Routes
│   │   ├── index.css                # Tailwind + custom styles
│   │   ├── index.js
│   │   └── logo.svg
│   ├── .env                         # Client environment variables
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── tailwind.config.js
│   └── .vscode/settings.json
├── index.js                         # Express + Socket.IO server
├── .env
├── .env.example
├── .gitignore
└── package.json
```

---

## Prerequisites

- **Node.js** >= 16.x
- **Yarn** (recommended) or npm
- **Firebase project** with Authentication enabled
- A web browser with WebRTC support (Chrome, Firefox, Edge, Safari)

---

## Environment Variables

### Server (`.env` in project root)

| Variable | Description                        | Default  |
|----------|------------------------------------|----------|
| `PORT`   | Port the server listens on         | `5000`   |

### Client (`.env` in `client/`)

| Variable                    | Description                                    | Default                    |
|-----------------------------|------------------------------------------------|----------------------------|
| `REACT_APP_SOCKET_URL`      | Socket.IO server URL                           | `http://localhost:5000`    |
| `REACT_APP_TURN_USERNAME`   | TURN server username                           | meterd.ca free tier        |
| `REACT_APP_TURN_CREDENTIAL` | TURN server credential                         | meterd.ca free tier        |
| `REACT_APP_apiKey`          | Firebase API key                               | —                          |
| `REACT_APP_authDomain`      | Firebase Auth domain                           | —                          |
| `REACT_APP_projectId`       | Firebase project ID                            | —                          |
| `REACT_APP_storageBucket`   | Firebase storage bucket                        | —                          |
| `REACT_APP_messagingSenderId` | Firebase messaging sender ID                 | —                          |
| `REACT_APP_appId`           | Firebase app ID                                | —                          |
| `REACT_APP_measurementId`   | Firebase Analytics measurement ID             | —                          |

> **Note:** TURN credentials are from the free Metered.ca / openrelay TURN servers.
> For production, replace with your own TURN provider (e.g., Twilio) to ensure reliable NAT traversal.

### Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. In your project, go to **Authentication** → **Sign-in method**.
3. Enable **Email/Password** provider.
4. Go to **Project settings** → **General** → **Your apps** → **Web app** (`</>`).
5. Register the app and copy the `firebaseConfig` values.
6. Create a `.env` file inside `client/` (copy from `.env.example`) and paste the values:

   ```env
   REACT_APP_apiKey=AIzaSy...
   REACT_APP_authDomain=your-project.firebaseapp.com
   REACT_APP_projectId=your-project
   REACT_APP_storageBucket=your-project.appspot.com
   REACT_APP_messagingSenderId=123456789
   REACT_APP_appId=1:123456789:web:abcdef
   REACT_APP_measurementId=G-ABC123
   ```

7. Add your production domain to **Authentication** → **Settings** → **Authorized domains**.

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd MeetRoom
```

### 2. Install dependencies

```bash
# Server (from project root)
npm install

# Client
cd client
npm install
cd ..
```

### 3. Configure environment

```bash
cp .env.example .env                    # Server config
cp client/.env.example client/.env      # Client config
```

### 4. Start the development servers

**Server (Terminal 1):**

```bash
npm run server    # nodemon — auto-restart on changes
# or
npm start         # plain node
```

**Client (Terminal 2):**

```bash
cd client
npm start
```

- Client: [http://localhost:3000](http://localhost:3000)
- Server: [http://localhost:5000](http://localhost:5000)

### 5. Build for production

```bash
cd client
npm run build
```

---

## Usage

### One-to-One Video Call
1. Sign in with Firebase authentication
2. Navigate to `/conference`
3. Click **One to One** to start a 1-to-1 call
4. Share the meeting link with another user
5. Use the bottom control bar to toggle mic, camera, screen share, or recording
6. Toggle the chat sidebar via the chat icon

### Group Video Call
1. Navigate to `/conference`
2. Click **Group Call** to start a group room
3. Share the meeting link with multiple participants
4. Use the right sidebar for group chat with emoji support
5. Open the **Participants** panel to see all members
6. The host is identified automatically (first to join)

### Live Broadcast
1. Navigate to `/conference`
2. Click **Broadcast** → **Go Live**
3. Copy the viewer link and share it with your audience
4. Use fullscreen mode and screen sharing during the broadcast
5. Viewer count updates in real-time

### Online Chat
1. Navigate to `/conference/live-chat`
2. Enter your name and a room ID
3. Join the chat room and start messaging with emoji support
4. Press **Enter** to send messages instantly

### Recording
- Click the **Record** button (circle icon) in any call to start recording
- Click again (square icon) to stop — the `.webm` file will auto-download
- Recordings capture the composite video layout (local + remote streams)

### Screen Sharing
- Click the **Monitor** icon during any call to share your screen
- Click **Stop sharing** from the browser prompt or toggle camera to return
- Screen sharing is guarded against double-clicks and infinite loops

---

## Architecture Overview

### Signaling Flow

All calls use the Express + Socket.IO server on port 5000.

#### 1-to-1 Call Sequence
1. Caller joins room → server stores both users in `singleRooms`
2. Caller creates an `RTCPeerConnection` and emits an SDP offer via Socket.IO
3. Server relays the offer to the callee via `offer` event
4. Callee sets remote description, creates an answer, sends it back
5. ICE candidates exchanged via `ice-candidate` events
6. A WebRTC data channel (`sendChannel`) is established for in-call text chat
7. On peer disconnect, server emits `user left` so the other side can clean up

#### Group Call Sequence
1. Each user joins the group room → server stores participants and joins the Socket.IO room
2. The first user to join is identified as the host via `host status` event
3. New users receive the list of existing users via `all users` event
4. Each new user creates an `RTCPeerConnection` (initiator: true) to every existing user
5. Offer/answer signals exchanged peer-by-peer via `sending signal` / `receiving returned signal`
6. Group chat messages relayed through the server via `group-message` event
7. When a user leaves, the server emits `user left group` to remaining members

#### Broadcast Sequence
1. Broadcaster joins a broadcast room via `join broadcast`
2. Server tracks the broadcaster and maintains a viewer list
3. Broadcaster creates `RTCPeerConnection` for each new viewer and sends an offer
4. Viewers respond with an answer via `viewer signal`
5. ICE candidates exchanged between broadcaster and viewers
6. On broadcaster disconnect, all viewers receive `broadcast ended`

#### Online Chat
1. Users join a chat room by ID (Socket.IO room via `join-room`)
2. Messages broadcast to all room members via `send_message` / `receive_message`
3. Users can leave via `leave-room` event

### WebRTC Configuration
- **STUN:** Google STUN servers + Metered STUN
- **TURN:** Metered.ca / openrelay relay (for NAT/firewall traversal)
- Config centralized in `client/src/config/iceServers.js`

### Screen Sharing Architecture
- Uses `getDisplayMedia()` to capture the screen
- Replaces the video track on the existing `RTCPeerConnection` sender
- On `onended` event, automatically swaps back to the camera track
- Guarded by a ref (`isScreenSharing`) to prevent concurrent share sessions

### Recording Architecture
- Creates an HTML5 Canvas (1280×720) to composite streams
- Mixes local and remote audio via `AudioContext` + `MediaStreamDestination`
- Uses `canvas.captureStream()` + `MediaRecorder` to produce a `.webm` file
- Auto-downloads when the user clicks stop

### Authentication
- Firebase Authentication (email/password)
- `RequireAuth` protects `/conference` routes for authenticated users
- `RequireAdmin` protects admin dashboard routes

---

### Production Checklist

1. Set `PORT` on the server (platform-provided)
2. Set `REACT_APP_SOCKET_URL` to your production server URL in the client build
3. Replace TURN credentials with a production TURN provider or Twilio
4. Build the client: `npm run build` in `client/`, then deploy
5. Ensure Firebase Auth authorized domains include your production domain

---

## License

MIT — feel free to use, modify, and distribute.

---

**Built with ❤️ using React, WebRTC, and Socket.IO.**