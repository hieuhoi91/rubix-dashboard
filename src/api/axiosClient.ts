import axios, { AxiosHeaders } from 'axios';
import { getSession } from 'next-auth/react';

import { BASE_URL_API } from '@/constant';
const axiosClient = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  async (request) => {
    const session: any = await getSession();

    if (session) {
      (request.headers as AxiosHeaders).set(
        'Authorization',
        `Bearer ${session.token.user.accessToken}`
      );
    } else if (axios.defaults.headers.common.Authorization && request.headers) {
      (request.headers as AxiosHeaders).set(
        'Authorization',
        axios.defaults.headers.common.Authorization
      );
    }
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.request.use(
  (config) => {
    if (config.headers) {
      config.headers['Accept-Language'] = 'en'; // vn - en
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
