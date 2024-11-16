import axios from 'axios';

const BASE_URL = 'https://www.ndbc.noaa.gov/data/';
const BASE_URL2 = 'http://localhost:5001/buoy/';
const REALTIME_URL = 'realtime2/';
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';



export const fetchBuoyData = async (buoyId) => {
  try {
    const response = await axios.get(`${BASE_URL2}${buoyId}.txt`);
    // Process the data as needed. For now, we'll assume it's text data.
    return response.data;
  } catch (error) {
    console.error("Error fetching buoy data:", error);
    throw error;
  }
};