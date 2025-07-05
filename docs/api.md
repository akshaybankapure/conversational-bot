# Conversational Bot API Documentation

## Endpoints

### POST /session
Create a new session for a user and role.

**Request Body:**
```
{
  "userId": "string",
  "role": "string"
}
```

**Response:**
```
{
  "sessionId": "string"
}
```

---

### POST /chat
Send a message to the bot within a session.

**Request Body:**
```
{
  "userId": "string",
  "role": "string",
  "message": "string",
  "sessionId": "string"
}
```

**Response:**
```
{
  "reply": "string"
}
```

---

### GET /health
Health check endpoint.

**Response:**
```
{
  "status": "ok"
}
```

---

## Notes
- All endpoints require valid session and role information.
- Future endpoints will include FAQ management, cache inspection, and analytics.
- Authentication/session tokens may be required for production deployments.
