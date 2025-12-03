# Day 5: Cloud Deployment

## Goals
- Deploy to production cloud platforms
- Configure platform-specific settings
- Set up monitoring and logging
- Implement health checks

## Platform Options

### Option 1: Render
- Web services with auto-deploy
- Managed PostgreSQL
- Free SSL certificates
- Auto-scaling

### Option 2: Railway
- GitHub integration
- One-click PostgreSQL
- Environment management
- Usage-based pricing

### Option 3: Fly.io
- Global edge deployment
- Dockerfile-based deploys
- Built-in CDN
- Regional databases

## Tasks

### Exercise 1: Platform Setup
- Create account on chosen platform
- Connect GitHub repository
- Configure environment variables
- Set up database

### Exercise 2: Deploy Configuration
Create platform-specific config:
- `render.yaml` for Render
- `railway.json` for Railway  
- `fly.toml` for Fly.io

### Exercise 3: Health & Monitoring
Implement:
- Health check endpoint
- Readiness probe
- Metrics endpoint
- Error tracking

### Exercise 4: Production Checklist
- Enable HTTPS
- Set up custom domain
- Configure auto-scaling
- Enable logging
- Set up alerts

## Deployment Commands

```bash
# Render (via Git push)
git push origin main

# Railway
railway up

# Fly.io
fly deploy
fly logs
fly status
```

## Post-Deployment
- Test health endpoint
- Monitor logs for errors
- Verify database connectivity
- Load test the application
- Document deployment process
