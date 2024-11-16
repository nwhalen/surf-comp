// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 5001;

app.use(cors());

app.get('/buoy/:id', async (req, res) => {
    const buoyId = req.params.id; // e.g., NAXR1
    const url = `https://www.ndbc.noaa.gov/data/realtime2/${buoyId}`; // used to have .txt at the end
    console.log('Fetching URL:', url);
  
    try {
      const response = await axios.get(url);
      res.send(response.data);
    } catch (error) {
      console.error('Error fetching buoy data:', error);
      res.status(error.response?.status || 500).send(error.response?.data || 'Error fetching buoy data');
    }
  });
  

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
