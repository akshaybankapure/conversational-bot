import React, { useState } from 'react';
import './App.css';

const roles = ['admin', 'agent', 'campaign_manager'];

function App() {
  // User management
  const [mode, setMode] = useState('login'); // login | user | admin
  const [userId, setUserId] = useState('');
  const [tenantId, setTenantId] = useState('');
  const [role, setRole] = useState(roles[1]);
  const [campaignId, setCampaignId] = useState('');
  const [sessionId, setSessionId] = useState('');

  // Chat state
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  // Admin FAQ management
  const [faqs, setFaqs] = useState([]);
  const [faqForm, setFaqForm] = useState({ question: '', answer: '', campaignId: '' });
  const [editingFaq, setEditingFaq] = useState(null);

  // Handle login
  const handleLogin = () => {
    if (!userId || !tenantId || !role) return alert('Fill all fields');
    if (role === 'admin') {
      setMode('admin');
      fetchFaqs();
    } else {
      setMode('user');
      startSession();
    }
  };

  // Start chat session
  const startSession = async () => {
    const res = await fetch('http://localhost:3001/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: tenantId, role })
    });
    const data = await res.json();
    setSessionId(data.sessionId);
    setChat([]);
  };

  // Chat send
  const sendMessage = async () => {
    if (!message || !sessionId) return;
    setLoading(true);
    setChat((prev) => [...prev, { from: 'user', text: message }]);
    setMessage('');
    const res = await fetch('http://localhost:3001/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: tenantId, role, message, sessionId, campaignId })
    });
    const data = await res.json();
    setChat((prev) => [...prev, { from: 'bot', text: data.reply }]);
    setLoading(false);
  };

  // Admin: fetch FAQs
  const fetchFaqs = async () => {
    if (!tenantId || !role) return;
    const params = new URLSearchParams({ tenantId, roleId: role, campaignId });
    const res = await fetch(`http://localhost:3001/faq?${params.toString()}`);
    const data = await res.json();
    setFaqs(data);
  };

  // Admin: add or update FAQ
  const handleFaqSubmit = async (e) => {
    e.preventDefault();
    if (!faqForm.question || !faqForm.answer) return;
    if (editingFaq) {
      // Update
      await fetch(`http://localhost:3001/faq/${editingFaq.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...faqForm, tenantId, roleId: role })
      });
    } else {
      // Add
      await fetch('http://localhost:3001/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...faqForm, tenantId, roleId: role })
      });
    }
    setFaqForm({ question: '', answer: '', campaignId: '' });
    setEditingFaq(null);
    fetchFaqs();
  };

  // Admin: edit FAQ
  const handleEditFaq = (faq) => {
    setEditingFaq(faq);
    setFaqForm({ question: faq.question, answer: faq.answer, campaignId: faq.campaignId || '' });
  };

  // Admin: delete FAQ
  const handleDeleteFaq = async (id) => {
    await fetch(`http://localhost:3001/faq/${id}`, { method: 'DELETE' });
    fetchFaqs();
  };

  // UI
  if (mode === 'login') {
    return (
      <div className="chat-container">
        <h2>Login</h2>
        <div className="session-controls">
          <input type="text" placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} />
          <input type="text" placeholder="Tenant ID" value={tenantId} onChange={e => setTenantId(e.target.value)} />
          <select value={role} onChange={e => setRole(e.target.value)}>
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <input type="text" placeholder="Campaign ID (optional)" value={campaignId} onChange={e => setCampaignId(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
  }

  if (mode === 'admin') {
    return (
      <div className="chat-container">
        <h2>Admin FAQ Management</h2>
        <div className="session-controls">
          <span>Tenant: <b>{tenantId}</b></span>
          <span>Role: <b>{role}</b></span>
          <span>Campaign: <b>{campaignId || '-'}</b></span>
          <button onClick={() => setMode('login')}>Logout</button>
        </div>
        <form className="faq-form" onSubmit={handleFaqSubmit}>
          <input type="text" placeholder="Question" value={faqForm.question} onChange={e => setFaqForm(f => ({ ...f, question: e.target.value }))} />
          <input type="text" placeholder="Answer" value={faqForm.answer} onChange={e => setFaqForm(f => ({ ...f, answer: e.target.value }))} />
          <input type="text" placeholder="Campaign ID (optional)" value={faqForm.campaignId} onChange={e => setFaqForm(f => ({ ...f, campaignId: e.target.value }))} />
          <button type="submit">{editingFaq ? 'Update' : 'Add'} FAQ</button>
          {editingFaq && <button type="button" onClick={() => { setEditingFaq(null); setFaqForm({ question: '', answer: '', campaignId: '' }); }}>Cancel</button>}
        </form>
        <div className="faq-list">
          <h4>FAQs</h4>
          {faqs.length === 0 && <div>No FAQs found.</div>}
          {faqs.map(faq => (
            <div key={faq.id} className="faq-item">
              <b>Q:</b> {faq.question}<br />
              <b>A:</b> {faq.answer}<br />
              {faq.campaignId && <span><b>Campaign:</b> {faq.campaignId}</span>}
              <div>
                <button onClick={() => handleEditFaq(faq)}>Edit</button>
                <button onClick={() => handleDeleteFaq(faq.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // User chat UI
  return (
    <div className="chat-container">
      <h2>Conversational Bot (User)</h2>
      <div className="session-controls">
        <span>Tenant: <b>{tenantId}</b></span>
        <span>Role: <b>{role}</b></span>
        <span>Campaign: <b>{campaignId || '-'}</b></span>
        <button onClick={() => setMode('login')}>Logout</button>
      </div>
      <div className="chat-history">
        {chat.map((msg, idx) => (
          <div key={idx} className={msg.from === 'user' ? 'user-msg' : 'bot-msg'}>
            <b>{msg.from === 'user' ? 'You' : 'Bot'}:</b> {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          disabled={!sessionId || loading}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} disabled={!message || !sessionId || loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

export default App;
