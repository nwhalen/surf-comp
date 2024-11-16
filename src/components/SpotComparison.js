import React, { useEffect, useState } from 'react';
import { fetchBuoyData } from '../api/ndbc.js';

const SpotComparison = ({ buoyIds }) => {
  const [buoyData, setBuoyData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`Fetching data for buoys: ${buoyIds}`); // Log buoy IDs

        // Split the buoyIds string into an array of individual buoy IDs
        const buoyIdList = buoyIds.split(',');
        console.log('Buoy IDs:', buoyIdList);

        // Fetch data for each buoy and combine the results
        const allData = [];
        for (const buoyId of buoyIdList) {
          const data = await fetchBuoyData(buoyId);
          console.log(`Fetched data for buoy ${buoyId}:`, data); // Log the data received for each buoy
          allData.push(...data.data); // Assuming the server response includes a "data" field
        }

        // Set the combined data to the state
        setBuoyData(allData);
      } catch (err) {
        setError('Failed to fetch buoy data');
        console.error('Error fetching data:', err);
      }
    };

    if (buoyIds) {
      fetchData(); // Only fetch if buoyIds is provided
    }
  }, [buoyIds]); // Re-run effect when buoyIds changes

  return (
    <div>
      <h2>Spot Comparison</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {buoyData.map((entry, index) => (
          <li key={index}>
            {Object.entries(entry).map(([key, value]) => (
              <span key={key}>{key}: {value} </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpotComparison;
