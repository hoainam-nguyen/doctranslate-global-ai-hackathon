
# Hackathon Project

This repository contains the codebase for the **Hackathon Project**, which includes both backend and frontend services. The project is containerized using Docker, allowing for easy setup and deployment.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Prerequisites](#prerequisites)
3. [Setup and Installation](#setup-and-installation)
   - [Cloning the Repository](#cloning-the-repository)
   - [Environment Variables](#environment-variables)
   - [Docker Setup](#docker-setup)
4. [Usage](#usage)
   - [Starting the Application](#starting-the-application)
   - [Accessing the Application](#accessing-the-application)
5. [Development](#development)
6. [Contributing](#contributing)
7. [License](#license)

## Project Structure

```plaintext
hackathon/
│
├── backend/                   # Backend service (Python)
│   ├── api/                   # API endpoints
│   ├── src/                   # Source code
│   ├── resources/             # Resources like configs
│   ├── Dockerfile-backend     # Dockerfile for backend service
│   ├── requirements.txt       # Python dependencies
│   ├── .env                   # Environment variables for backend
│   └── server.py              # Entry point for backend application
│
├── frontend/                  # Frontend service
│   ├── src/                   # Source code
│   ├── public/                # Public assets
│   ├── Dockerfile-frontend    # Dockerfile for frontend service
│   ├── .env                   # Environment variables for frontend
│   ├── package.json           # Node.js dependencies
│   └── vite.config.ts         # Vite configuration for React
│
├── docker-compose.yml         # Docker Compose configuration
├── .gitignore                 # Git ignore file
└── README.md                  # Project documentation
```

## Prerequisites

Before setting up this project, ensure you have the following installed on your local machine:

- **Docker** (version 20.x or higher)
- **Docker Compose** (version 1.27.x or higher)

## Setup and Installation

### Cloning the Repository

To start with, clone this repository to your local machine using the following command:

```bash
git clone https://github.com/hoainam-nguyen/doctranslate-global-ai-hackathon.git
cd hackathon
```

### Environment Variables

Make sure to set up the environment variables for both the backend and frontend services. You can find the `.env` files in the respective directories:

- `backend/.env`: Contains environment variables for the backend service.
- `frontend/.env`: Contains environment variables for the frontend service.

### Docker Setup

The project is containerized using Docker. Ensure that Docker and Docker Compose are installed on your system. The Docker setup includes two services:

- **Backend Service**: A Python-based service running with Gunicorn.
- **Frontend Service**: A Node.js-based service using Vite for development.

The `docker-compose.yml` file defines both services.

## Usage

### Starting the Application

To start both backend and frontend services, run the following command:

```bash
docker-compose up --build
```

This command will build the Docker images and start the containers as defined in the `docker-compose.yml` file.

### Accessing the Application

- **Backend**: The backend service will be accessible at `http://localhost:9000`.
- **Frontend**: The frontend service will be accessible at `http://localhost:3000`.

## Development

For development purposes, you might want to run the services individually:

```bash
docker compose up --build -d
```


## Contributing

If you would like to contribute to this project, please fork the repository and create a pull request with detailed information about the changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
