const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// In-memory storage
let storedData = null;

// Endpoint to receive data
app.post('/submit-data', (req, res) => {
  const payload = req.body;

  if (!payload || Object.keys(payload).length === 0) {
    return res.status(400).json({ error: 'Invalid or empty payload' });
  }

  storedData = payload;

  console.log("Data stored successfully.");
  res.status(200).json({ message: 'Data received and stored' });
});

// Endpoint to fetch stored data
app.get('/fetch-data', (req, res) => {
  if (!storedData) {
    return res.status(404).json({ message: 'No data found' });
  }

  res.status(200).json(storedData);
});

// Health check
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
