# Node.js + MSSQL JWT Auth API

## Description
This is a ready-to-use backend API built with Node.js, Express, Sequelize (MSSQL) and JWT authentication.  
It includes user registration, login, role-based authorization, password reset, and refresh token management.  
Designed for secure authentication and easy integration with any frontend application.

## Features
- User registration with automatic "user" role assignment
- Login with username or email
- JWT authentication and role-based authorization
- Password reset via JWT token
- Refresh token management
- Rate limiting on login to prevent brute-force attacks
- Fully validated inputs for username, email, and password
- Sequelize ORM with migrations for MSSQL
- Ready-to-use Postman testing setup

## Requirements
- Node.js v18+  
- MSSQL server (local or remote)  
- NPM

## Installation / Setup
1. Clone the repository:  
   ```bash
   git clone <repository-url>
2. Install dependencies:
    npm install
3. Configure your .env file based on .env.example
    DB_HOST=
   
    DB_USER=
   
    DB_PASSWORD=
   
    DB_NAME=
   
    JWT_SECRET=
   
    JWT_EXPIRES=1d
   
    JWT_REFRESH_SECRET=
   
    JWT_REFRESH_EXPIRES=7d
   
    Make sure your SQL Server allows SQL authentication and TCP/IP connections.​
5. Run database migrations:
    npx sequelize-cli db:create
    npx sequelize-cli db:migrate
6. Start the server:
    npm start

7. Usage
Register: POST /api/auth/register

Login: POST /api/auth/login

Get current user: GET /api/auth/me (requires Bearer token)

Forgot password: POST /api/auth/forgot-password

Reset password: POST /api/auth/reset-password (requires reset token)

Admin endpoint example: GET /api/auth/admin/ping (requires admin role)

9. Notes
This project is sold as-is for learning and commercial integration purposes.
Do not share or redistribute without permission.
