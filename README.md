# Mémoire (Frontend)

A comprehensive journaling application that enables users to track their thoughts, manage goals, and generate affirmations and manifestations. This app is designed with a welcoming interface, a robust dashboard, and intuitive features for mood tracking, goal setting, and manifestation generation.

## Table of Contents

- [Features](#features)
- [Pages Overview](#pages-overview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Backend Repository](#backend-repository)

---

## Features

1. **User Authentication**:

   - Secure signup and login functionality using email and password.
   - Redirection to the homepage upon successful login.

2. **Dashboard**:

   - **Thought of the Day**: Store daily reflections in a personal diary.
   - **Recent Diary Entries**: View the last 5 diary entries.
   - **Mood Checker with Affirmations**:
     - Choose a mood by clicking on an emoji.
     - Generate personalized affirmations for the selected mood.
   - **Activity Tracker**:
     - Display the total number of diary entries and goals created.
   - **Calendar Integration**:
     - Highlight dates with diary entries.

3. **Diary Management**:

   - Create, view, edit, or delete diary entries.
   - Add details such as title, tags, mood, and content.
   - Select the date for each diary entry.

4. **Timeline**:

   - View all diary entries in a chronological list.
   - Perform CRUD (Create, Read, Update, Delete) operations on diary entries.

5. **Goal Management**:

   - Add goals with details such as status and priority.
   - Filter goals by status or priority.
   - Edit or delete goals using a modal.

6. **Manifestations**:

   - Generate three AI-powered manifestations by category (using OpenAI API).
   - Save generated manifestations or create custom ones.
   - View a list of saved manifestations.

7. **Profile Management**:
   - Edit username and password.

---

## Pages Overview

### 1. **Welcome Page**:

- Includes login and signup buttons.
- First interaction point for users.

### 2. **Dashboard**:

- Central hub for all app features.
- Contains sections for:
  - Thought of the Day.
  - Mood Checker and Affirmations.
  - Recent Diary Entries.
  - Calendar view of diary entries.
  - Activity tracker for diary entries and goals.

### 3. **Diary Page**:

- Create diary entries with title, tags, mood, and date.
- Write detailed diary content.
- Save entries to view later.

### 4. **Timeline Page**:

- Displays all diary entries.
- Options to view, edit, or delete entries.

### 5. **Goals Page**:

- Form to create goals with status and priority.
- Filters to organize goals.
- List of all goals with options to edit or delete.

### 6. **Manifestations Page**:

- Generate three AI-powered manifestations by category.
- Save or create custom manifestations.
- View saved manifestations.

### 7. **Profile Page**:

- Update username and password.

---

## Technologies Used

### Frontend:

- **React.jsx** for UI development and state management.
- **Axios** for API requests.
- **CSS/Bootstrap** for styling.

### Backend:

- Refer to the [Backend Repository](#backend-repository) for details.

---

## Installation

### Prerequisites:

- [Node.js](https://nodejs.org/) installed.
- [Git](https://git-scm.com/) installed.
- Backend server running (refer to [Backend Repository](https://github.com/Erlisja/MyDiaryApp_BackEnd)).

### Steps:

1. Clone the frontend repository:
   ```bash
   git clone https://github.com/Erlisja/MyDiaryApp_FrontEnd.git
   cd my_diary_app-front-end
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to:
   ```bash
   http://localhost:5173 or your corresponding port
   ```

## Backend Repository

The backend repository for this application is available here:  
**[Backend Repository URL](https://github.com/Erlisja/MyDiaryApp_BackEnd)** .

### Backend Overview

The backend is responsible for handling user authentication, managing data for diary entries, goals, and manifestations, and integrating with the OpenAI API for generating affirmations and manifestations. The backend uses **Node.js** with **Express.js** as the framework and **MongoDB** as the database.

---

### Models

1. **User Model**:

   - Fields:
     - `username`: String, unique, required.
     - `email`: String, unique, required.
     - `password`: String, hashed, required.
   - Handles user authentication and profile updates.

2. **DiaryEntry Model**:

   - Fields:
     - `userId`: ObjectId (references User), required.
     - `title`: String, required.
     - `content`: String, required.
     - `tags`: [String], required.
     - `mood`: String, required.
     - `date`: Date, required.
   - Stores user-created diary entries.

3. **Goals Model**:

   - Fields:
     - `userId`: ObjectId (references User), required.
     - `title`: String, required.
     - `description`: String, required.
     - `status`: String (e.g., `Pending`, `Completed`), required.
     - `priority`: String (e.g., `High`, `Medium`, `Low`), required.
   - Tracks user goals with status and priority.

4. **Manifestation Model**:
   - Fields:
     - `userId`: ObjectId (references User), required.
     - `content`: String, required.
     - `category`: String, required.
   - Stores both AI-generated and user-created manifestations.

---

### Routes

#### 1. **User Routes** (`/auth`):

- **POST `/register`**: Register a new user.
- **POST `/login`**: Authenticate a user and return a JSON Web Token (JWT).
- **PUT `/update-profile`**: Update user details such as username or password.

#### 2. **DiaryEntry Routes** (`/diary`):

- **GET `/`**: Fetch all diary entries for the authenticated user.
- **POST `/diary-entries`**: Create a new diary entry.
- **PUT `/:id`**: Edit an existing diary entry by its ID.
- **DELETE `/:id`**: Delete a diary entry by its ID.
- **GET `/diary-entries/last5`**: Fetch last 5 entries for the authenticated user.

#### 3. **Goals Routes** (`/goals`):

- **GET `/`**: Fetch all goals for the authenticated user.
- **POST `/new-goal`**: Add a new goal.
- **PUT `/:id`**: Update an existing goal by its ID.
- **DELETE `/:id`**: Delete a goal by its ID.

#### 4. **Manifestation Routes** (`/manifestations`):

- **GET `/`**: Fetch all manifestations for the authenticated user.
- **POST `/generate-manifestation`**: Generate manifestations using the OpenAI API.
  - Requires a `category` in the request body.
- **POST `/new-manifestation`**: Add a custom manifestation.
- **DELETE `/:id`**: Delete a manifestation by its ID.

---

### Database Connection

The backend uses **MongoDB** as the database. The connection is established using the **Mongoose** library, which provides a schema-based solution to model application data.

The `MONGO_URI` is stored in an `.env` file for security, along with other sensitive keys such as the OpenAI API key and JWT secret.

---

### Server Setup

The server is created using **Express.js**, with middleware for JSON parsing and authentication using JWT.

## How to Use the Backend

1. Clone the backend repository:

   ```bash
   git clone https://github.com/Erlisja/MyDiaryApp_BackEnd.git
   cd backend
   npm install
   ```

2. Set up the .env file with the following keys:

   - PORT=3030
   - MONGO_URI=< your-mongo-db-url >
   - SECRET=< your-jwt-secret >
   - OPENAI_API_KEY=< your-openai-api-key >

3. Start the server
   ```bash
   npm start
   ```

---

## Deployment

The application is fully deployed, with the backend hosted on **Render** and the frontend hosted on **Vercel**. You can explore the live app using the link below:

[Live App: Mémoire](https://Mémoire-rust.vercel.app/)

### Backend Deployment on Render

The backend is deployed on **Render** for seamless and scalable hosting. Follow these steps to deploy the backend:

### Frontend Deployment on Vercel

The frontend is deployed on **Vercel**, a platform optimized for React-based applications. Steps to deploy the frontend:

### Live App Details

The app includes the following deployments:

- **Frontend**: [Mémoire on Vercel](https://-rust.vercel.app/)
- **Backend**: Hosted on Render (URL is configured within the frontend environment settings).

This ensures the app is accessible and functional across devices, leveraging modern deployment strategies for a smooth user experience.
