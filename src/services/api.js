import axios from 'axios';

// Base URL for API endpoints
const BASE_URL = 'https://assignment.stage.crafto.app';

// Helper function to get the auth token
const getAuthToken = () => localStorage.getItem('token');

// 1. Login API
export const login = async (username, otp) => {
  const url = `${BASE_URL}/login`;
  const payload = { username, otp };

  try {
    const response = await axios.post(url, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data; 
  } catch (error) {
    throw error.response?.data?.message || 'Login failed!';
  }
};

// 2. Upload Image API
export const uploadImage = async (file) => {
  const url = 'https://crafto.app/crafto/v1.0/media/assignment/upload';
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Uploaded Media URL:', response); 
    return response.data[0].url; // The media URL returned by the API
  } catch (error) {
    console.error('Image Upload Error:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Image upload failed!';
  }
};

// 3. Create Quote API
export const createQuote = async (text, mediaUrl) => {
    const url = `${BASE_URL}/postQuote`;
    const token = getAuthToken();
    const payload = { text, mediaUrl };
  
    try {
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
      console.log('Create Quote Response:', response.data); 
      return response.data;
    } catch (error) {
      console.error('Quote Creation Error:', error.response?.data || error.message);
      throw error.response?.data?.message || 'Quote creation failed!';
    }
  };

// 4. Get Quotes API
export const getQuotes = async (limit = 20, offset = 0) => {
  const url = `${BASE_URL}/getQuotes?limit=${limit}&offset=${offset}`;
  const token = getAuthToken();

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Fetching Quotes Error:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Fetching quotes failed!';
  }
};
