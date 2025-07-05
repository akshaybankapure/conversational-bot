// PseudoDb.js: Static test data for sales campaigns

const pseudoCampaigns = [
  // Real estate
  {
    tenantId: 'realestateco',
    campaignId: 'skyline_apartments_june2024',
    product: {
      name: 'Skyline Apartments',
      type: 'real_estate',
      features: ['3BHK', 'Sea view', 'Gym', 'Pool'],
      priceRange: '₹1.2Cr - ₹2.5Cr',
      location: 'Andheri West, Mumbai',
    },
    scripts: {
      coldCall: "Hi, I'm calling from RealEstateCo about our new Skyline Apartments project. Are you interested in premium sea-view apartments in Andheri West?",
      objectionHandling: "I understand your concern about price, but let me share the value you get with Skyline Apartments: sea view, luxury amenities, and a prime location.",
      closing: "Would you like to schedule a site visit or get more details?"
    },
    faqs: [
      { question: "Where is Skyline Apartments located?", answer: "It's in Andheri West, Mumbai." },
      { question: "What amenities are included?", answer: "Gym, pool, clubhouse, and more." },
      { question: "What is the price range?", answer: "₹1.2Cr - ₹2.5Cr depending on the configuration." },
      { question: "Is there a payment plan?", answer: "Yes, we offer flexible payment plans and home loan assistance." },
      { question: "Are site visits available?", answer: "Yes, we can schedule a site visit at your convenience." },
      { question: "Who is the builder?", answer: "Skyline Apartments is developed by RealEstateCo, a reputed builder in Mumbai." },
    ]
  },
  // Insurance
  {
    tenantId: 'insuremax',
    campaignId: 'healthplus_july2024',
    product: {
      name: 'HealthPlus Insurance',
      type: 'insurance',
      features: ['Cashless hospitals', 'No-claim bonus', 'Family cover'],
      priceRange: '₹5,000 - ₹25,000/year',
      location: 'Pan India',
    },
    scripts: {
      coldCall: "Hello, I'm calling from InsureMax about our HealthPlus Insurance plan. Would you like to secure your family with comprehensive health coverage?",
      objectionHandling: "I understand you may already have insurance, but HealthPlus offers unique benefits like cashless hospitals and no-claim bonuses.",
      closing: "Can I send you a brochure or connect you with an advisor for more details?"
    },
    faqs: [
      { question: "What is covered under HealthPlus?", answer: "Hospitalization, surgeries, and critical illnesses are covered." },
      { question: "Is there a waiting period?", answer: "There is a 30-day waiting period for new policies, except for accidents." },
      { question: "How do I claim cashless treatment?", answer: "Show your policy card at any network hospital for cashless admission." },
    ]
  },
  // Automotive
  {
    tenantId: 'autodealer',
    campaignId: 'ev_suv_launch_aug2024',
    product: {
      name: 'EcoDrive EV SUV',
      type: 'automotive',
      features: ['Electric', '400km range', 'Fast charging', 'Panoramic sunroof'],
      priceRange: '₹18L - ₹25L',
      location: 'Available at all AutoDealer showrooms',
    },
    scripts: {
      coldCall: "Hi, this is AutoDealer. We're excited to introduce the new EcoDrive EV SUV. Are you interested in electric vehicles?",
      objectionHandling: "I understand you may have concerns about charging, but EcoDrive offers fast charging and a 400km range on a single charge.",
      closing: "Would you like to book a test drive or get more details?"
    },
    faqs: [
      { question: "What is the range of EcoDrive EV SUV?", answer: "Up to 400km on a single charge." },
      { question: "How long does it take to charge?", answer: "Fast charging can get you to 80% in 40 minutes." },
      { question: "What is the warranty?", answer: "5 years or 1,00,000 km, whichever comes first." },
      { question: "Are there government incentives?", answer: "Yes, government EV incentives are available in most states." },
    ]
  },
  // SaaS
  {
    tenantId: 'cloudsuite',
    campaignId: 'crmpro_sept2024',
    product: {
      name: 'CRMPro',
      type: 'saas',
      features: ['Lead management', 'Email automation', 'Analytics dashboard'],
      priceRange: '$49 - $199/month',
      location: 'Cloud-based',
    },
    scripts: {
      coldCall: "Hi, this is CloudSuite. Are you looking to improve your sales process? CRMPro can help you manage leads and automate outreach.",
      objectionHandling: "I understand you may already have a CRM, but CRMPro offers advanced analytics and seamless integrations.",
      closing: "Would you like a free trial or a demo session?"
    },
    faqs: [
      { question: "What integrations does CRMPro support?", answer: "CRMPro integrates with Gmail, Outlook, Slack, and more." },
      { question: "Is there a free trial?", answer: "Yes, we offer a 14-day free trial with all features enabled." },
      { question: "How secure is my data?", answer: "All data is encrypted in transit and at rest, with regular security audits." },
    ]
  },
  // Education
  {
    tenantId: 'edutech',
    campaignId: 'learnplus_oct2024',
    product: {
      name: 'LearnPlus',
      type: 'education',
      features: ['Live classes', 'Doubt clearing', 'Progress tracking'],
      priceRange: '₹2,000 - ₹10,000/course',
      location: 'Online',
    },
    scripts: {
      coldCall: "Hello, this is EduTech. Are you interested in upskilling? LearnPlus offers live online courses in tech and business.",
      objectionHandling: "I understand you may be busy, but our courses are flexible and self-paced.",
      closing: "Would you like to see our course catalog or get a free counseling session?"
    },
    faqs: [
      { question: "What subjects are available?", answer: "We offer courses in programming, data science, business, and more." },
      { question: "Are classes live or recorded?", answer: "We offer both live and recorded classes for maximum flexibility." },
      { question: "Is there a certificate?", answer: "Yes, you receive a certificate upon course completion." },
    ]
  },
];

module.exports = pseudoCampaigns;
