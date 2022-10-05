import axios from 'axios';

export const signup = body => {
	//console.log("3")
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
	//console.log("1")
	return axios.get(`/api/0.0.1/users/${username}`);
}

export const updateUser = (username,body) => {
	//console.log("2")
	return axios.put(`/api/0.0.1/users/${username}`,body);
}

export const postHoax = hoax => {
	return axios.post(`/api/0.0.1/hoaxes`,hoax);
}

/*
export const getHoaxes = () => {
	return axios.get(`/api/0.0.1/hoaxes`);
}
*/

export const getHoaxes = (username,page = 0) => {
	const path = username ? `/api/0.0.1/users/${username}/hoaxes?page=` : `/api/0.0.1/hoaxes?page=`
	return axios.get(path+page);
}

export const getOldHoaxes = (id,username) => {
	const path = username ? `/api/0.0.1/users/${username}/hoaxes/${id}` : `/api/0.0.1/hoaxes/${id}`;
	return axios.get(path);
}

export const getNewHoaxesCount = (id,username) => {
	const path = username ? `/api/0.0.1/users/${username}/hoaxes/${id}?count=true` : `/api/0.0.1/hoaxes/${id}?count=true`;
	return axios.get(path);
}

export const getNewHoaxes = (id,username) => {
	const path = username ? `/api/0.0.1/users/${username}/hoaxes/${id}?direction=after` : `/api/0.0.1/hoaxes/${id}?direction=after`;
	return axios.get(path);
}

export const postHoaxAttachment = attachment => {
	return axios.post(`/api/0.0.1/hoax-attachments`,attachment);
}

export const deleteHoax = id => {
	return axios.delete(`/api/0.0.1/hoaxes/${id}`);
}