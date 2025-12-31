# Pastebin Lite

Pastebin Lite is a lightweight web application that allows users to create, store, and share plain text using a unique link. Each paste can optionally expire after a specified duration, after which it becomes unavailable.

## Features
- Create and share text pastes via a unique URL
- View pastes using a dynamic route
- Optional time-based expiration
- Backend-focused REST-style API
- Safe rendering of user content

## Tech Stack
- Next.js (App Router)
- TypeScript
- Node.js

## API Endpoints
- POST /api/paste  
  Creates a new paste and returns a unique ID.

- GET /api/paste?id={id}  
  Retrieves the paste if it exists and has not expired.

## Running Locally
```bash
npm install
npm run dev
