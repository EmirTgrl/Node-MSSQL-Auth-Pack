🚀 Node-MSSQL Authentication Pack

A secure and ready-to-use authentication API built with Node.js, Express, and Sequelize (MSSQL).
It provides JWT authentication, role-based authorization, and a robust backend that can be integrated with any frontend (React, Vue, Angular, mobile apps, etc.).

✨ Key Features

• 🔐 User registration with automatic role assignment
• 🔑 Login via email or username
• 🛡 JWT & role-based authorization
• ♻ Refresh token support
• 📧 Password reset
• 🛑 Rate-limiting for login attempts (anti-brute-force)
• ✅ Validated user inputs
• 🗄 Sequelize ORM with migrations
• 🧪 Ready-to-use Postman collection for testing


📋 Requirements

• Node.js & npm
• MSSQL database server

⚡ Installation Guide

After downloading and extracting the project ZIP:

1️⃣ Navigate to Project Directory

cd Node-MSSQL-Auth-Pack

2️⃣ Install Dependencies

npm install

3️⃣ Set Up Database & Environment

Create a .env file in the root directory:

Database Settings

• DB_HOST=localhost
• DB_USER=sa
• DB_PASSWORD=your_strong_password
• DB_NAME=AuthPackDB

JWT Settings

• JWT_SECRET=your_super_secret_jwt_key
• JWT_EXPIRES=15m
• JWT_REFRESH_SECRET=7d
• JWT_REFRESH_EXPIRES=7d


4️⃣ Run Migrations & Seeders

• Create an empty database in MSSQL first.
• Run migrations to create tables: npx sequelize-cli db:migrate
• Optional: Run seeders for default roles/admin: npx sequelize-cli db:seed:all

5️⃣ Start Server

npm start – Server runs at http://localhost:5000


📡 API Endpoints

1️⃣ User Registration

• POST /api/auth/register
• Description: Creates a new user.
• Body:
    • identifier: email or username
    • password: Password123.
• Success Response: 201 Created

2️⃣ User Login

• POST /api/auth/login
• Description: Authenticates a user and returns JWT tokens.
• Body: identifier & password
• Success Response: 200 OK → Returns token + refreshToken

3️⃣ Refresh Token

• POST /api/auth/refresh
• Description: Generates a new access token using a valid refresh token.
• Body: refreshToken
• Success Response: 200 OK → Returns new access token

4️⃣ Get Current User

• GET /api/user/me
• Description: Retrieves the logged-in user's information.
• Header: Authorization: Bearer <access_token>
• Success Response: 200 OK → Returns user info (id, username, email, role)

5️⃣ Forgot Password

• POST /api/auth/forgot-password
• Description: Sends a password reset token to the user.
• Body: email
• Success Response: 200 OK

6️⃣ Reset Password

• POST /api/auth/reset-password
• Description: Resets the password using the reset token from forgot-password request.
• Body: resetToken + newPassword
• Success Response: 200 OK


❗ Troubleshooting

• Connection refused: Check .env & ensure MSSQL is running
• Migrations not working: Ensure empty database is created before db:migrate
• JWT errors: Confirm JWT_SECRET & JWT_REFRESH_SECRET are set correctly