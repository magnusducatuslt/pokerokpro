import axios from 'axios';

const axiosJWT = axios.create();

const token = localStorage.getItem('token')

axiosJWT.interceptors.request.use(async (config) => {
	config.headers.Authorization = `Bearer ${token}`;

	return config;
});


let onError = null;

axiosJWT.interceptors.response.use((response) => {
  return response
}, async function (error) {
  if (error.response.status === 401) {
  	if (onError) onError();
  }
  return Promise.reject(error);
});

export const login = (login, password) => {
    return axios.post('/api/login', {
      login,
      password,
    }).then(response => response.data).then((data) => {
    	localStorage.setItem('token', data.token)
    });
}

export const logout = () => {
	return axios.post('/api/logout').then(() => {
		localStorage.removeItem('token');
	});
}

export const getUser = () => {
	return axiosJWT.get('/api/user').then(response => response.data);
}

export const getLeaderboard = () => {
	return axiosJWT.get('/api/leaderboard').then(response => response.data);
}

export const refreshLeaderboard = () => {
	return axiosJWT.get('/api/leaderboard/refresh').then(response => response.data);
}

export const onLogout = (cb) => {
	onError = cb;
}