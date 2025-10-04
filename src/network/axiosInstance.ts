import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://fe-hometask-api.qa.vault.tryvault.com',
});

export default axiosInstance;
