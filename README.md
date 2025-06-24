# 🎵 GalaxyTracks - A Music Streaming Web Application

**GalaxyTracks** is a modern and stylish music streaming web app with features like playlist creation, full music player controls, user profile management, search with lazy loading, and smooth UI animations. It’s built to deliver an immersive audio experience with functionality similar to modern streaming platforms.

---

## ✨ Features

- 🎧 Sticky music player available across all pages
- 📂 Playlist Management (CRUD)
- 🔍 Search songs with lazy loading and bounce animation
- 👤 User Profile Management (update preferences, image, etc.)
- 🔄 JWT-based user authentication (register/login/logout)
- 🖼️ Fully responsive, dark-themed UI with glowing effects
- ⚙️ Context-based global state or Redux (if applicable)
- 🧠 Smooth routing using React Router
- 🔥 Built using full MERN Stack

---

## 🧑‍💻 Tech Stack

### 🖥️ Frontend:
- React.js
- Tailwind CSS
- React Router DOM
- Context API 
- Axios

### 🌐 Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (Authentication)
- Bcrypt.js

---
## Screenshots 
![image](https://github.com/user-attachments/assets/f8670091-4f4c-4102-87bc-52352504e50f)

![image](https://github.com/user-attachments/assets/c120e4f2-cb8d-46fc-bb22-79628cb5725f)

![image](https://github.com/user-attachments/assets/38c26b5a-47e2-448f-bba6-42da9d988b80)

![image](https://github.com/user-attachments/assets/424ae5fb-d283-4237-ab63-266fda904fc9)




---
## 🚀 Getting Started

```bash
git clone https://github.com/PKR9759/GalaxyTracks-A-Music-Streaming-Application.git

# Install server dependencies
cd backend
npm install

# Install client dependencies
cd ../frontend
npm install


# Environment Variables:
#Create a .env file in backend/ with:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=8000
