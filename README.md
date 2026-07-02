# 🚗 AutoVibe — Automotive Marketplace Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-auto--vibe--smoky.vercel.app-blue?style=for-the-badge)](https://auto-vibe-smoky.vercel.app/)
[![Frontend](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)](https://render.com)

> Discover the Joy of Driving — Buy your dream car or rent a ride for every adventure.

---

## 🌐 Live Demo

**[https://auto-vibe-smoky.vercel.app/](https://auto-vibe-smoky.vercel.app/)**

---

## 📸 Features

### 🏠 Public Pages
- **Home** — Hero section with featured listings and CTA buttons
- **Like Products** — Browse and favorite vehicle listings
- **About Website** — Platform information
- **Calendar** — Availability and scheduling

### 🔐 Admin Dashboard
- **Overview** — Platform metrics (users, products, revenue, active packages)
- **Revenue Trends** — Interactive chart with 6-month / 1-year views
- **User Management** — View, verify, and manage registered users
- **Products** — Manage vehicle listings
- **Payments** — Track transactions
- **Package Monitor** — Real-time subscription tracking with expiry alerts and AI Insight

### 💳 Pricing Plans
| Plan | Price | Features |
|---|---|---|
| Basic | $49/mo | 24-hour limit, Standard support |
| Professional | $199/mo | Custom date limits, Priority support, Advanced Analytics |
| Premium | $499/mo | Unlimited time limits, Dedicated manager, Full API access |

---

## 🛠️ Tech Stack

### Frontend
- **React** (Vite)
- **React Router** — client-side routing
- **Axios** — API communication
- **Recharts** — revenue trend charts
- **Tailwind CSS** — styling

### Backend
- **Node.js** + **Express.js** — REST API
- **MongoDB** + **Mongoose** — database
- **JWT** — authentication & authorization
- **bcryptjs** — password hashing

### Deployment
- **Frontend** → [Vercel](https://vercel.com)
- **Backend** → [Render](https://render.com)

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=6500
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

Start the backend:

```bash
npm start
```

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:

```env
VITE_API_URL=http://localhost:6500/api
```

Start the frontend:

```bash
npm run dev
```

---

## 📁 Project Structure

```
autovibe/
├── frontend/          # React + Vite app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/       # axios instance
│   │   └── main.jsx
│   └── package.json
│
├── backend/           # Node.js + Express API
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── controllers/
│   └── server.js
│
└── README.md
```

---

## 🔒 Environment Variables

### Backend `.env`
| Variable | Description |
|---|---|
| `PORT` | Server port (default: 6500) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `NODE_ENV` | `development` or `production` |

### Frontend `.env`
| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |

---

## 🌍 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add `VITE_API_URL` in Vercel → Settings → Environment Variables
4. Deploy

### Backend (Render)
1. Create a new **Web Service** on [render.com](https://render.com)
2. Connect your GitHub repo
3. Set Build Command: `npm install`
4. Set Start Command: `npm start`
5. Add all environment variables in Render dashboard
6. Deploy

---

## 👤 Author

**Haroon**
- GitHub: [@haroon239](https://github.com/haroon239)

---

## 📄 License

This project is for educational and portfolio purposes.
