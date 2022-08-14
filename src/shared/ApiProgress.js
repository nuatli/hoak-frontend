import React,{useState,useEffect} from 'react';
import axios from 'axios';

export const useApiProgress = (apiPath) =>{
	const [pendingApiCall,setPendingApiCall] = useState(false);

	let requestInterceptor,responseInterceptor;
	const registerInterceptors = () =>{
		console.log("register")
		requestInterceptor =  axios.interceptors.request.use(
			request => {
				updateApiCallFor(request.url,true);
				return request;
		});

		responseInterceptor = axios.interceptors.response.use(
			response => {
				updateApiCallFor(response.config.url,false);
				return response;
			},error => {
				updateApiCallFor(error.config.url,false);
				throw error;
			});
	};

	const unregisterInterceptors = () =>{
		axios.interceptors.request.eject(requestInterceptor);
		axios.interceptors.response.eject(responseInterceptor);
	} 


	const updateApiCallFor = (url,inProgress,path) => {
		if(url === path){
			setPendingApiCall(inProgress);
		}
	}

	useEffect(() => {

		
		registerInterceptors();
		
		const unmount = ()  =>{
			console.log("unmount")
			unregisterInterceptors();
		} 

		return unmount()
	});

	return pendingApiCall;
}  





