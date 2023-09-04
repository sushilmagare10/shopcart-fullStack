import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Function to get the current token from local storage
const getToken = () => {
  const authState = JSON.parse(localStorage.getItem("persist:root"));
  const authData = JSON.parse(authState && authState.auth);
  return authData && authData.currentUser && authData.currentUser.token;
};

// Function to update the 'Authorization' header with the current token
const updateAuthHeader = (config) => {
  const TOKEN = getToken();
  if (TOKEN) {
    config.headers["Authorization"] = `Bearer ${TOKEN}`;
  }
  return config;
};

// Create 'adminRequest' instance with 'Authorization' header
export const adminRequest = axios.create({
  baseURL: BASE_URL,
});

// Add an Axios interceptor to update 'Authorization' header on token change for both publicRequest and adminRequest
const requestInterceptors = (request) => {
  const updatedRequest = { ...request };
  updateAuthHeader(updatedRequest);
  return updatedRequest;
};

adminRequest.interceptors.request.use(requestInterceptors);
