# Flagright Assignment

A web application designed as part of the Flagright assignment, showcasing a robust **React-based frontend** and **Node.js + Express backend**. Docker integration ensures seamless deployment and scalability.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [APIs at a Glance](#apis-at-a-glance)
4. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running with Docker](#running-with-docker)
5. [Testing](#testing)
6. [Screenshot](#Screenshot)
7. [Deployment Link](#deployment-Link)
---

## Project Overview

This project includes:
- A **frontend** interface built with React for a smooth user experience.
- A **backend** developed in Node.js with Express to handle API requests and business logic.
- **RESTful APIs** for resource management.
- **Dockerized** services for simplified deployment and scalability.

---

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **API Style**: RESTful APIs
- **Containerization**: Docker and Docker Compose

---

## APIs at a Glance

### Base URL: `http://localhost:5000`

| Method | Endpoint             | Description                  |
|--------|-----------------------|------------------------------|
| POST   | `/api/transactions/`  |Create a new transaction.             |
| GET   | `/api/transactions/report`| Generate a report of transactions            |
| GET    | `/api /transactions/`     | Search transactions based on query parameters.       |
| GET    | `/api/transactions/:id`     | Get details of a specific transaction by its ID.  |
| POST | `/api/transactions/cron/start`     | Start a CRON job.          |
| POST | `/api/transactions/cron/stop`     | Stop a CRON job.          |


---

## Getting Started

### Prerequisites

Before running this project, ensure you have:
- **Docker**: [Install Docker](https://www.docker.com/get-started)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

---

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Princemann56/Flagright_assignment.git
   cd Flagright_assignment
2. (Optional) Install dependencies if running locally:

- **Backend**:
  ```bash
  cd backend
  npm install

- **Frontend**:
  ```bash
  cd backend
  npm install


## Running with Docker

1. **Build and run the containers**:
   ```bash
   docker-compose up --build
2. **Access the services**:
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend APIs**: [http://localhost:5000](http://localhost:5000)

3. **Shut down the application**:
   ```bash
   docker-compose down

## Testing

### Backend API Tests

Run tests for the backend APIs:

1. **Navigate to the `backend` directory**:
   ```bash
   cd backend
2. **Install dependencies and run tests**:
   ```bash
   npm install
   npm test
# Frontend Tests

Run unit or integration tests for the React frontend:

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
2. Install dependencies and execute tests:
   ```bash
   npm install
   npm test

# Screenshot

![image](https://github.com/user-attachments/assets/253be349-88ac-411b-9e5a-7c76bfcec5ac)

## Deployment Link

The service is deployed on Render and is accessible at:
- **URL**: [https://your-backend-service.onrender.com](https://flagright-assignment-diic.onrender.com/)

---

## Credentials

Use the following credentials to access the service:

### Admin Login
- **Username**: `user1234`
- **Password**: `user1234`

### Setting up .env
```
MONGO_URI=mongodb://localhost:27017/mydatabase
PORT=5000
JWT_SECRET=
```
