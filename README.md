# Conversational Bot

A modular, secure, and high-performance conversational AI agent with strict role/user isolation, semantic fastpath, and pluggable LLM/ASR modules.

## Features
- Strict, on-point answers with no deviation
- Role/user isolation: no data leakage between users or roles
- Semantic fastpath for instant FAQ/cache answers
- Modular LLM/ASR: swap local or API-based models
- Fast, session-based context management
- Temporary React chat frontend
- Node.js backend API

## Setup

### Backend
```
cd backend
npm install
node src/api/index.js
```

### Frontend
```
cd frontend
npm install
npm run dev
```

## Documentation
- [Architecture](docs/architecture.md)
- [API Reference](docs/api.md)

## Quickstart
1. Start the backend server (default: port 3001)
2. Start the frontend (default: port 5173)
3. Open the frontend in your browser, enter a user ID and role, start a session, and chat!

---

For more details, see the docs folder.
