import React from 'react';
import SpotComparison from './components/SpotComparison';

function App() {
  const sampleBuoyIds = 'NAXR1,44097'; // Example buoy IDs (as a single string, not split into an array)

  return (
    <div>
      <h1>Surf Spot Comparison</h1>
      <SpotComparison buoyIds={sampleBuoyIds} /> {/* Pass as a string */}
    </div>
  );
}

export default App;
