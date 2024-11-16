import logo from './logo.svg';
import './App.css';
import React from 'react';
import SpotComparison from './components/SpotComparison';

function App() {
  const sampleBuoyId = 'NAXR1'; // Replace with an actual buoy ID

  return (
    <div>
      <h1>Surf Spot Comparison</h1>
      <SpotComparison buoyId={sampleBuoyId} />
    </div>
  );
}

export default App;