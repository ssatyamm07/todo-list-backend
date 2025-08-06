# Todo List Backend API

A Node.js and Express-based backend for managing tasks and user authentication, utilizing Sequelize ORM and PostgreSQL.

## Features

- **User Authentication**: Register and login with JWT-based authentication.
- **Secure Passwords**: Password hashing using bcrypt.
- **Session Management**: Cookie-based sessions for secure login.
- **Task Management**: Full CRUD operations for tasks (Create, Read, Update, Delete).
- **Database**: PostgreSQL database hosted on NeonDB.
- **ORM**: Sequelize for database interaction.
- **Environment Configuration**: Configurable settings for different environments.
- **Validation & Error Handling**: Input validation and robust error handling.
- **Modular Design**: Clean and maintainable code structure.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT
- **Password Security**: Bcrypt
- **Environment Management**: dotenv

## Project Structure

```
ToDo-List-backend/
├── config/        # Configuration files (e.g., database, authentication)
├── controllers/   # Route controllers for handling requests
├── middleware/    # Custom middleware (e.g., authentication, error handling)
├── models/        # Sequelize models for database tables
├── migrations/    # Sequelize migration files
├── routes/        # API route definitions (e.g., tasks, users)
├── .env.example   # Template for environment variables
├── app.js         # Main application entry point
├── package.json   # Project metadata and dependencies
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/todo-list-backend.git
cd todo-list-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Application

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint             | Description                   |
|--------|-----------------------|-------------------------------|
| POST   | `/api/auth/register` | Register a new user           |
| POST   | `/api/auth/login`    | Login and receive JWT cookie  |
| POST   | `/api/auth/logout`   | Logout by clearing the cookie |
| GET    | `/api/tasks`         | Retrieve all tasks (auth required) |
| POST   | `/api/tasks`         | Create a new task             |
| PUT    | `/api/tasks/:id`     | Update an existing task       |
| DELETE | `/api/tasks/:id`     | Delete a task                 |

