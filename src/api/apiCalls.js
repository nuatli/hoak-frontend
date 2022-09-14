import axios from 'axios';

export const signup = body => {
	return axios.post('/api/0.0.1/users',body); 
};

export const changeLanguage = language =>{
	axios.defaults.headers['accept-language'] = language; 
};

export const login = creds => {
	return axios.post('/api/0.0.1/auth',{},{auth:creds});
	//return axios.post('/api/0.0.1/auth',{});
};


export const getUsers = ()  =>{
	//return axios.get('/api/0.0.1/users');
	return axios.get('/api/0.0.1/usersWithPage');
} 

export const getUsersWithPage = (page = 0,size=10)  =>{
	return axios.get(`/api/0.0.1/usersWithPage?page=${page}&size=${size}`);
} 

export const setAuthorizationHeader = ({username,password,isLoggedIn}) => {
	//console.log("isloggedIn : ",isLoggedIn)
	if(isLoggedIn){
		const authorizationHeaderValue = `Basic ${btoa(username+':'+password)}` ;
		axios.defaults.headers['Authorization'] = authorizationHeaderValue;
	}else{
		delete axios.defaults.headers['Authorization'];
	}

}


export const getUser = username => {
	return axios.get(`/api/0.0.1/users/${username}`);
}

export const updateUser = (username,body) => {
	return axios.put(`/api/0.0.1/users/${username}`,body);
}
