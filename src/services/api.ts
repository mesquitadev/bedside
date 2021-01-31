import axios from 'axios';

const api = axios.create({
  baseURL: 'http://104.236.26.23/',
});

export default api;
