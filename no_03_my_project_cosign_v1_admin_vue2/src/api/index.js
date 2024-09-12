import axios from 'axios';
import { API_URL } from '@/core/apiUrl';

function createAxios(url) {
  let baseUrl = `${API_URL}/`;
  if (url) baseUrl =  `${API_URL}/${url}`;

  return axios.create({
    baseURL: baseUrl,
    // baseURL: `https://manager.cosign.cc/${url}`,
  })
}

export const empty = createAxios();
export const help = createAxios('help');
export const login = createAxios('api');
export const contents = createAxios('contents');
export const sign = createAxios('sign');
export const version = createAxios('versioning');