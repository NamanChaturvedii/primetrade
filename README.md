# Primetrade Backend Assignment

## Overview

This project is a full-stack application built as part of the backend developer assignment. It includes authentication, role-based access, and Create, Read, and Delete operations for notes.

## Tech Stack

* Backend: Node.js, Express.js
* Database: PostgreSQL
* Frontend: React.js
* Authentication: JWT

## Features

* User Registration & Login
* JWT Authentication
* Role-based access (basic)
* Notes operations (Create, Read, Delete)
* Protected routes
* Simple frontend UI for interaction

## Project Structure

* backend/ → API and database logic
* frontend/ → React UI
* docs/ → scalability notes

## Setup Instructions

### Backend

cd backend
npm install
node server.js

### Frontend

cd frontend
npm install
npm start

## API Endpoints

### Auth

* POST /api/auth/register
* POST /api/auth/login

### Notes

* GET /api/notes
* POST /api/notes
* DELETE /api/notes/:id

## Security

* Password hashing using bcrypt
* JWT token authentication
* Protected API routes

## Notes

This project focuses more on backend functionality and API design. Frontend is kept simple for demonstration.

## Postman Collection
Postman collection is included in the project under the /postman folder for API testing.
