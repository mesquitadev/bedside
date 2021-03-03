import axios from 'axios';
const homol = 'http://104.236.26.23/';
const prod = 'https://sandbox.bedside.com.br/api/v1/';
const api = axios.create({
  baseURL: prod,
});

export default api;
