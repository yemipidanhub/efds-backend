# EFDS Backend

## Project Overview

EFDS Backend is a Node.js/TypeScript REST API server designed to handle authentication, user management, file uploads, and email utilities. It uses Express.js and integrates with services like Cloudinary for file storage.

## Features
- User authentication (register, login)
- User management (CRUD operations)
- File upload support (Cloudinary integration)
- Email utility functions
- Input validation middleware

## Folder Structure
```
├── app.ts                # Main app entry point
├── server.ts             # Server startup script
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── efds.sql              # Database schema (SQL)
├── config/               # Configuration files
│   ├── cloudinary.ts     # Cloudinary setup
│   └── db.config.ts      # Database connection config
├── controllers/          # Route controllers
│   ├── auth.controller.ts
│   └── user.controller.ts
├── middleware/           # Express middlewares
│   ├── auth.middleware.ts
│   └── upload.middleware.ts
├── models/               # Database models
│   └── User.model.ts
├── routes/               # API route definitions
│   ├── auth.routes.ts
│   └── user.routes.ts
├── utils/                # Utility functions
│   ├── email.ts
│   └── validation.ts
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn
- A SQL database (see `efds.sql` for schema)
- Cloudinary account (for file uploads)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yemipidanhub/efds-backend.git
   cd efds-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Set up environment variables (see below).
4. Set up your database using the `efds.sql` file.

## Running the Project

- For development (with auto-reload):
  ```sh
  npm run dev
  ```
- For production:
  ```sh
  npm run build
  npm start
  ```

## Environment Variables
Create a `.env` file in the root directory with the following variables:

```
PORT=3000
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
```

## API Structure
- `/api/auth` - Authentication routes (register, login)
- `/api/users` - User management routes

Controllers and routes are organized in the `controllers/` and `routes/` folders, respectively.

## Contribution Guidelines
- Fork the repository and create your branch from `main`.
- Write clear, concise commit messages.
- Ensure code passes linting and tests before submitting a PR.

## License
This project is licensed under the MIT License.
