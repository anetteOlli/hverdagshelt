// @flow
import axios from 'axios';

export const setToken = (token: string): void => localStorage.setItem('token', token);
export const getToken = (): string => localStorage.getItem('token') || '';
export const clearToken = (): void => localStorage.removeItem('token');

const url: string = '';

export const getData = (endpoint: string): any => {
  return axios.get(url + endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer' + ' ' + getToken()
    }
  });
};

export const postData = (endpoint: string, data: any, media: boolean = false): any => {
  return axios.post(url + endpoint, data, {
    headers: {
      'Content-Type': media ? 'multipart/form-data' : 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer' + ' ' + getToken()
    }
  });
};

export const patchData = (endpoint: string, data: any, media: boolean = false): any => {
  return axios.patch(url + endpoint, data, {
    headers: {
      'Content-Type': media ? 'multipart/form-data' : 'application/json',
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
