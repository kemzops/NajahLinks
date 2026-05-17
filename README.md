# NajahLinks
![Bundle Screenshot](https://raw.githubusercontent.com/kemzops/NajahLinks/main/screenshots/bundle.png)

![License](https://img.shields.io/badge/license-MIT-blue.svg)

Najah Links is a **web-based** platform built with **Node.js** and **Express** that enables students of **An-Najah National University** to create, manage, and share link bundles where multiple URLs are grouped and displayed in a single public page for easy access.

## Table of Contents

- [MVP Overview](#mvp-overview)
- [Tech Stack](#tech-stack--packages)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [SMTP Setup (Mailpit)](#smtp-setup-mailpit)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Acknowledgments](#acknowledgments)

## MVP Overview

This project is submitted as a **Minimum Viable Product (MVP)** for a **Software Engineering course (10671351) final assignment**.

It implements the core required functionality:

- User authentication with JWT
- Create, update, and delete link bundles
- Add, edit, and delete links inside bundles
- Public access pages for bundles
- Basic dashboard for management
- Backend-focused implementation
- Ownership-based access control (ofc)

Advanced features such as analytics dashboard, admin panel, QR code generation, and enhanced sharing tools are intentionally excluded ~~or marked for future work~~.

Authentication is implemented using JWT-based session cookies without refresh token rotation or token invalidation mechanisms, in line with Prototype/MVP scope.

## Tech Stack / Packages

- Node.js (ESM, v22+)
- Express.js
- [ETA templating engine](https://github.com/bgub/eta/)
- [Turso (Serverless SQLite database)](https://turso.tech/)
- JWT authentication (jsonwebtoken)
- bcrypt (password hashing)
- [Nodemailer (SMTP integration)](https://nodemailer.com/)
- [Mailpit (local SMTP testing server)](https://github.com/axllent/mailpit)
- [Helmet (security headers)](https://github.com/helmetjs/helmet)
- [express-rate-limit (API protection)](https://github.com/express-rate-limit/express-rate-limit)
- compression (response optimization)
- cookie-parser (cookie handling)
- [Supertest](https://github.com/ladjs/supertest) + Built-in runner node:test (simple API testing)
- **Others:** cross-env (environment scripts), nodemon (dev reload), dotenv (environment variables)

## Prerequisites

Before running the project, ensure you have:

- Node.js (v24+ recommended)
- npm package manager (v11+ recommended)
- SMTP server (Mailpit for local)
- Git for cloning the repository

## Installation

### Clone the repository

```bash
git clone https://github.com/kemzops/NajahLinks.git

cd NajahLinks

npm install
```

## SMTP Setup (Mailpit)

This project uses **Mailpit** as a local SMTP server for development and testing emails.

Official documentation: https://mailpit.axllent.org/docs/install/

Download the appropriate binary from: https://github.com/axllent/mailpit/releases

### Run mailpit

Since mailpit is a single binary, just run it using: 

```bash
mailpit
```

### Mailpit Access:
Web UI: `http://localhost:8025`

SMTP Host: `localhost`

SMTP Port: `1025`

## Environment Variables

Create a `.env` file in the project root or:

```bash
cp .env.example .env
```

Edit .env with your values:

```bash
SERVER_PORT=3000
# BASE URL FOR VERIFICATION EMAILS
WEBSITE_URL=

# JWT SIGN SECRET KEY
JWT_SECRET=
# ISSUER IDENTIFIER (APP NAME/DOMAIN)
JWT_ISSUER=
# INTENDED AUDIENCE FOR THE TOKEN (E.G. FRONTEND)
JWT_AUDIENCE=
# TOKEN EXPIRATION TIME (E.G. 8d)
JWT_EXPIRES_IN=

# EMAIL SERVICE (MAILPIT OR PRODUCTION) 
# https://nodemailer.com/smtp/pooled
SMTP_HOST=127.0.0.1
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_POOL=false
SMTP_USER=
SMTP_PASS=
SMTP_FROM=contact@azizjaber.me

# EXTRA SERVER-SIDE SECRET ADDED TO PASSWORD HASHING FOR ADDED SECURITY
PASSWORD_PEPPER=

# SERVERLESS
# https://docs.turso.tech/sdk/ts/quickstart
TURSO_DATABASE_URL=libsql://
TURSO_AUTH_TOKEN=
```

## Running the Project

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run prod
```

### Run Tests

The project uses Node.js built-in test runner (`node:test`) with [Supertest](https://github.com/ladjs/supertest).

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Access (Default port)

```bash
http://localhost:3000
```

## Acknowledgments

- [Pico.css](https://picocss.com/) for lightweight UI styling and rapid prototyping  
- [Express.js](https://expressjs.com/) for the backend framework  
- [ETA](https://github.com/bgub/eta/) for server-side templating  
- AND Open-source community for the libraries used in this project