# Documentation

## Table of Contents
- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Middlewares](#middlewares)
- [Utilities](#utilities)
- [Database](#database)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

---

## Introduction
This documentation provides technical details for developers working on the EFDS Backend project. It covers the architecture, setup, configuration, and usage of the backend API server.

## Project Structure
- **app.ts**: Main application entry point.
- **server.ts**: Starts the server.
- **config/**: Configuration files for database and Cloudinary.
- **controllers/**: Business logic for authentication and user management.
- **middleware/**: Custom Express middlewares (auth, upload).
- **models/**: Database models (e.g., User).
- **routes/**: API route definitions.
- **utils/**: Utility functions (email, validation).

## Setup & Installation
1. Clone the repository and install dependencies:
   ```sh
   git clone https://github.com/yemipidanhub/efds-backend.git
   cd efds-backend
   npm install
   ```
2. Create a `.env` file in the root directory (see `README.md` for required variables).
3. Set up your database using the `efds.sql` file.
4. Start the development server:
   ```sh
   npm run dev
   ```

## Configuration
- **Database**: Configure connection in `config/db.config.ts`.
- **Cloudinary**: Set credentials in `config/cloudinary.ts` and `.env`.
- **Email**: Configure email settings in `.env` and `utils/email.ts`.

## API Endpoints
- **Auth** (`/api/auth`):
  - `POST /register` - Register a new user
  - `POST /login` - User login
- **Users** (`/api/users`):
  - `GET /` - List users
  - `GET /:id` - Get user by ID
  - `PUT /:id` - Update user
  - `DELETE /:id` - Delete user

## Middlewares
- **auth.middleware.ts**: Protects routes, checks JWT tokens.
- **upload.middleware.ts**: Handles file uploads to Cloudinary.

## Utilities
- **email.ts**: Functions for sending emails.
- **validation.ts**: Input validation helpers.

## Database
- SQL schema is provided in `efds.sql`.
- Models are defined in `models/` (e.g., `User.model.ts`).

## Testing
- Add your tests in a `tests/` directory (not included by default).
- Use tools like Jest or Mocha for unit/integration testing.

## Troubleshooting
- Ensure all environment variables are set correctly.
- Check database connection and credentials.
- Review logs for errors during startup or API requests.

---
For more details, see the `README.md` file or contact the project maintainer.
