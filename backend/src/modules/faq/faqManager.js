const pseudoCampaigns = require('./PseudoDb');

class FAQManager {
  constructor() {
    this.campaigns = pseudoCampaigns;
  }

  getCampaign({ tenantId, campaignId }) {
    return this.campaigns.find(c => c.tenantId === tenantId && c.campaignId === campaignId);
  }

  getFAQs({ tenantId, campaignId }) {
    const campaign = this.getCampaign({ tenantId, campaignId });
    return campaign ? campaign.faqs : [];
  }

  getScripts({ tenantId, campaignId }) {
    const campaign = this.getCampaign({ tenantId, campaignId });
    return campaign ? campaign.scripts : {};
  }

  getProduct({ tenantId, campaignId }) {
    const campaign = this.getCampaign({ tenantId, campaignId });
    return campaign ? campaign.product : {};
  }
}

module.exports = FAQManager;
