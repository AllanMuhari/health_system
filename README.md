﻿# health_system

This is a full-stack Health System application with a `frontend` built in **React.js** and a `backend` built in **Node.js/Express**.  
It allows users, patients, and administrators to interact with health services via a web interface.

---

## 🛠 Project Structure

```
health_system/
│
├── frontend/     # React frontend
└── backend/      # Node.js/Express backend
```

---

## 🚀 How to Run the Project Locally

### 1. Clone the Repository
```bash
git clone https://github.com/AllanMuhari/health_system.git
cd health_system
```

---

### 2. Running the Backend

- Navigate into the `backend` folder:
  ```bash
  cd backend
  ```

- Install backend dependencies:
  ```bash
  npm install
  ```

- Set up environment variables:

  Create a `.env` file inside the `backend` folder and add your required environment variables, like:
  ```
  PORT=5000
  DATABASE_URL=your_database_url
  JWT_SECRET=your_secret_key
  ```

- Start the backend server:
  ```bash
  npm run dev
  ```
  The backend will run on [http://localhost:5000](http://localhost:5000)

---

### 3. Running the Frontend

- Open a new terminal window and navigate into the `frontend` folder:
  ```bash
  cd ../frontend
  ```

- Install frontend dependencies:
  ```bash
  npm install
  ```

- Start the React development server:
  ```bash
  npm run dev
  ```
  The frontend will run on [http://localhost:5173](http://localhost:5173) (Vite default)

---

## 🌐 API Endpoints (Backend)

Here’s a list of important API endpoints:

| Method | Endpoint                | Description                         |
| :----: | :----------------------: | :---------------------------------: |
| POST   | `/api/auth/register`      | Register a new user                |
| POST   | `/api/auth/login`         | Login and get authentication token |
| GET    | `/api/programs`           | Get all health programs            |
| POST   | `/api/programs`           | Create a new program (Admin only)   |
| GET    | `/api/users`              | Get all users (Admin only)          |
| DELETE | `/api/programs/:id`       | Delete a program by ID (Admin only) |
| GET    | `/api/profile`            | Get authenticated user's profile   |
| PUT    | `/api/profile`            | Update authenticated user's profile|

> Replace `:id` with the actual program ID when using endpoints with params.

---

## 📦 Technologies Used

- Frontend:
  - React.js
  - Vite
  - Tailwind CSS (is used)
  - Axios (for API calls)

- Backend:
  - Node.js
  - Express.js
  - prisma orm 
  - JWT Authentication

---

## 📄 Notes

- Make sure  your DB service is running when you start the backend.
- Ensure your frontend `.env` points to the correct backend API URL if needed.
- CORS is enabled on the backend to allow API communication with the frontend.

---

