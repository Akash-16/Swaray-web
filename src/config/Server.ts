import axios, { AxiosInstance } from 'axios';

import { HttpStatus } from '../common/enum/statusCode.enum';
import { Errors } from '../constants/errors';
import routes from '../constants/routes';

export const Client: AxiosInstance = axios.create();

Client.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
Client.defaults.withCredentials = true;
Client.defaults.headers.common = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  Authorization:
    localStorage.getItem('usertk') !== null
      ? `Bearer ${localStorage.getItem('usertk')}`
      : sessionStorage.getItem('usertk') !== null
      ? `Bearer ${sessionStorage.getItem('usertk')}`
      : ''
};
Client.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    const {
      response: {
        data: { statusCode, message }
      }
    } = err;
    if (statusCode === HttpStatus.NOT_FOUND || message === Errors.sessionExpired) {
      localStorage.removeItem('usertk');
      sessionStorage.removeItem('usertk');
      localStorage.removeItem('provider');
      localStorage.removeItem('walletconnect');
      window.location.href = `${window.location.origin}${routes.signInPage}`;
    }
    return err;
  }
);
