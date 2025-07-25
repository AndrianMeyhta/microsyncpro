# Microsyncpro Full-Stack Application

This is a full-stack web application named `microsyncpro`, featuring a Go backend (Gin), a React frontend (TypeScript), and a PostgreSQL database, all orchestrated with Docker Compose.

## Project Structure

```
microsyncpro/
├── backend/             # Go backend application
│   ├── main.go
│   ├── go.mod
│   ├── go.sum
│   ├── air.toml
│   ├── Dockerfile
│   ├── init.sql         # Database initialization script
│   └── store/           # Database interaction layer
│       └── user_store.go
├── frontend/            # React (TypeScript) frontend application
│   ├── public/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── api.ts
│   │   └── components/  # React components (Login, Register, Dashboard)
│   │       ├── Login.tsx
│   │       ├── Register.tsx
│   │       └── Dashboard.tsx
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── Dockerfile
│   └── nginx.conf       # Nginx configuration for frontend
├── .env.example         # Example environment variables
└── docker-compose.yml   # Docker Compose configuration
```

## Getting Started

### Prerequisites

- Go (for backend local development)
- Node.js and npm (for frontend local development)
- Docker and Docker Compose

### 1. Environment Setup

Copy the example environment file and fill in your desired values. For local development, you might not need to change much, but for Docker, these will be used by `docker-compose.yml`.

```bash
cp .env.example .env
# Open .env and modify JWT_SECRET_KEY with a strong, random string
```

### 2. Running with Docker Compose (Recommended for Development)

This method provides live-reload for both backend and frontend, and manages the database.

1.  Navigate to the root of the `microsyncpro` directory:

    ```bash
    cd microsyncpro
    ```

2.  Build and start the services:

    ```bash
    docker-compose up --build
    ```

    - The backend will be accessible at `http://localhost:8080`.
    - The frontend will be accessible at `http://localhost:3000`.
    - The PostgreSQL database will be accessible at `localhost:5432`.

    Changes to `.go` files in `backend/` or React files in `frontend/src/` will trigger live-reloads.

### 3. Running Locally (Without Docker Compose)

#### 3.1. Backend (Go)

1.  Navigate to the `backend` directory:

    ```bash
    cd microsyncpro/backend
    ```

2.  Install `air` for live-reload (if you haven't already):

    ```bash
    go install github.com/air-verse/air@latest
    ```

3.  Run the backend with live-reload:

    ```bash
    air
    ```

    The backend will start on `http://localhost:8080`.

#### 3.2. Frontend (React)

1.  Navigate to the `frontend` directory:

    ```bash
    cd microsyncpro/frontend
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Start the development server:

    ```bash
    npm run dev
    ```

    The frontend will start on `http://localhost:5173` (or another available port). It is configured to proxy API requests to `http://localhost:8080`.

#### 3.3. Database (PostgreSQL)

For local development without Docker Compose, you'll need a running PostgreSQL instance. You can either:

-   Install PostgreSQL directly on your machine.
-   Run a PostgreSQL container manually:

    ```bash
    docker run --name microsyncpro-db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=microsyncpro_db -p 5432:5432 -d postgres:latest
    ```

    Then, manually run the `init.sql` script against this database.
