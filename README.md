# 📝 editorX.pro

A full-stack real-time collaborative text editor built for teams and individuals to co-author documents simultaneously with live presence indicators, secure user management, and invitation workflows.

Built with ❤️ using React.js, Node.js, Express.js, Yjs, and Firebase.

## 🚀 Features
- ✅ Google & Email/Password Authentication
- ✅ Secure Firebase Token Verification (Frontend + Backend)
- ✅ Real-time Collaborative Text Editing with Cursor Presence
- ✅ Invite Collaborators by Email
- ✅ Join/Accept Invitation Flow
- ✅ Conflict-free Document Syncing via Yjs
- ✅ Persistent Sessions and Token Handling
- ✅ Scalable Backend APIs with Express.js
- ✅ Responsive and Clean UI
- ✅ Secure real-time chat with end-to-end encryption

## 🧠 Tech Stack

| Layer        | Technology                                                 |
| ------------ | ---------------------------------------------------------- |
| **Frontend** | React.js, Firebase Auth SDK                                |
| **Backend**  | Node.js, Express.js, Firebase Admin SDK                    |
| **Authentication** | Firebase Authentication (Google + Email/Password)    |
| **Realtime Sync** | Yjs + y-websocket for CRDT-based collaboration        |
| **Editor**   | Tiptap Editor (Built on ProseMirror) + Yjs                 |
| **Deployment** |  Netlify (Frontend), Render (Backend + WebSocket)          |

## 📽️ Demo
- 🌐 Live Demo: https://editorx.pro
- 🎥 Demo Video: Coming Soon

## ⚙️ Setup Instructions

### Frontend Setup

#### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

#### Installation

1. *Clone the repository*
   ```bash
   git clone https://github.com/AnujKV123/editorx.pro.git
   cd editorx.pro
   ```

2. *Install dependencies*
   ```bash
   npm install
   # or
   yarn install
   ```

3. *Create a .env file with below details:*
   ```bash
    REACT_APP_API_KEY=
    REACT_APP_AUTH_DOMAIN=
    REACT_APP_PROJECT_ID=
    REACT_APP_STORAGE_BUCKET=
    REACT_APP_MESSAGE_SENDER_ID=
    REACT_APP_APP_ID=
    REACT_APP_MEASUREMENT_ID=
    REACT_APP_SOCKET_URL=ws://localhost:1234
    REACT_APP_BACKEND_URL=http://localhost:5000
    REACT_APP_MESSAGE_SECRET_KEY=
   ```

4. *Start the development server*
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. *Open your browser*
   Navigate to `http://localhost:4200` to view the application.

#### Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be available in the `dist` directory.


### Backend Setup

#### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

#### Installation

1. *Clone the repository*
   ```bash
   git clone https://github.com/AnujKV123/real-time-text-editor-backed.git
   cd real-time-text-editor-backed
   ```

2. *Install dependencies*
   ```bash
   npm install
   # or
   yarn install
   ```

3. *Create a .env file with below details:*
   ```bash
    PORT=5000
    MONGODB_URI=
    CORS_ORIGIN=
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
    FIREBASE_TYPE=
    FIREBASE_PROJECT_ID=
    FIREBASE_PRIVATE_KEY_ID=
    FIREBASE_PRIVATE_KEY=
    FIREBASE_CLIENT_EMAIL=
    FIREBASE_CLIENT_ID=
    FIREBASE_AUTH_URI=
    FIREBASE_TOKEN_URI=
    FIREBASE_AUTH_PROVIDER_CERT_URL=
    FIREBASE_CLIENT_CERT_URL=
    FIREBASE_UNIVERSE_DOMAIN=
   ```

4. *Start the development server*
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Navigate to `http://localhost:5000` to use as Backend API.

#### Build for Production

```bash
npm run build
# or
yarn build
```

### y-websocket setup

#### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

#### Installation

1. *Clone the repository*
   ```bash
   git clone https://github.com/AnujKV123/edirorx.pro-socket-server.git
   cd edirorx.pro-socket-server
   ```

2. *Install dependencies*
   ```bash
   npm install
   # or
   yarn install
   ```

3. *Create a .env file with below details:*
   ```bash
    PORT=1235
    BACKEND_URL=http://localhost:5000
   ```

4. *Start the development server*
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Navigate to `WebSocket → ws://localhost:1235` to use as y-websocket API.

#### Build for Production

```bash
npm run build
# or
yarn build
```

## 📌 Future Enhancements

- Collaborative Code Editor with Live Sharing

- Document Versioning and History

- Commenting and Chat Feature

- Export/Import in DOCX and PDF formats

- Notification System for Invitations

## 👨‍💻 Built By
Anuj Verma – [GitHub](https://github.com/AnujKV123) | [LinkedIn](https://www.linkedin.com/in/anujverma11)

## 🪪 License
- This project is licensed under the MIT License.