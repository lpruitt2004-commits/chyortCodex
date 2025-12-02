# Day 3: Environment Configuration & Secrets

## Goals
- Implement environment-specific configurations
- Manage secrets securely
- Apply 12-factor app principles
- Handle different deployment environments

## Tasks

### Exercise 1: Environment Files
Create configuration for:
- `.env.development` - Local development
- `.env.staging` - Staging environment
- `.env.production` - Production settings

Include: DATABASE_URL, PORT, NODE_ENV, LOG_LEVEL, API_KEYS

### Exercise 2: Config Module
Create `config.js` that:
- Loads environment-specific settings
- Validates required variables
- Provides typed configuration object
- Handles defaults gracefully

### Exercise 3: Secrets Management
Implement:
- Separate secrets from config
- Use Docker secrets for sensitive data
- Rotate database credentials
- Document secret requirements

### Exercise 4: Docker Secrets
Update docker-compose to use:
- Secrets for database passwords
- External configuration sources
- Environment variable files
- Secure defaults

## Commands

```bash
# Load specific environment
docker-compose --env-file .env.staging up

# Use Docker secrets
docker-compose -f docker-compose.secrets.yml up

# Validate configuration
npm run config:validate

# Generate secure secrets
node scripts/generate-secrets.js
```

## Best Practices
- Never commit `.env` files
- Use `.env.example` as template
- Validate all required vars on startup
- Fail fast on missing configuration
- Log configuration (without secrets) on startup
