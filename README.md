# Multi-tier Node.js + MySQL Application with Docker and Kubernetes

This project demonstrates how to create a multi-tier application using Node.js and MySQL, containerize it with Docker, and deploy it to Kubernetes.

## Project Structure

```
nodejs-mysql-k8s/
│
├── app.js
├── package.json
├── package-lock.json
├── init.sql
├── Dockerfile
├── docker-compose.yml
├── mysql-deployment.yaml
└── nodejs-deployment.yaml
```

## Prerequisites

- Node.js
- Docker and Docker Compose
- Kubernetes (minikube for local development)
- kubectl

## Setup and Deployment

### 1. Node.js Application

1. Initialize the Node.js project:
   ```
   npm init -y
   npm install express mysql2
   ```

2. Create `app.js` with the application code.

### 2. MySQL Database

1. Create `init.sql` with the initial database schema and data.

### 3. Dockerize the Application

1. Create a `Dockerfile` for the Node.js application.
2. Create a `docker-compose.yml` file for local development.

### 4. Run with Docker Compose

```
docker-compose up --build
```

### 5. Kubernetes Deployment

1. Start minikube:
   ```
   minikube start
   ```

2. Create Kubernetes deployment files:
   - `mysql-deployment.yaml`
   - `nodejs-deployment.yaml`

3. Build and load the Docker image:
   ```
   docker build -t nodejs-app .
   minikube image load nodejs-app:latest
   ```

4. Apply the Kubernetes configurations:
   ```
   kubectl apply -f mysql-deployment.yaml
   kubectl apply -f nodejs-deployment.yaml
   ```

5. Check the status of your deployments:
   ```
   kubectl get deployments
   kubectl get pods
   kubectl get services
   ```

6. Access your application:
   ```
   minikube service nodejs-app
   ```

## Application Details

- The Node.js application runs on port 3000.
- It connects to a MySQL database using environment variables for configuration.
- The application has two endpoints:
  - `/`: Returns a "Hello from Node.js!" message.
  - `/users`: Returns a list of users from the database.

## Notes

- This is a basic setup for demonstration purposes. For production use, consider implementing proper security measures, error handling, and scalability features.
- The MySQL password is set in plain text in this example. For a production environment, use Kubernetes secrets to manage sensitive information.
- Persistent volumes are not set up in this example. For a production environment, you should configure persistent storage for the database.

