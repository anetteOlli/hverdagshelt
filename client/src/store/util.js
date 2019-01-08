// @flow
import axios from 'axios';

export const setToken = (token: string) => localStorage.setItem('token', token);
export const getToken = (): string => localStorage.getItem('token') || '';
export const clearToken = () => localStorage.removeItem('token');

const url: string = '';

export function fetch(endpoint: string) {
  return axios.get(url + endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer' + ' ' + getToken()
    }
  });
}

export function store(endpoint: string, data: JSON) {
  return axios.post(url + endpoint, data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer' + ' ' + getToken()
    }
  });
}

export function update(endpoint: string, data: JSON) {
  return axios.put(url + endpoint, data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer' + ' ' + getToken()
    }
  });
}

export function destroy(endpoint: string) {
  return axios.delete(url + endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer' + ' ' + getToken()
    }
  });
}
