# Day 4: CI/CD with GitHub Actions

## Goals
- Automate testing and deployment
- Build and publish Docker images
- Deploy on successful builds
- Implement branch-based strategies

## Tasks

### Exercise 1: Test Workflow
Create `.github/workflows/test.yml`:
- Trigger on push and pull requests
- Set up Node.js environment
- Install dependencies
- Run tests and linting
- Report coverage

### Exercise 2: Build Workflow
Create `.github/workflows/build.yml`:
- Build Docker image
- Tag with commit SHA and branch
- Push to GitHub Container Registry
- Cache layers for speed

### Exercise 3: Deploy Workflow
Create `.github/workflows/deploy.yml`:
- Trigger on main branch push
- Deploy to staging automatically
- Manual approval for production
- Rollback on failure

### Exercise 4: Secrets Management
Configure GitHub secrets:
- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`
- `DEPLOY_KEY`
- Environment-specific variables

## Workflow Examples

```yaml
# test.yml - Run on every push
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm test
```

## Expected Outcomes
- Automated tests on every commit
- Docker images published on merge
- Staging deploys automatically
- Production requires approval
