const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Allow frontend to make requests
app.use(express.json()); // Parse JSON bodies

// Simulated business data
const businessData = {
  rating: 4.3,
  reviews: 127,
  headline: "",
};

// Static array of SEO headlines
const headlines = [
  "Discover the Best of [Name] in [Location] This Year!",
  "Why [Name] is [Location]'s Top Choice in 2025",
  "Experience Excellence at [Name] in [Location]",
  "Unlock the Charm of [Name] in [Location] Today",
  "[Name]: Your Go-To Spot in [Location] for 2025",
];

// POST /business-data endpoint
app.post('/business-data', (req, res) => {
  const { name, location } = req.body;
  if (!name || !location) {
    return res.status(400).json({ error: 'Name and location are required' });
  }
  businessData.headline = `Why ${name} is ${location}'s Sweetest Spot in 2025`;
  res.json(businessData);
});

// GET /regenerate-headline endpoint
app.get('/regenerate-headline', (req, res) => {
  const { name, location } = req.query;
  // Select a random headline
  const randomIndex = Math.floor(Math.random() * headlines.length);
  let headline = headlines[randomIndex];
  // Replace placeholders with provided values or defaults
  headline = headline.replace('[Name]', name || 'Your Business');
  headline = headline.replace('[Location]', location || 'Your City');
  res.json({ headline });
});

// Basic route to check server
app.get('/', (req, res) => {
  res.send('GrowthProAI Backend is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});