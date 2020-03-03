import axios from 'axios';

import configAdapter from '../configs/config';

const httpClient = axios.create();

httpClient.interceptors.response.use(response => response, (error) => {
  const { response: { status }, response } = error;
  if (status === 401) {
    window.location.href = `${configAdapter('com.rooxteam.widgets.logout_idle')}`;
  }
  return Promise.reject(response);
});

httpClient.defaults.timeout = configAdapter('com.rooxteam.webapi.timeout') || 300000;

export default httpClient;
