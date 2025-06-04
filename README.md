
# TaskTrackr Back-end

TaskTrackr's the API server for the TaskTrackr application, providing endpoints for task and list management, user authentication, and admin user management. Built with Node.js, Express, and MongoDB, it handles secure JWT-based authentication and supports a robust task management system.

## Features
- **Task Management**: Create, read, update, and delete tasks associated with user-defined lists.
- **List Management**: CRUD operations for lists with customizable names and colors.
- **User Authentication**: Secure login and registration with JWT tokens.
- **Admin Endpoints**: Admins can retrieve and delete user accounts.
- **MongoDB Integration**: Persistent storage for users, lists, and tasks.
- **Secure API**: Token-based authentication for protected routes.

## Technologies Used
- **Node.js**: JavaScript runtime for server-side logic.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing users, lists, and tasks.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/tasktrackr-backend.git
   cd tasktrackr-backend
   ```
2. Install dependencies:
    ```
    npm install
    ```
3. Create a .env file
    ```.env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/dbname
    JWT_SECRET=your-secret-key
    ```
4. Start MongoDB (If local):
    ```bash
    mongod
    ```
5. Start the server:
    ```bash
    npm start
    ```
    The API will be available at http://localhost:5000

To check and test all the API Endpoints, check out http://localhost:5000/api-docs

## Link to the front-end repository:
https://github.com/MyCallAngel0/tasktrackr
