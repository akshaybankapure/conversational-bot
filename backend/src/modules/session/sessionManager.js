class SessionManager {
  constructor() {
    this.sessions = new Map(); // Simple in-memory session store for now
  }

  createSession(userId, role) {
    const sessionId = `${userId}:${role}:${Date.now()}`;
    this.sessions.set(sessionId, { userId, role, context: [] });
    return sessionId;
  }

  getSession(sessionId) {
    return this.sessions.get(sessionId);
  }

  updateSession(sessionId, context) {
    if (this.sessions.has(sessionId)) {
      this.sessions.get(sessionId).context = context;
    }
  }
}

module.exports = SessionManager;
