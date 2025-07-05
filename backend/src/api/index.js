const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Module imports
const SmartRouter = require('../router/smartRouter');
const Cache = require('../modules/cache/cache');
const SemanticSearch = require('../modules/semantic/semanticSearch');
const SessionManager = require('../modules/session/sessionManager');
const LLMBase = require('../modules/llm/LLMBase');
const FAQManager = require('../modules/faq/faqManager');

// Initialize modules
const smartRouter = new SmartRouter();
const cache = new Cache();
const semanticSearch = new SemanticSearch();
const sessionManager = new SessionManager();
const llm = new LLMBase(); // Replace with actual implementation later
const faqManager = new FAQManager();

// Placeholder chat endpoint
app.post('/chat', async (req, res) => {
  const { userId, message, sessionId, campaignId } = req.body;
  let session = sessionManager.getSession(sessionId);
  if (!session) {
    return res.status(400).json({ error: 'Invalid session' });
  }
  const tenantId = session.userId; // For demo, assume userId is tenantId; adjust as needed
  // 1. Exact FAQ match
  const faqs = faqManager.getFAQs({ tenantId, campaignId });
  const faqMatch = faqs.find(f => f.question.toLowerCase() === message.toLowerCase());
  if (faqMatch) {
    return res.json({ reply: faqMatch.answer });
  }
  // 2. Semantic search
  const semanticResult = await semanticSearch.search(message, { tenantId, campaignId });
  if (semanticResult) {
    return res.json({ reply: semanticResult.answer, semanticScore: semanticResult.score });
  }
  // 3. Fallback: use campaign scripts or product info
  const scripts = faqManager.getScripts({ tenantId, campaignId });
  const product = faqManager.getProduct({ tenantId, campaignId });
  let reply = scripts.coldCall || `I'm here to help you with ${product.name || 'our product'}!`;
  res.json({ reply });
});

// Placeholder session creation endpoint
app.post('/session', (req, res) => {
  const { userId, role } = req.body;
  const sessionId = sessionManager.createSession(userId, role);
  res.json({ sessionId });
});

// FAQ CRUD endpoints
app.post('/faq', (req, res) => {
  const { tenantId, roleId, campaignId, question, answer } = req.body;
  if (!tenantId || !roleId || !question || !answer) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const faq = faqManager.addFAQ({ tenantId, roleId, campaignId, question, answer });
  res.json(faq);
});

app.get('/faq', (req, res) => {
  const { tenantId, roleId, campaignId } = req.query;
  if (!tenantId || !roleId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const faqs = faqManager.getFAQs({ tenantId, roleId, campaignId });
  res.json(faqs);
});

app.put('/faq/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updates = req.body;
  const updated = faqManager.updateFAQ(id, updates);
  if (!updated) return res.status(404).json({ error: 'FAQ not found' });
  res.json(updated);
});

app.delete('/faq/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const deleted = faqManager.deleteFAQ(id);
  if (!deleted) return res.status(404).json({ error: 'FAQ not found' });
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
