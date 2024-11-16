import React from 'react';
import useBuoyData from '../hooks/useBuoyData';

const SpotComparison = ({ buoyId }) => {
  const { data, loading, error } = useBuoyData(buoyId);

  if (loading) return <p>Loading buoy data...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log("Fetched Data:", data); // Log data for testing

  return (
    <div>
      <h2>Buoy Data for Spot {buoyId}</h2>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default SpotComparison;