# 🎌 AnimeVerse - Anime Streaming Platform

![AnimeVerse Banner](https://via.placeholder.com/1200x300?text=AnimeVerse+Streaming+Platform+Project)

> **A modern, full-stack anime discovery and streaming application built with the MERN stack.**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

---

## 📖 About The Project

**AnimeVerse** is a comprehensive web application that allows users to explore anime, view detailed information, and simulate a streaming experience. 

This project demonstrates a robust full-stack architecture, featuring a secure backend for user management and a dynamic, responsive frontend for content browsing.

### ⚠️ Important Disclaimer
> **Note on Video Playback:** Due to copyright restrictions and the unavailability of free, legal video streaming APIs, **this project uses dummy video URLs** for the streaming functionality. The primary focus of this application is on the **UI/UX, system architecture, data fetching (Jikan API), and full-stack integration**, rather than hosting pirated content.

---

## ✨ Key Features

* **🎬 Comprehensive Anime Data:** Real-time data fetching using the **Jikan API** (unofficial MyAnimeList API) for synopses, ratings, genres, and more.
* **🔐 Secure Authentication:** Full Sign Up/Login system using **JWT (JSON Web Tokens)** and **Bcrypt** for password hashing.
* **🎨 Modern UI/UX:** Built with **Tailwind CSS** for styling and **Framer Motion** for smooth animations.
* **📱 Responsive Design:** Fully optimized for desktop, tablet, and mobile devices.
* **📺 Custom Video Player:** Integrated `react-player` for a seamless viewing interface (using demo content).
* **⚡ State Management:** Efficient global state management using **Zustand**.
* **🖼️ Sliders & Carousels:** Interactive content sliders powered by **Swiper**.

---

## 🛠️ Tech Stack

### Client (Frontend)
* **Core:** React + Vite
* **Styling:** Tailwind CSS, PostCSS, Autoprefixer
* **Animations:** Framer Motion
* **Icons:** Lucide React
* **State Management:** Zustand
* **Routing:** React Router DOM
* **Components:** React Player, Swiper, React Hot Toast (Notifications)
* **HTTP Client:** Axios

### Server (Backend)
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB + Mongoose
* **Authentication:** JSON Web Token (JWT), Bcryptjs, Cookie-Parser
* **Validation:** Express Validator
* **Utilities:** Dotenv, CORS, Nodemon

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
* Node.js (v16 or higher)
* MongoDB (Local or Atlas URL)

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/himangshukamila/AnimeVerse.git](https://github.com/himangshukamila/AnimeVerse.git)
    cd AnimeVerse
    ```

2.  **Setup Backend**
    ```bash
    cd server
    npm install
    ```
    *Create a `.env` file in the `server` folder and add:*
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    ```

3.  **Setup Frontend**
    ```bash
    cd ../client
    npm install
    ```

### Running the App

**1. Start the Server (Backend)**
```bash
cd server
npm run dev
