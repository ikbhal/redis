const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient();

app.use(express.json());
app.use(express.static('public'));

app.post('/api/set', (req, res) => {
  const { key, value } = req.body;
  client.set(key, value);
  res.json({ status: 'success', key, value });
});

app.get('/api/get/:key', (req, res) => {
  const key = req.params.key;
  client.get(key, (err, value) => {
    if (err || value === null) {
      res.status(404).json({ status: 'error', message: 'Key not found' });
    } else {
      res.json({ status: 'success', key, value });
    }
  });
});

const PORT = 3007;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
