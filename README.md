
# 🌟 Advanced MERN B2B Teams Project Management SaaS - *TeamHive*

## 📌 Project Overview

Welcome to **TeamHive**, a robust and scalable multi-tenancy project management system built using the **MERN stack** (Node.js, MongoDB, and React). Designed with real-world **B2B** use cases in mind, **TeamHive** offers an intuitive and efficient platform to manage teams, projects, tasks, and more. Whether you’re a startup or an enterprise, TeamHive provides the necessary tools for seamless team collaboration and project management.

Key features include:

- **Google Sign-In** for easy authentication
- **Workspace management** to organize teams and projects
- **Project tracking** with epics, tasks, and status management
- **Role-based permissions** for different user roles such as Owner, Admin, and Member
- **Advanced analytics** and **real-time updates** to track your team’s performance
- A powerful, extensible **API** to support future growth and scalability

---

## 🌟 Key Features

Here are the major features of **TeamHive**:

### 🔐 Authentication
- **Google Sign-In** integration for seamless login experience
- Alternative login via **Email** and **Password**
- Secure session management using **cookie-based authentication**

### 🏢 Create & Manage Multiple Workspaces
- Users can create and manage multiple workspaces for different teams or projects
- Each workspace is isolated, ensuring no data leakage between workspaces

### 📊 Projects & Epics Management
- Manage projects and their associated epics
- Assign tasks to epics, track progress, and manage dependencies

### ✅ Tasks
- Full **CRUD** functionality for tasks
- Each task includes fields for **Status**, **Priority**, and **Assignee**
- Tasks can be assigned to members of the workspace

### 👥 Roles & Permissions
- Define user roles within the workspace: **Owner**, **Admin**, and **Member**
- Role-based access control (RBAC) to manage what users can see and do within each workspace

### ✉️ Invite Members to Workspaces
- Owners and admins can invite members to join workspaces
- Invitations are sent via **email** and require confirmation to join

### 🔍 Filters & Search
- Search and filter tasks by **Status**, **Priority**, and **Assigned To**
- Filter projects, tasks, and users within the workspace

### 📈 Analytics Dashboard
- View insightful **analytics** to track the overall progress of projects, tasks, and team performance
- Customizable dashboards for different roles (Owner, Admin, Member)

### 📅 Pagination & Load More
- Optimized data loading with **pagination** to prevent performance bottlenecks
- Option to **load more** tasks and project items as needed

### 🔒 Cookie Session Management
- Secure and **encrypted session management** with cookies
- Automatic session expiration and termination after a set period

### 🚪 Logout & Session Termination
- Users can log out and terminate their sessions securely
- Supports multiple session types (e.g., user-initiated or automatic upon expiration)

### 🌱 Seeding for Test Data
- Includes **data seeding** functionality for testing environments
- Easily populate the database with sample data (e.g., users, projects, tasks)

### 💾 Mongoose Transactions for Robust Data Integrity
- Utilizes **Mongoose transactions** to ensure data integrity
- Guarantees that critical database operations (e.g., updates, inserts) are atomic

### 🌐 Built with MERN Stack
- **Node.js** for backend server and API
- **MongoDB** for database management
- **React.js** for the frontend user interface
- **TypeScript** for a type-safe codebase

---

## 🚀 Tools & Technologies

This project is built using the following technologies:

- **Node.js**: A powerful backend framework that supports scalable, high-performance applications.
- **React.js**: A dynamic, flexible frontend framework used to build responsive, interactive user interfaces.
- **MongoDB** & **Mongoose**: A NoSQL database and ODM (Object Data Modeling) tool to handle flexible, scalable data models.
- **Google OAuth**: Integrated for **Google Sign-In** authentication, making it easy for users to log in using their Google accounts.
- **TypeScript**: Ensures type-safety across the codebase, providing better error checking and code quality.
- **TailwindCSS** & **Shadcn UI**: Provides a clean, responsive, and modern UI design out of the box.
- **Vite.js**: A next-generation, fast frontend build tool for rapid development and quick hot module reloading.

---

## 🔄 Getting Started

To set up **TeamHive** locally and start development, follow these steps:

### 1. Set Up Environment Variables

Create a `.env` file in the root of your project and add the following variables:

```plaintext
PORT=8000
NODE_ENV=development
MONGO_URI="mongodb+srv://<username>:<password>@<>.mongodb.net/TeamHive_db"  

SESSION_SECRET="session_secret_key"

GOOGLE_CLIENT_ID=<your-google-client-id>  
GOOGLE_CLIENT_SECRET=<your-google-client-secret>  
GOOGLE_CALLBACK_URL=http://localhost:8000/api/auth/google/callback

FRONTEND_ORIGIN=http://localhost:5173
FRONTEND_GOOGLE_CALLBACK_URL=http://localhost:3000/google/callback
````

* Replace `<username>`, `<password>`, and `<your-google-client-id>` with your actual credentials.
* Make sure to configure **Google OAuth** in your Google Developer Console to get the **client ID** and **client secret**.

### 2. Run the Application

Once the environment variables are set, install the necessary dependencies and start the application:

```bash
npm install
npm run dev
```

This will launch the backend server on `http://localhost:8000` and the frontend on `http://localhost:5173`.

---

## 🌐 Deploying TeamHive

### 1. Add Environment Variables

To deploy **TeamHive** to your hosting platform (e.g., **Vercel**, **Heroku**, or **AWS**), make sure to add all the necessary environment variables to the platform’s configuration. This includes the **MongoDB URI**, **Google OAuth credentials**, and other application-specific variables.

### 2. Deploy

Once the environment variables are set, deploy your application using your preferred method:

* For **Vercel**, simply connect your repository and deploy with a single click.
* For **Heroku**, use `git push heroku main` to deploy the application.
* For **AWS**, you can use **EC2** for hosting the backend and **S3/CloudFront** for frontend assets.

---

## 📚 Comprehensive Guide

For an in-depth understanding of this project and how to build similar systems, refer to the following:

* **Architecture**: Learn how we structured the application using the MERN stack and TypeScript for type-safety.
* **Features Breakdown**: Step-by-step implementation of major features like authentication, project management, and analytics.
* **Advanced Techniques**: Discover advanced techniques for **seeding data**, **Mongoose transactions**, and **performance optimizations**.
* **Multi-tenancy**: Understand how we implemented multi-tenancy and managed role-based access control.
* **Scalability**: Insights into building scalable SaaS applications using the MERN stack.
* **Security**: Best practices for handling **authentication**, **session management**, and **data integrity**.

# FSD_Project
