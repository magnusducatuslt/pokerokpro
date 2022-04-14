import axios from 'axios';

const axiosJWT = axios.create();



axiosJWT.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token')

	config.headers.Authorization = `Bearer ${token}`;

	return config;
});


let onError = null;

axiosJWT.interceptors.response.use((response) => {
  return response
}, async function (error) {
  if (error.response.status === 403 || error.response.status === 401) {
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

const nickNames = ['dima', 'urban', 'guest', 'datuk'];

const users = [
  {
    position: 1,
    nickname: 'КРАШ KaRaTeL YT',
    score: 123123123123,
    winCount: 99990,      
  },
  {
    position: 2,
    nickname: 'Dima',
    score: 123123123,
    winCount: 50850,      
  },
  {
    position: 3,
    nickname: 'gonzalodelakry',
    score: 616123123,
    winCount: 22850,      
  }
];

for(var i = 4; i <= 150; i++) {
  users.push({
    position: i,
    nickname: nickNames[i % nickNames.length] + i,
    score: 100000 - (2000 + i * 100),
    winCount: 400 - i*3,  
  })
}

export const getLeaderboard = (params) => {
	// return axiosJWT.get('/api/leaderboard').then(response => response.data);

  console.log('params ', params);

  return new Promise((resolve) => {
    setTimeout(() => {
      let items = [...users];
      if (params.search) {
        items = items.filter((item) => new RegExp(params.search, "gi").test(item.nickname))
      }
      const total = items.length;
      items = items.slice((params.page - 1) * params.pageSize , params.page * params.pageSize);
      resolve({
        items,
        total,
        date: new Date().getTime()
      })
    }, 1000);

  })
}

export const refreshLeaderboard = () => {
	return axiosJWT.get('/api/leaderboard/refresh').then(response => response.data);
}

export const onLogout = (cb) => {
	onError = cb;
}