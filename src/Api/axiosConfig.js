import axios from 'axios';

const Api = () =>
{
  const apiClient = axios.create({
    baseURL: 'https://localhost:7297/api/',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export default Api;
