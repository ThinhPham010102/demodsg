// src/services/apiService.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://sohodms-ids.azurewebsites.net",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export default {
  getToken(params) {
    return apiClient.post("/connect/token", params);
  },
};
