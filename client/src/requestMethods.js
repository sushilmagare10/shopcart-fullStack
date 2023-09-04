import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Retrieve the token from local storage
const authState = JSON.parse(localStorage.getItem("persist:root"));
const authData = JSON.parse(authState && authState.auth);
const TOKEN = authData && authData.currentUser && authData.currentUser.token;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN}` },
});
