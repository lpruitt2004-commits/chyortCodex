# Week 11: Deployment & DevOps

## Overview
Ship your applications to production with confidence. Learn containerization with Docker, environment management, CI/CD pipelines, and cloud deployment strategies. By week's end, you'll deploy a full-stack app with automated testing and monitoring.

## Learning Objectives
- Containerize Node.js applications with Docker
- Orchestrate multi-container apps with Docker Compose
- Manage environment-specific configuration and secrets
- Build CI/CD pipelines with GitHub Actions
- Deploy to cloud platforms (Render, Railway, Fly.io)
- Implement health checks and basic monitoring

## Daily Breakdown

### Day 1: Docker Basics
- Install Docker, understand images vs containers
- Write a Dockerfile for a Node.js app
- Build images, run containers, manage volumes
- Port mapping and container networking

### Day 2: Multi-Stage Builds & Compose
- Optimize images with multi-stage builds
- Docker Compose for app + database orchestration
- Development vs production configurations
- Container networking and service discovery

### Day 3: Environment Config & Secrets
- Environment-based configuration patterns
- Secrets management (env files, vault basics)
- Config for dev, staging, production
- 12-factor app principles

### Day 4: CI/CD with GitHub Actions
- Automated testing on push/PR
- Build and publish Docker images
- Deploy on successful builds
- Branch-based deployment strategies

### Day 5: Cloud Deployment
- Deploy to Render/Railway/Fly.io
- Platform-specific configurations
- Health checks and uptime monitoring
- Logging and basic observability

## Project: Deploy Full-Stack App
Build and deploy a complete application with:
- Dockerized Node.js API + React frontend
- PostgreSQL database with migrations
- CI/CD pipeline with automated tests
- Production deployment with monitoring
- Environment-based configuration

## Prerequisites
- Docker Desktop installed
- GitHub account for Actions
- Cloud platform account (Render/Railway/Fly.io free tier)

## Commands
```bash
cd curriculum/weeks/week_11_deployment

# Docker basics
docker build -t my-app .
docker run -p 3000:3000 my-app

# Compose
docker-compose up
docker-compose down

# Cloud deployment (example: Fly.io)
fly launch
fly deploy
```

## Skills Checklist
- [ ] Build optimized Docker images
- [ ] Use Docker Compose for multi-container apps
- [ ] Manage secrets and environment configs
- [ ] Set up CI/CD with GitHub Actions
- [ ] Deploy to cloud platform
- [ ] Configure health checks and monitoring

## Resources
- Docker Docs: https://docs.docker.com/
- Docker Compose: https://docs.docker.com/compose/
- GitHub Actions: https://docs.github.com/en/actions
- Render Docs: https://render.com/docs
- Fly.io Docs: https://fly.io/docs/
- 12-Factor App: https://12factor.net/
