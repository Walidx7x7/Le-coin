# Le-coin


Express API Project

This project is an Express.js application that provides RESTful APIs for managing articles, authentication, and user operations. The application uses middleware for authentication and organizes routes into separate modules for better maintainability.

Table of Contents

Features

Installation

Usage

Routes

Article Routes

Auth Routes

User Routes

Project Structure

Dependencies

Features

Create, read, update, and delete articles.

User authentication with registration and login.

Password reset functionality with reset codes.

User management features: update and delete users.

Authentication middleware to protect routes.

Installation

Clone the repository:

git clone https://github.com/your-repository.git

Navigate to the project directory:

cd your-project-directory

Install dependencies:

npm install

Create a .env file for environment variables and configure it (e.g., database URL, JWT secret).

Start the server:

npm start

Usage

Routes

Article Routes

Method

Endpoint

Description

POST

/article

Create a new article.

GET

/articles

Retrieve all articles.

GET

/article/:articleId

Retrieve a single article by ID.

PUT

/article/:articleId

Update an article by ID.

GET

/user/:userId/articles

Get articles by a specific user.

DELETE

/article/:articleId

Delete an article by ID.

Auth Routes

Method

Endpoint

Description

POST

/register

Register a new user.

POST

/login

Login a user.

POST

/forgot-password

Send a password reset code to the user.

POST

/verify-code

Verify the reset code.

POST

/reset-password

Reset the user's password.

User Routes

Method

Endpoint

Description

GET

/users

Retrieve all users.

DELETE

/delete

Delete a user.

PUT

/update/:id

Update user details by ID.

Project Structure

project-directory
├── controllers
│   ├── articleController.js
│   ├── authController.js
│   ├── forgotPasswordController.js
│   ├── userController.js
├── middlewares
│   ├── authMiddleware.js
├── models
│   ├── articleModel.js
│   ├── userModel.js
├── routes
│   ├── articleRoutes.js
│   ├── authRoutes.js
│   ├── userRoutes.js
├── .env
├── app.js
├── package.json

Dependencies

express: Web framework for Node.js.

mongoose: MongoDB object modeling tool.

jsonwebtoken: For JWT authentication.

bcryptjs: For hashing passwords.

dotenv: Load environment variables.

Feel free to modify this README to fit the specific details and requirements of your project.

