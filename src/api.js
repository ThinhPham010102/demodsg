import axios from 'axios';

const API_URL = 'http://your-iis-server/api'; // Replace with your IIS server API URL

export default {
  getItems() {
    return axios.get(`${API_URL}/items`);
  },
  getItem(id) {
    return axios.get(`${API_URL}/items/${id}`);
  },
  createItem(data) {
    return axios.post(`${API_URL}/items`, data);
  },
  updateItem(id, data) {
    return axios.put(`${API_URL}/items/${id}`, data);
  },
  deleteItem(id) {
    return axios.delete(`${API_URL}/items/${id}`);
  }
};
