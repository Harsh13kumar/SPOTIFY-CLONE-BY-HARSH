# SPOTIFY-CLONE-BY-HARSH 🎵

SPOTIFY-CLONE-BY-HARSH is a full-stack web application that replicates the core features of Spotify, allowing users to stream music, manage playlists, and discover new tracks. Built with modern web technologies, it delivers a seamless and interactive music experience.

## ✨ Features

- 🔑 User authentication and registration
- 🎧 Music streaming and playback controls
- 📁 Playlist creation and management
- 🔍 Search for songs, artists, and albums
- 🖼️ Album and artist detail pages
- ❤️ Like/favorite tracks and playlists
- 🖥️ Responsive UI for desktop and mobile

## 🛠️ Tech Stack

- **Frontend:** React.js, Redux, CSS/Styled Components
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT, bcrypt
- **Audio:** HTML5 Audio API

## 🏗️ Architecture Overview

The project is divided into frontend and backend components. The backend provides RESTful APIs for user management, music data, and playlists, while the frontend consumes these APIs and manages state with Redux. Audio playback is handled using the HTML5 Audio API for smooth streaming.

**Main Components:**
- `client/`: React frontend for user interaction and playback
- `server/`: Node.js/Express backend for API and authentication
- `models/`: Mongoose schemas for users, tracks, playlists, etc.
- `routes/`: Express routers for authentication, music, playlists
- `controllers/`: Business logic for each route

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas/database))

### ⚙️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Harsh13kumar/SPOTIFY-CLONE-BY-HARSH.git
   cd SPOTIFY-CLONE-BY-HARSH
   ```

2. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables:**
   - Copy `.env.example` to `.env` in the `server/` directory and update:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

5. **Start the backend server:**
   ```bash
   cd ../server
   npm start
   ```

6. **Start the frontend app:**
   ```bash
   cd ../client
   npm start
   ```

   The frontend will run on `http://localhost:3000` and the backend on `http://localhost:5000` by default.

### 🧩 Folder Structure

```
SPOTIFY-CLONE-BY-HARSH/
├── client/
│   ├── src/
│   └── package.json
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── server.js
│   └── package.json
└── README.md
```

## 🧑‍💻 Usage

- 🧪 Use Postman to test backend API endpoints.
- 🎼 Use the web UI to browse, search, and play music.
- 🛡️ All protected routes require a valid JWT token in the `Authorization` header.

### Example: Register a User

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "musicfan",
  "email": "fan@example.com",
  "password": "yourpassword"
}
```

### Example: Create a Playlist

```http
POST /api/playlists
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "name": "My Favorites",
  "tracks": ["TRACK_ID_1", "TRACK_ID_2"]
}
```

## 📚 API Overview

| Endpoint                  | Method | Description                    |
|---------------------------|--------|--------------------------------|
| `/api/auth/register`      | POST   | Register a new user            |
| `/api/auth/login`         | POST   | User login                     |
| `/api/tracks`             | GET    | List all tracks                |
| `/api/tracks/:id`         | GET    | Get track details              |
| `/api/playlists`          | GET    | List user playlists            |
| `/api/playlists`          | POST   | Create a new playlist          |
| `/api/playlists/:id`      | PUT    | Update a playlist              |
| `/api/playlists/:id`      | DELETE | Delete a playlist              |

*See the codebase for detailed request/response formats.*

## 🛡️ Security

- Passwords are hashed using bcrypt before storage.
- JWT tokens are used for authentication and must be included in protected requests.
- Input validation and error handling are implemented for all endpoints.

## 🧩 Related Projects

- [Spotify Web](https://open.spotify.com/) – The original inspiration.

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## 📄 License

This project is licensed under the MIT License.
