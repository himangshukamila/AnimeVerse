<div align="center">

  # 🎌 AnimeVerse

  **The Ultimate Anime Streaming Experience**

  ![AnimeVerse Banner](https://via.placeholder.com/1200x350?text=AnimeVerse+Project+Banner)

  <br />

  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
  ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
  ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
  ![Jikan API](https://img.shields.io/badge/API-Jikan-blue?style=for-the-badge)

  <br />
  
  [**Explore Docs**](#-getting-started) • [**View Demo**](https://your-deployed-link.onrender.com) • [**Report Bug**](https://github.com/himangshukamila/AnimeVerse/issues)

</div>

---

## 📖 About The Project

**AnimeVerse** is a modern, full-stack web application designed to simulate a premium anime streaming platform. Users can browse a vast library of anime, view detailed statistics (ratings, genres, characters), and manage their own profiles.

> **⚠️ Legal Disclaimer:**
> This project is for **educational purposes only**. Due to copyright laws and the lack of free streaming APIs, **video playback utilizes dummy URLs**. The focus of this project is to demonstrate advanced Full-Stack development skills, API integration, and UI/UX design.

### 🌟 Why This Project?
* **Real-time Data:** Fetches live anime data from the **Jikan API** (MyAnimeList).
* **Smooth Performance:** Powered by **Vite** and **React** for lightning-fast navigation.
* **Beautiful UI:** Custom **Tailwind CSS** styling with **Framer Motion** animations.

---

## ✨ Key Features

* 🎭 **Immersive Anime Discovery** - Search, filter, and explore anime by genre, popularity, or season.
* 🔐 **Secure Authentication** - Full Sign-Up/Login utilizing **JWT** and **Bcrypt** encryption.
* 👤 **User Profiles** - Users can save their favorite anime and track watch history.
* 📺 **Simulated Player** - A custom video player interface built with `react-player`.
* 📱 **Responsive Design** - Looks perfect on Mobile, Tablet, and Desktop.
* 🎢 **Interactive Sliders** - Smooth carousels powered by **SwiperJS**.
* 🔔 **Smart Notifications** - Instant feedback using `react-hot-toast`.

---

## 🛠️ Tech Stack

This project uses the **MERN** stack along with several powerful libraries:

| Area | Technology | Usage |
| :--- | :--- | :--- |
| **Frontend** | ![React](https://img.shields.io/badge/-React-black?logo=react) ![Vite](https://img.shields.io/badge/-Vite-black?logo=vite) | Component-based UI & Build tool |
| **Styling** | ![Tailwind](https://img.shields.io/badge/-Tailwind-black?logo=tailwindcss) | Rapid, responsive styling |
| **Icons** | **Lucide React** | Modern, clean icons |
| **Animation** | **Framer Motion** | Page transitions & micro-interactions |
| **State** | **Zustand** | Lightweight global state management |
| **Backend** | ![Node](https://img.shields.io/badge/-Node.js-black?logo=node.js) ![Express](https://img.shields.io/badge/-Express-black?logo=express) | REST API & Server logic |
| **Database** | ![MongoDB](https://img.shields.io/badge/-MongoDB-black?logo=mongodb) | NoSQL database for data persistence |
| **Security** | **Bcrypt & JWT** | Password hashing & Token authentication |

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
* **Node.js** (v18+ recommended)
* **MongoDB Atlas** account (or local MongoDB)

### 📥 Installation

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/himangshukamila/AnimeVerse.git](https://github.com/himangshukamila/AnimeVerse.git)
    cd AnimeVerse
    ```

2.  **Install Backend Dependencies**
    ```bash
    cd server
    npm install
    ```

3.  **Install Frontend Dependencies**
    ```bash
    cd ../client
    npm install
    ```

### ⚙️ Environment Variables

Create a `.env` file in the **server** folder and add the following:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
