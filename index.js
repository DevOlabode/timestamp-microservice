const express = require('express');
const app = express();

// Allow CORS for FCC tests
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// Root endpoint
app.get('/', (req, res) => {
  res.send('Timestamp Microservice is running');
});

// Timestamp API endpoint
app.get('/api/:date?', (req, res) => {
  let { date } = req.params;

  // If no date is provided, use current date
  if (!date) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }

  // Check if date is a Unix timestamp (only digits)
  if (/^\d+$/.test(date)) {
    // Convert to integer
    const intDate = parseInt(date);

    // Handle timestamps in milliseconds
    const dateObj = new Date(intDate);

    if (dateObj.toString() === 'Invalid Date') {
      return res.json({ error: 'Invalid Date' });
    }

    return res.json({
      unix: dateObj.getTime(),
      utc: dateObj.toUTCString(),
    });
  }

  // Otherwise, treat as date string
  const dateObj = new Date(date);

  if (dateObj.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  return res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString(),
  });
});

// Listen
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Timestamp Microservice listening on port ${PORT}`);
});
