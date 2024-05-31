### README

## Movie List Application

This is a full-stack movie list application where users can sign up, log in, and manage their movie watch list and watched movies. The backend is built with Node.js, Express, and MongoDB, while the frontend is built with React.

---

### Frontend

#### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

#### Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/udaygarg8188/MovieLib
   cd MovieLib/frontend
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
Open your browser and navigate to:

plaintext
Copy code
http://localhost:3000
Screenshots:

Screenshot 1:
![Screenshot 1](./images/Screenshot%202024-05-31%20150347.png)

Screenshot 2:
![Screenshot 1](./images/Screenshot%202024-05-31%20150619.png)

### Backend
Prerequisites
Node.js (v14 or higher)
npm (v6 or higher)
MongoDB (local or Atlas)
Getting Started
Clone the repository:

bash
Copy code
git clone https://github.com/udaygarg8188/MovieLib
cd MovieLib/backend
Install dependencies:

bash
Copy code
npm install
Setup environment variables:

Create a .env file in the backend directory and add the following:

env
Copy code
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/movie-list
JWT_SECRET=your_jwt_secret
PORT=4000
Start the server:

bash
Copy code
npm start
API Endpoints:

Signup:

plaintext
Copy code
POST /signup
Request Body:
json
Copy code
{
  "username": "example",
  "email": "example@example.com",
  "password": "password"
}
Response:
json
Copy code
{
  "success": true,
  "token": "your_jwt_token"
}
Login:

plaintext
Copy code
POST /login
Request Body:
json
Copy code
{
  "email": "example@example.com",
  "password": "password"
}
Response:
json
Copy code
{
  "success": true,
  "token": "your_jwt_token"
}
Additional Information
Ensure MongoDB is running and accessible.
The frontend and backend communicate via API calls to http://localhost:4000.