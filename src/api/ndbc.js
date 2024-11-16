import axios from 'axios';

const LOCAL_API_URL = 'http://localhost:5001/buoy';

export const fetchBuoyData = async (buoyIds) => {
  try {
    const allData = []; // Holds the combined data from all buoys
    
    // Loop through each buoyId and fetch its data
    for (const buoyId of buoyIds) {
      const response = await axios.get(`http://localhost:5001/buoy?ids=${buoyId}`);
      const data = response.data.data;  // Assuming the server returns a 'data' field

      // Check if data exists for the buoy
      if (data) {
        const dataWithBuoyId = data.map(entry => ({
          ...entry,    // Retain the current data
          buoyId: buoyId  // Add the buoyId to each entry
        }));

        allData.push(...dataWithBuoyId); // Add the modified data to the allData array
      }
    }

    return allData; // Return the combined data
  } catch (error) {
    console.error("Error fetching buoy data:", error);
    throw error; // Re-throw the error so that it can be caught in the SpotComparison component
  }
};

