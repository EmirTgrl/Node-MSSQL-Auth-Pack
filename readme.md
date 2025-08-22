# 🚀 Node-MSSQL Authentication Pack

A **secure and ready-to-use authentication API** built with **Node.js**, **Express**, and **Sequelize (MSSQL)**.  
It provides **JWT authentication**, **role-based authorization**, and a **robust backend** that can be integrated with any frontend (React, Vue, Angular, mobile apps, etc.).

---

## ✨ **Key Features**

- 🔐 **User registration** with automatic role assignment.  
- 🔑 **Login** via **email or username**.  
- 🛡 **JWT & role-based authorization**.  
- ♻ **Refresh token** support.  
- 📧 **Password reset**.  
- 🛑 **Rate-limiting** for login attempts (anti-brute-force).  
- ✅ **Validated user inputs** (credentials & payload).  
- 🗄 **Sequelize ORM** with migrations.  
- 🧪 **Ready-to-use Postman collection** for testing.

---

## 📋 **Requirements**

Make sure you have installed:  
- [Node.js](https://nodejs.org/) & npm  
- [MSSQL](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) database server  

---

## ⚡ **Installation Guide**

After downloading and extracting the project ZIP:

1️⃣ Navigate to the Project Directory
    cd Node-MSSQL-Auth-Pack

2️⃣ Install Dependencies
    npm install

3️⃣ Set Up Database & Environment
    Create a .env file in the root directory of your project.
    Fill it with your database and project information:
    # DATABASE SETTINGS
    DB_HOST=localhost
    DB_USER=sa
    DB_PASSWORD=your_strong_password
    DB_NAME=AuthPackDB

    # JWT SETTINGS
    JWT_SECRET=your_super_secret_jwt_key
    JWT_EXPIRES=15m
    JWT_REFRESH_SECRET=7d
    JWT_REFRESH_EXPIRES=7d

4️⃣ Run Migrations & Seeders
    Crucial Step: Before running migrations, create an empty database in your MSSQL server with the name you specified in the .env file (e.g., AuthPackDB).
    Then, run the migrations to create the necessary tables:
     To generate all required tables: npx sequelize-cli db:migrate
     If you also have seed files for inserting default roles/admin: npx sequelize-cli db:seed:all
     Note: If you don't have migration or seed files yet, you can create them using: npx sequelize-cli migration:generate --name create-users  then  npx sequelize-cli db:migrate
     
5️⃣ Start the Server
    npm start
    The server will start on http://localhost:5000 by default.


📡 API Endpoints
All API requests should be sent in JSON format.

1️⃣ User Registration
    URL: POST /api/auth/register
    Description: Creates a new user.
    📝 Request Body:
        {
    "identifier": "test@email.com",  -> may be email or username
    "password": "Password123."
    ✅ Success Response: 201 Created
        }

2️⃣ User Login
    URL: POST /api/auth/login
    Description: Authenticates a user and returns JWT tokens.
    📝 Request Body:
        {
    "identifier": "test@email.com",
    "password": "Password123."
        }
    ✅ Success Response: 200 OK
    {
    "token": "access_token_here",
    "refreshToken": "refresh_token_here"
    }

3️⃣ Refresh Token
    URL: POST /api/auth/refresh-token
    Description: Generates a new access token using a valid refresh token.
    📝 Request Body:
        {
    "refreshToken": "refresh_token_here"
        }
    ✅ Success Response: 200 OK
        {
    "token": "new_access_token_here"
        }

4️⃣ Get Current User
    URL: GET /api/user/me
    Description: Retrieves the logged-in user's information. This endpoint is protected by a JWT access token.
    🔑 Headers: Authorization: Bearer <access_token>
    ✅ Success Response: 200 OK
        {
    "id": 1,
    "username": "testuser",
    "email": "test@email.com",
    "role": "user"
        }

5️⃣ Forgot Password
    URL: POST /api/auth/forgot-password
    Description: Sends a password reset token to the user.
    📝 Request Body:
        {
    "email": "test@email.com"
        }
    ✅ Success Response: 200 OK

6️⃣ Reset Password
    URL: POST /api/auth/reset-password
    Description: Resets the password using the reset token received via forgot-password token.
    📝 Request Body:
        {
    "resetToken": "token_from_email",
    "newPassword": "NewPassword123."
        }
    ✅ Success Response: 200 OK


❗ Troubleshooting

Connection refused: Check .env values & ensure MSSQL is running.
Migrations not working: Ensure you created the empty database first before db:migrate.
JWT errors: Confirm JWT_SECRET and JWT_REFRESH_SECRET are set correctly.
