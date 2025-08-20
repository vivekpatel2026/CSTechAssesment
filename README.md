# Agent Task Management System (MERN Stack)

A full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) for managing a team of agents and distributing tasks via CSV/XLSX file uploads.



## Table of Contents

- [About The Project](#about-the-project)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)

---

## About The Project

This application provides a centralized dashboard for an administrator to perform key business operations. The primary goal is to streamline the process of managing agents and assigning them tasks. The system allows an admin to register, log in, add or remove agents, and upload task lists which are then automatically and evenly distributed among the team.

---

## Core Features

* **Admin Authentication**: Secure sign-up and login functionality for administrators using JSON Web Tokens (JWT).
* **Agent Management**: Full CRUD (Create, Read, Delete) functionality for managing agents.
* **Task Distribution**: Upload a `.csv` or `.xlsx` file containing a list of tasks (e.g., leads, contacts). The application automatically parses the file and distributes the items equally among the available agents.
* **Dynamic Dashboard**: A responsive user interface built with React and Vite that displays all agents and their assigned tasks in real-time.
* **Robust Validation**: Server-side and client-side validation for all user inputs to ensure data integrity.

---

## Tech Stack

This project is built using the following technologies:

* **Backend**:
    * [Node.js](https://nodejs.org/)
    * [Express.js](https://expressjs.com/)
    * [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
    * [JSON Web Token (JWT)](https://jwt.io/) for authentication
    * [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) for password hashing
    * [Multer](https://github.com/expressjs/multer) for file uploads
    * [Express-validator](https://express-validator.github.io/) for validation
* **Frontend**:
    * [React](https://reactjs.org/) (with Vite)
    * [React Router](https://reactrouter.com/) for routing
    * [Axios](https://axios-http.com/) for API requests
    * CSS for styling

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed on your system:
* **Node.js** (v14 or higher)
* **npm** (Node Package Manager)
* **MongoDB** (running locally or a connection string from a service like MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/mern-agent-app.git](https://github.com/your-username/mern-agent-app.git)
    cd mern-agent-app
    ```

2.  **Backend Setup:**
    * Navigate to the backend directory:
        ```bash
        cd backend
        ```
    * Install dependencies:
        ```bash
        npm install
        ```
    * Create a `.env` file in the `backend` directory and add your configuration (see [Environment Variables](#environment-variables)).
    * Start the backend server:
        ```bash
        npm start
        ```
    * The server will be running on `http://localhost:5001`.

3.  **Frontend Setup:**
    * Open a new terminal and navigate to the frontend directory:
        ```bash
        cd frontend
        ```
    * Install dependencies:
        ```bash
        npm install
        ```
    * Start the frontend development server:
        ```bash
        npm run dev
        ```
    * The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

4.  **Create Initial Admin:**
    * The application requires an initial admin user. Use a tool like Postman to send a `POST` request to `http://localhost:5001/api/auth/register` with the following body:
        ```json
        {
            "email": "admin@example.com",
            "password": "Password123!"
        }
        ```
    * You can now log in with these credentials on the frontend.

---

## API Endpoints

Here are the main API routes available:

| Method   | Endpoint                | Description                     | Access   |
|----------|-------------------------|---------------------------------|----------|
| `POST`   | `/api/auth/register`    | Register a new admin user       | Public   |
| `POST`   | `/api/auth/login`       | Log in an admin user            | Public   |
| `POST`   | `/api/agents`           | Add a new agent                 | Private  |
| `GET`    | `/api/agents`           | Get a list of all agents        | Private  |
| `DELETE` | `/api/agents/:id`       | Delete an agent                 | Private  |
| `POST`   | `/api/lists/upload`     | Upload a file and distribute    | Private  |
| `GET`    | `/api/lists`            | Get all distributed task lists  | Private  |

---

## Environment Variables

To run this project, you will need to create a `.env` file in the `backend` directory with the following variables:

```env
# MongoDB Connection String
MONGO_URI=mongodb+srv://CSTechAssesment:ouWPmLNM240XR0Lg@cluster1.19ovg9b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1

# JWT Secret Key
JWT_SECRET=your_super_secret_jwt_key

# Port for the backend server
PORT=5001
