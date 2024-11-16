import React, { useEffect, useState } from 'react';
import { fetchBuoyData } from '../api/ndbc.js';

const SpotComparison = ({ buoyIds }) => {
  const [buoyData, setBuoyData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`Fetching data for buoys: ${buoyIds}`); // Log buoy IDs
        const data = await fetchBuoyData(buoyIds.split(','));  // Ensure buoyIds is split into an array if it's a string
        console.log('Fetched Data:', data); // Log the data received
        setBuoyData(data);  // Set the fetched data directly
      } catch (err) {
        setError('Failed to fetch buoy data');
        console.error('Error fetching data:', err);
      }
    };

    if (buoyIds) {
      fetchData(); // Call fetchData only if buoyIds is provided
    }
  }, [buoyIds]);

  return (
    <div>
      <h2>Spot Comparison</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {buoyData.length > 0 ? (
          buoyData.map((entry, index) => (
            <li key={index}>
              <strong>Buoy ID: {entry.buoyId}</strong> {/* Display Buoy ID */}
              {Object.entries(entry).map(([key, value]) => (
                key !== 'buoyId' && (  // Skip displaying 'buoyId' field in the list
                  <span key={key}>{key}: {value} </span>
                )
              ))}
            </li>
          ))
        ) : (
          <p>No data available</p>
        )}
      </ul>
    </div>
  );
};

export default SpotComparison;
