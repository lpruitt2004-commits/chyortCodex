# Day 1 Solution: Docker Basics

## Build and Run

```bash
# Build the image
docker build -t todo-api:v1 .

# Run the container
docker run -d -p 3000:3000 --name todo-app todo-api:v1

# Test health endpoint
curl http://localhost:3000/health

# View logs
docker logs todo-app

# Test API
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Docker"}'

curl http://localhost:3000/todos
```

## With Volume (for development)

```bash
# Run with volume mount and nodemon
docker run -d \
  -p 3000:3000 \
  -v $(pwd):/app \
  -v /app/node_modules \
  --name todo-dev \
  todo-api:v1 \
  npm run dev
```

## Container Management

```bash
# List running containers
docker ps

# Stop container
docker stop todo-app

# Remove container
docker rm todo-app

# View image details
docker inspect todo-api:v1

# Clean up
docker system prune -a
```

## Key Concepts
- **Image layers**: Each Dockerfile instruction creates a layer
- **HEALTHCHECK**: Built-in monitoring for container health
- **Port mapping**: `-p host:container` exposes container ports
- **Volumes**: Persist data and enable live reloading
