import axios from "axios";
// set up the base URL for the API
const LOCAL_URL = 'https://Memoire-server.onrender.com';
//const LOCAL_URL = 'http://localhost:3030';
const API_URL = '/api';
const URL = LOCAL_URL + API_URL;


export const fetchAffirmation = async (mood) => {
  try {
    const response = await axios.get(`${URL}/affirmation`, {
      params: { mood }, // Pass the mood as a query parameter to the API
    });

    return response.data.affirmation; // Return only the affirmation text
  } catch (error) {
    console.error("Error fetching affirmation:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};

export default fetchAffirmation;