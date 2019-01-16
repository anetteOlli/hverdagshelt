// @flow
import axios from 'axios';

export const setToken = (token: string): void => localStorage.setItem('token', token);
export const getToken = (): string => localStorage.getItem('token') || '';
export const clearToken = (): void => localStorage.removeItem('token');

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

export const postData = (endpoint: string, data: any): any => {
  return axios.post(url + endpoint, data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer' + ' ' + getToken()
    }
  });
};

export const putData = (endpoint: string, data: any): any => {
  return axios.put(url + endpoint, data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer' + ' ' + getToken()
    }
  });
};

export const deleteData = (endpoint: string): any => {
  return axios.delete(url + endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer' + ' ' + getToken()
    }
  });
};

export const signInAxios = (creds: { email: string, password: string }): any => {
  return axios.post(url + 'users/login', creds);
};
