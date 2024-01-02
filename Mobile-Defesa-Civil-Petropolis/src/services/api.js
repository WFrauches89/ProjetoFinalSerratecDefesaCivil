import axios from 'axios';

const api = axios.create({
  baseURL: 'http://35.184.203.56:8017/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

export default api;
