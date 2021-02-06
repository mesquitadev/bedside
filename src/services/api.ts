import axios from 'axios';
const homol = 'http://104.236.26.23/';
const prod = 'https://subform.bedside.com.br/';
const api = axios.create({
  baseURL: prod,
});

export default api;
