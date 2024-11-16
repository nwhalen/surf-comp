import axios from 'axios';

const LOCAL_API_URL = 'http://localhost:5001/buoy';

export const fetchBuoyData = async (buoyIds) => {
  try {
    // Send a GET request with query parameters
    const response = await axios.get(`${LOCAL_API_URL}?ids=${buoyIds}`);
    return response.data; // Return the server's response
  } catch (error) {
    console.error('Error fetching buoy data:', error);
    throw error;
  }
};
