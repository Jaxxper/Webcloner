const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/clone', async (req, res) => {
  const { voiceId, text } = req.body;

  try {
    const response = await axios.post(
      'https://api.play.ht/api/v2/tts',
      {
        voice: voiceId,
        content: [text],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PLAYHT_API_KEY}`,
          'X-User-ID': process.env.PLAYHT_USER_ID,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({ url: response.data.audioUrl });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate audio' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
