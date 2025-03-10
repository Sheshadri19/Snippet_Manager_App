# Snippet Manager App

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation Guide](#installation-guide)
- [How It Works](#how-it-works)
- [App Structure](#app-structure)
- [Routes and Functionalities](#routes-and-functionalities)
- [Challenges and Solutions](#challenges-and-solutions)
- [Future Improvements](#future-improvements)
- [License](#license)

## Introduction

Snippet Manager App is a full-stack web application that allows users to securely store, organize, and manage code snippets. Users must register and log in to use the platform. Authentication is handled using JWT tokens, and user credentials are secured with bcrypt.js. The backend is built with Node.js and Express, while MongoDB serves as the database. The frontend is developed using EJS for rendering pages.

## Features

- **User Authentication**: Register and log in using email and password.
- **JWT Authentication**: Secure token-based authentication that persists after reload.
- **Snippet Management**: Create, view, edit, and delete code snippets.
- **Search Functionality**: Search for snippets by title or category.
- **Cookie-based Session Handling**: JWT token stored in cookies for maintaining session.
- **Responsive UI**: Styled using EJS and Bootstrap elements.
- **Error Handling**: Displays error messages for invalid credentials, unauthorized access, or database errors.

## Tech Stack

### Frontend:
- **EJS** (for templating)
- **Bootstrap** (for UI design)
- **JavaScript** (for client-side functionality)

### Backend:
- **Node.js** (server-side runtime)
- **Express.js** (backend framework)
- **MongoDB** (database for storing user and snippet data)
- **JWT** (for authentication and session management)
- **bcrypt.js** (for password hashing)

### Additional Tools:
- **Mongoose** (for database schema management)
- **Cookie Parser** (for handling JWT tokens in cookies)

## Installation Guide

### Prerequisites
- Node.js installed
- MongoDB running (local or cloud-based like MongoDB Atlas)


## Start App :" npm start"
## server : "http://localhost:3000"

### Step 1: Clone the Repository
```bash
git clone https://github.com/Sheshadri19/Snippet_Manager_App.git


