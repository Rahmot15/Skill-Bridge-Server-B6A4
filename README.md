# 🎓 SkillBridge — Tutor Booking Platform

**Live URL:** https://skill-bridge-server-woad.vercel.app
**Backend Repository:** https://github.com/Rahmot15/Skill-Bridge-Server-B6A4.git

---

## 📌 Project Overview

SkillBridge is a full-stack tutor booking platform that connects students with expert tutors. Users can browse tutors, book sessions, and leave reviews. Tutors can manage their profiles and availability, while admins oversee platform activities.

---

## 🚀 Key Features

### 👨‍🎓 Student
- Register & login
- Browse tutors
- Book tutoring sessions
- View personal bookings
- Leave reviews

### 👨‍🏫 Tutor
- Create & update tutor profile
- Set availability
- Manage bookings
- View reviews & ratings

### 🛠 Admin
- View all users
- Update user status
- Monitor bookings
- Manage categories

### 🌐 Public
- Browse tutors
- View tutor profiles
- Explore categories
- Read tutor reviews

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Better Auth

### Deployment
- Vercel

---

## 🗄 Database Models

- User
- TutorProfile
- Category
- Booking
- Review

---

## 🔐 Authentication

Authentication is implemented using **Better Auth**.

### Auth Endpoints

| Method | Endpoint |
|--------|----------|
POST | `/api/auth/sign-up/email` |
POST | `/api/auth/sign-in/email` |
GET | `/api/auth/get-session` |

---

## 📡 API Endpoints

### Tutors

| Method | Endpoint |
|--------|----------|
GET | `/api/tutors` |
GET | `/api/tutors/:id` |

---

### Categories

| Method | Endpoint |
|--------|----------|
GET | `/api/categories` |
POST | `/api/categories` (Admin Only) |

---

### Bookings

| Method | Endpoint |
|--------|----------|
POST | `/api/bookings` |
GET | `/api/bookings` |
GET | `/api/bookings/:id` |
GET | `/api/bookings/tutor` |
PATCH | `/api/bookings/:id` |

---

### Reviews

| Method | Endpoint |
|--------|----------|
POST | `/api/reviews` |
GET | `/api/reviews/tutor/:tutorId` |

---

### Admin

| Method | Endpoint |
|--------|----------|
GET | `/api/admin/users` |
PATCH | `/api/admin/users/:id` |
GET | `/api/admin/bookings` |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add:

```

DATABASE_URL="your_database_url"
PORT=5000

BETTER_AUTH_SECRET="your_secret_key"
BETTER_AUTH_URL="[http://localhost:5000](http://localhost:5000)"
APP_URL="[http://localhost:3000](http://localhost:3000)"

APP_USER="your_email"
APP_PASS="your_app_password"

GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_secret"

GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_secret"

ADMIN_NAME="Admin"
ADMIN_EMAIL="[admin@skillbridge.com](mailto:admin@skillbridge.com)"
ADMIN_PASSWORD="admin1234"

````

---

## 🛠 Seed Admin

An admin account can be seeded into the database using the seed script.

### Run the seed script:

```bash
npm run seed:admin
````

This will create a default admin user if it does not already exist.

---

## ▶️ Run Locally

```bash
npm install
npx prisma migrate dev
npm run dev
```

---

## ☁️ Deployment

The backend is deployed on **Vercel** with PostgreSQL database integration.

---

## 👨‍💻 Author

**MD Rahmatullah**

---

## 📜 License

This project is for learning and demonstration purposes.

```

---
