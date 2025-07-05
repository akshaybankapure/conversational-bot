const fetch = require('node-fetch');
const pseudoCampaigns = require('../faq/PseudoDb');

// Helper: get embedding from HuggingFace Inference API (sentence-transformers/all-MiniLM-L6-v2)
async function getEmbedding(text) {
  const HF_API_TOKEN = process.env.HF_API_TOKEN;
  const response = await fetch('https://api-inference.huggingface.co/embeddings/sentence-transformers/all-MiniLM-L6-v2', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HF_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs: text })
  });
  const data = await response.json();
  return data.embedding;
}

// Helper: cosine similarity
function cosineSim(a, b) {
  let dot = 0, aNorm = 0, bNorm = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    aNorm += a[i] * a[i];
    bNorm += b[i] * b[i];
  }
  return dot / (Math.sqrt(aNorm) * Math.sqrt(bNorm));
}

class SemanticSearch {
  constructor() {
    // For demo, no persistent cache
  }

  // options: { tenantId, campaignId }
  async search(query, options = {}) {
    const { tenantId, campaignId } = options;
    const campaign = pseudoCampaigns.find(c => c.tenantId === tenantId && c.campaignId === campaignId);
    if (!campaign || !campaign.faqs || campaign.faqs.length === 0) return null;
    const faqs = campaign.faqs;
    const queryEmbedding = await getEmbedding(query);
    let best = null;
    let bestScore = -1;
    for (const faq of faqs) {
      const faqEmbedding = await getEmbedding(faq.question);
      const score = cosineSim(queryEmbedding, faqEmbedding);
      if (score > bestScore) {
        bestScore = score;
        best = faq;
      }
    }
    if (bestScore > 0.8) {
      return { answer: best.answer, score: bestScore };
    }
    return null;
  }
}

module.exports = SemanticSearch;
