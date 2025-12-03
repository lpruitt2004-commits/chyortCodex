# Day 1: Docker Basics

## Goals
- Understand Docker images, containers, and layering
- Write a Dockerfile for a Node.js application
- Build, run, and manage containers
- Work with volumes and port mapping

## Tasks

### Exercise 1: First Dockerfile
Create a `Dockerfile` for the provided Node.js app that:
- Uses `node:20-alpine` as base image
- Sets working directory to `/app`
- Copies `package*.json` and runs `npm ci --only=production`
- Copies application code
- Exposes port 3000
- Runs `npm start`

### Exercise 2: Build and Run
1. Build the image: `docker build -t todo-api:v1 .`
2. Run container: `docker run -p 3000:3000 todo-api:v1`
3. Test the API at `http://localhost:3000/health`

### Exercise 3: Volumes and Persistence
Modify the run command to:
- Mount a volume for data persistence
- Enable live reloading for development
- Set environment variables

### Exercise 4: Container Management
Practice:
- Listing running containers
- Viewing logs
- Stopping and removing containers
- Inspecting container details

## Commands Reference
```bash
# Build
docker build -t <image-name>:<tag> .

# Run
docker run -d -p <host>:<container> <image>

# List
docker ps
docker images

# Logs
docker logs <container-id>

# Clean up
docker stop <container-id>
docker rm <container-id>
docker rmi <image-id>

# Volumes
docker run -v $(pwd)/data:/app/data <image>
```

## Expected Output
- Running container accessible on port 3000
- Health check endpoint returns 200
- Data persists between container restarts
