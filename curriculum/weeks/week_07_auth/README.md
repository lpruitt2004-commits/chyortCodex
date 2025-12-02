# Week 7: Authentication & Security

## Overview
This week focuses on building secure authentication flows and hardening your Node.js APIs. You'll implement password hashing, JWTs, sessions, CSRF protection, role-based authorization, refresh tokens, and security best practices like rate limiting, Helmet, and robust input validation.

## Learning Objectives
- Hash and verify passwords securely (bcrypt)
- Issue and verify JWT access tokens
- Implement login/register flows with protected routes
- Use sessions + cookies and protect against CSRF
- Add role-based access control (RBAC)
- Implement refresh tokens with rotation and revocation
- Apply security hardening: Helmet, rate limiting, validation, error handling

## Daily Breakdown

### Day 1: Passwords & JWT Basics
**Topics:** BCrypt hashing, verifying passwords, creating/verifying JWTs, secrets and expirations.

**Exercise:** Build small utilities and minimal endpoints to hash/verify passwords and sign/verify JWTs.

**Outcome:** Comfort with hashing and token primitives.

---

### Day 2: JWT Auth API (Register/Login/Me)
**Topics:** Register, login, access token issuance, auth middleware, protected routes, logout.

**Exercise:** Implement `/register`, `/login`, `/me` with in-memory users and proper validation + error handling.

**Outcome:** Functional JWT auth API with protected profile route.

---

### Day 3: Sessions, Cookies, and CSRF
**Topics:** `express-session`, cookie flags, session-backed auth, CSRF protection with `csurf`.

**Exercise:** Implement session login/logout, a protected route, and CSRF protection with token retrieval endpoint.

**Outcome:** Understanding of cookie/session auth and CSRF defenses.

---

### Day 4: Authorization & Refresh Tokens
**Topics:** RBAC (roles), authorization middleware, refresh tokens, rotation, revocation, secure storage.

**Exercise:** Add roles (`user`, `admin`), protect admin route, implement refresh token rotation using httpOnly cookies.

**Outcome:** End-to-end token lifecycle and authorization controls.

---

### Day 5: Security Hardening
**Topics:** Helmet, rate limiting, validation (Joi), password policy, account lockout, audit logging, CORS.

**Exercise:** Harden the API; add schemas, lockout after repeated failures, structured error handling.

**Outcome:** Production-minded security posture for Node APIs.

## Week Project: Secure Auth Service
Build a secure authentication service that supports:
- User registration and login
- Access token (short-lived) + refresh token (rotating)
- Role-based authorization for privileged routes
- Session support (optional alt mode)
- Security hardening: Helmet, rate limiting, input validation

### Requirements
- Passwords hashed with bcrypt
- Access tokens expire (e.g., 15 minutes)
- Refresh tokens httpOnly + rotation on every refresh
- RBAC for `admin`-only endpoints
- Validation on all inputs; consistent error responses
- Rate limiting on auth endpoints

## Setup

### Install dependencies
```bash
cd curriculum/weeks/week_07_auth
npm install
```

### Env file
Create `.env` in `week_07_auth/`:
```bash
PORT=3000
JWT_SECRET=dev_super_secret_change_me
REFRESH_SECRET=dev_refresh_secret_change_me
SESSION_SECRET=dev_session_secret_change_me
NODE_ENV=development
```

## Try It
- Day 1: `npm run day1`
- Day 2: `npm run day2`
- Day 3: `npm run day3`
- Day 4: `npm run day4`
- Day 5: `npm run day5`

## Skills Checklist
- [ ] Hash and verify passwords with bcrypt
- [ ] Create and verify JWTs (expiry, audience, subject)
- [ ] Implement register/login/logout flows
- [ ] Add auth middleware for protected routes
- [ ] Use sessions + cookies and protect with CSRF
- [ ] Implement refresh token rotation + revocation
- [ ] Apply Helmet, rate limiting, input validation
- [ ] Handle errors safely without leaking internals

## Resources
- BCrypt: https://github.com/dcodeIO/bcrypt.js/
- jsonwebtoken: https://github.com/auth0/node-jsonwebtoken
- express-session: https://github.com/expressjs/session
- csurf: https://github.com/expressjs/csurf
- Helmet: https://helmetjs.github.io/
- express-rate-limit: https://github.com/express-rate-limit/express-rate-limit
- Joi: https://joi.dev/
- OWASP Cheat Sheets: https://cheatsheetseries.owasp.org/
