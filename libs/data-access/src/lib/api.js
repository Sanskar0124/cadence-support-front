// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ENV } from '@cadence-support/environments';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';

export const AuthorizedApi = axios.create({
	baseURL: ENV.BACKEND,
	headers: {
		Authorization: `Bearer ${
			JSON.parse(localStorage.getItem("userInfo"))?.userInfo?.ringover_tokens?.id_token
		}`,
	},
});

AuthorizedApi.interceptors.request.use(config => {
	// Modify the request config
	config.headers.Authorization = `Bearer ${
		JSON.parse(localStorage.getItem("userInfo"))?.userInfo?.ringover_tokens?.id_token
	}`;
	return config;
});

export const PublicApi = axios.create({
  baseURL: ENV.BACKEND,
  //   headers: {
  //     'Content-type': 'application/json',
  //   },
});

export const CadenceAuthorizedApi = axios.create({
  baseURL: ENV.CADENCE_BACKEND,
  headers: {
    Authorization: `Bearer ${
      JSON.parse(localStorage.getItem('userInfo'))?.userInfo?.ringover_tokens
        ?.id_token
    }`,
    // 'Content-type': 'application/json',
  },
});
CadenceAuthorizedApi.interceptors.request.use((config) => {
  // Modify the request config
  config.headers.Authorization = `Bearer ${
    JSON.parse(localStorage.getItem('userInfo'))?.userInfo?.ringover_tokens
      ?.id_token
  }`;
  return config;
});
