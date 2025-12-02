# Production Deployment Checklist

## Pre-Deployment
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations tested
- [ ] Health check endpoint working
- [ ] Error tracking set up
- [ ] Logging configured

## Platform Setup
- [ ] Account created
- [ ] Repository connected
- [ ] Database provisioned
- [ ] Environment secrets added
- [ ] Custom domain configured (optional)
- [ ] SSL certificate enabled

## Deployment
- [ ] Initial deploy successful
- [ ] Health check passing
- [ ] Database connection verified
- [ ] API endpoints responding
- [ ] Logs showing no errors

## Post-Deployment
- [ ] Monitor for errors
- [ ] Check performance metrics
- [ ] Verify auto-scaling works
- [ ] Test rollback procedure
- [ ] Document deployment process

## Render Deployment

```bash
# 1. Install Render CLI
npm install -g render

# 2. Deploy via Git
git push origin main
# Render auto-deploys from main branch

# 3. Check logs
render logs
```

## Railway Deployment

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Link project
railway link

# 4. Deploy
railway up

# 5. Monitor
railway logs
```

## Fly.io Deployment

```bash
# 1. Install Fly CLI
curl -L https://fly.io/install.sh | sh

# 2. Login
fly auth login

# 3. Launch app
fly launch

# 4. Deploy
fly deploy

# 5. Check status
fly status
fly logs
```

## Monitoring & Maintenance

```bash
# Check application health
curl https://your-app.onrender.com/health

# View recent logs
render logs --tail 100

# Scale application
fly scale count 2

# Database backup
railway run pg_dump > backup.sql
```
