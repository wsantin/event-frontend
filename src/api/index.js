import axios from 'axios';
import { HOST_API, JWT_PREFIX } from '../constants/defaultValues';
// import store from '~redux-store/store';
// import { forceLogOut, refreshToken } from '~redux-store/actions/authActions';
// import { isExpired } from '../middlewares/jwt';

const apiClient = axios.create({
  baseURL: `${HOST_API}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    enctype: 'application/json'
  }
});

// add Authorization
apiClient.interceptors.request.use(
  (config) => {
    const token = String(localStorage.getItem('token'));
    if(token){
      config.headers['Authorization'] = JWT_PREFIX + ' ' + token;
      // config.headers['X-App-userId'] = 
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// interceptors
apiClient.interceptors.response.use(
  (response) => {
    // refresh token
    // if (isExpired()) store.dispatch(refreshToken());
    return response.data;
  },
  (error) => {
    const { response } = error;
    if (response?.status === 401 || response?.status === 412) {
      // token expired
    //   store.dispatch(forceLogOut());
      return Promise.reject(response);
    }

    if (response?.status === 403) {
      // Requiere autorizacion de headers
    //   store.dispatch(forceLogOut());
      return Promise.reject(response);
    }
    return Promise.reject(response);
  }
);

//generar interceptors

export default {
  get(url) {
    return apiClient.get(url);
  },
  post(url, params) {
    return apiClient.post(url, params);
  },
  put(url, params) {
    return apiClient.put(url, params);
  },
  delete(url) {
    return apiClient.delete(url);
  }
};
