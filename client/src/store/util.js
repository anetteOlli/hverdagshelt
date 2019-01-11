// @flow
import axios from 'axios';

export const setToken = (token: string) => localStorage.setItem('token', token);
export const getToken = (): string => localStorage.getItem('token') || '';
export const clearToken = () => localStorage.removeItem('token');

const url: string = '';

export const getData = (endpoint: string) => {
  return axios.get(url + endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer' + ' ' + getToken()
    }
  });
};

export const postData = (endpoint: string, data: JSON) => {
  return axios.post(url + endpoint, data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer' + ' ' + getToken()
    }
  });
};

export const putData = (endpoint: string, data: JSON) => {
  return axios.put(url + endpoint, data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer' + ' ' + getToken()
    }
  });
};

export const deleteData = (endpoint: string) => {
  return axios.delete(url + endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer' + ' ' + getToken()
    }
  });
};

export const validateEmail = (email: string) => {
  return axios.post(url + 'users/validate-email', email);
};

export const signInAxios = (creds: { email: string, password: string }) => {
  return axios.post(url + 'users/login', creds);
};
