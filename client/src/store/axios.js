// @flow
import axios from 'axios';

/**
 * @fileOverview Handles axios connection with the backend and storing jwt in the localstorage.
 */

/**
 * Stores the token in localstorage.
 * @param token The selected token.
 */
export const setToken = (token: string): void => localStorage.setItem('token', token);
/**
 * Gets the token from the localstorage.
 * @returns {*|string}
 */
export const getToken = (): string => localStorage.getItem('token') || '';
/**
 * Removes the token from the localstorage.
 */
export const clearToken = (): void => localStorage.removeItem('token');

const url: string = '';

/**
 * Sends a axios get request to the backend
 * @param endpoint The selected endpoint.
 * @returns {*}
 */
export const getData = (endpoint: string): any => {
  return axios.get(url + endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer' + ' ' + getToken()
    }
  });
};

/**
 * Sends a axios post request to the backend
 * @param endpoint The selected endpoint.
 * @param data The data to put in the body.
 * @param media If true change the content-type to send media files.
 * @returns {*}
 */
export const postData = (endpoint: string, data: any, media: boolean = false): any => {
  return axios.post(url + endpoint, data, {
    headers: {
      'Content-Type': media ? 'multipart/form-data' : 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer' + ' ' + getToken()
    }
  });
};
/**
 * Sends a axios patch request to the backend
 * @param endpoint The selected endpoint.
 * @param data The data to put in the body.
 * @param media If true change the content-type to send media files.
 * @returns {T<this>|void|Promise<AxiosXHR<*, *>>|AxiosPromise<any>}
 */
export const patchData = (endpoint: string, data: any, media: boolean = false): any => {
  return axios.patch(url + endpoint, data, {
    headers: {
      'Content-Type': media ? 'multipart/form-data' : 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer' + ' ' + getToken()
    }
  });
};
/**
 * Sends a axios delete request to the backend
 * @param endpoint The selected endpoint.
 * @returns {*}
 */
export const deleteData = (endpoint: string): any => {
  return axios.delete(url + endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer' + ' ' + getToken()
    }
  });
};
