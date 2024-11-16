const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 5001;

app.use(cors());

// Helper function to fetch and parse buoy data
const fetchBuoyData = async (buoyId) => {
  const url = `https://www.ndbc.noaa.gov/data/realtime2/${buoyId}.txt`; // Add .txt here
  console.log(`Fetching data from URL: ${url}`);

  try {
    const response = await axios.get(url);
    const rawData = response.data;

    // Split the data into lines and filter out empty lines
    const lines = rawData.split('\n').filter(line => line.trim() !== '');

    // Extract labels, units, and data rows
    const labels = lines[0].split(/\s+/);
    const units = lines[1].split(/\s+/);
    const dataRows = lines.slice(2); // Data starts from the 3rd line

    // Define the labels to include
    const includedLabels = ['YY', 'MM', 'DD', 'hh', 'mm', 'WDIR', 'WSPD', 'WVHT', 'DPD', 'APD', 'ATMP', 'WTMP'];

    // Find the indices of the included labels
    const includedIndices = labels.map((label, index) => (includedLabels.includes(label) ? index : -1)).filter(index => index >= 0);

    // Ensure that we're getting the labels and units in the correct order
    const filteredLabels = includedIndices.map(index => labels[index]);
    const filteredUnits = includedIndices.map(index => units[index]);

    // Parse each data row into an object containing only the desired fields
    const parsedData = dataRows.map(row => {
      const values = row.split(/\s+/);
      return includedIndices.reduce((obj, index, i) => {
        obj[filteredLabels[i]] = values[index] !== '--' ? values[index] : null; // Replace '--' with null
        return obj;
      }, {});
    });

    return parsedData;
  } catch (error) {
    if (error.response) {
      console.error(`Error response from NOAA API for ${buoyId}:`, error.response.status, error.response.statusText);
    } else if (error.request) {
      console.error(`No response from NOAA API for ${buoyId}:`, error.request);
    } else {
      console.error(`Axios error while fetching ${buoyId}:`, error.message);
    }
    throw error;
  }
};

app.get('/buoy', async (req, res) => {
  // Get buoy IDs from query parameters (e.g., /buoys?ids=NAXR1,44097)
  const buoyIds = req.query.ids ? req.query.ids.split(',') : [];

  try {
    const allData = [];

    // Fetch and combine data from each buoy
    for (const buoyId of buoyIds) {
      const buoyData = await fetchBuoyData(buoyId);
      allData.push(...buoyData); // Combine data from all buoys
    }

    // Sort the combined data by YY, MM, DD, hh, mm (in descending order)
    const sortedData = allData.sort((a, b) => {
      const dateA = new Date(`${a['YY']}-${a['MM']}-${a['DD']}T${a['hh']}:${a['mm']}:00`);
      const dateB = new Date(`${b['YY']}-${b['MM']}-${b['DD']}T${b['hh']}:${b['mm']}:00`);
      return dateB - dateA; // Descending order (latest first)
    });

    // Get the most recent 3 entries
    const latestData = sortedData.slice(0, 3);

    // Return the combined and sorted data
    res.json({ data: latestData });
  } catch (error) {
    console.error('Error fetching buoy data:', error.message);
    res.status(500).send('Error fetching buoy data');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running and listening on http://localhost:${PORT}`);
});
