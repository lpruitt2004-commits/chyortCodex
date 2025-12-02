# Day 2: Multi-Stage Builds & Docker Compose

## Goals
- Optimize Docker images with multi-stage builds
- Orchestrate multi-container applications
- Configure development vs production environments
- Set up service networking and dependencies

## Tasks

### Exercise 1: Multi-Stage Dockerfile
Create an optimized Dockerfile with:
- **Builder stage**: Install all dependencies, build assets
- **Production stage**: Copy only production artifacts
- Target final image size < 150MB

### Exercise 2: Docker Compose Setup
Create `docker-compose.yml` with:
- **app service**: Your Node.js API
- **db service**: PostgreSQL database
- **volumes**: Database persistence
- **networks**: Custom bridge network
- **environment**: Service configuration

### Exercise 3: Database Integration
Update the app to:
- Connect to PostgreSQL
- Run migrations on startup
- Store todos in database instead of memory

### Exercise 4: Development Workflow
Configure:
- Dev compose file with volume mounts
- Hot reloading enabled
- Database seed data
- Service health checks

## Commands Reference

```bash
# Build and start all services
docker-compose up --build

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f app

# Run migrations
docker-compose exec app npm run migrate

# Stop services
docker-compose down

# Remove volumes
docker-compose down -v

# Development mode
docker-compose -f docker-compose.dev.yml up
```

## Expected Output
- App connects to PostgreSQL successfully
- Todos persist across container restarts
- Services communicate via network
- Optimized production image under 150MB
