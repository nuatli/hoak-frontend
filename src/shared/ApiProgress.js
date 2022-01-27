import React from 'react';
import axios from 'axios';

function getDisplayName(WrappedComponent){
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function withApiProgress(WrappedComponent,path){
	return class extends React.Component{
		static displayName = 'ApiProgress('+getDisplayName(WrappedComponent)+')';
		//static displayName = 'ApiProgress(${getDisplayName(WrappedComponent)})';
		
		state = {pendingApiCall:false}
		
	    componentDidMount(){
	    	this.requestInterceptor =  axios.interceptors.request.use(
	    		request => {
	    			this.updateApiCallFor(request.url,true,path);
	    			return request;
	    	});

	    	this.responseInterceptor = axios.interceptors.response.use(
	    		response => {
	    			this.updateApiCallFor(response.config.url,false,path);
					return response;
	    		},error => {
	    			this.updateApiCallFor(error.config.url,false,path);
					throw error;
	    		});
	    }
		
		componentWillUnmount(){
			axios.interceptors.request.eject(this.requestInterceptor);
			axios.interceptors.response.eject(this.responseInterceptor);
		}
		
		updateApiCallFor = (url,inProgress,path) => {
			if(url === path){
				this.setState({pendingApiCall:inProgress});
			}
		}
		
	    render(){
	    	const pendingApiCall = this.state.pendingApiCall || this.props.pendingApiCall;
	    	return <WrappedComponent  {...this.props} pendingApiCall={pendingApiCall} />
	    } 
	}
}



