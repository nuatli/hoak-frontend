import React from 'react';
import {login} from '../../api/apiCalls';
import Input from '../Input';
import {withTranslation} from 'react-i18next';
import { t } from 'i18next';
import axios from 'axios';
import ButtonWithProgress from '../ButtonWithProgress';

class Login extends React.Component{
    state={
        username:null,
        password:null,
        pendingApiCall:false,
        errors:null
    };
    
    componentDidMount(){
    	console.log('Login Page add to Screen');
    	axios.interceptors.request.use(request => {
    		this.setState({pendingApiCall:true});
    		return request;
    	});
    	
    	axios.interceptors.response.use((response) => {
				this.setState({pendingApiCall:false});
				return response;
    		},(error) => {
				this.setState({pendingApiCall:false});
				throw error;
    		});
    	
    }

    onChangeUsername = event =>{
       this.setState({username:event.target.value});
        
    } 

    onChangeDisplayName = event =>{
        this.setState({displayname:event.target.value});
         
    } 
    
    onChange = event => {
		const {name,value}=event.target; 
        this.setState({[name]:value,errors:null});
    } 
    
	
    onClickLogin = async event => {
    	event.preventDefault();
    	const {username,password}=this.state;
    	const creds = {username,password};//const creds= {username:username,password:paswword};
    	this.setState({errors:null});
    	try{
    		await login(creds);
    	}catch(apiError){
    		this.setState({errors:apiError.response.data.message});
    	}
    	
    }
    
    render(){
    	const {errors,username,password,pendingApiCall} = this.state;
    	const buttonEnabled = username && password;
    	console.log(pendingApiCall)
        return(
        	<div className="container">
	            <form>
	                <h1 className="text-center">{t('Login')}</h1>
					<Input name="username" label={t("Username")}   onChange={this.onChange} />
					<Input name="password" label={t("Password")} type="password" onChange={this.onChange} />
	                {errors && 
						<div className="alert alert-danger" >
							{errors}
						</div>	
	                }
					<ButtonWithProgress onClick={this.onClickLogin} disabled={!buttonEnabled || pendingApiCall} text={t('Login')} pendingApiCall={pendingApiCall}/>
	            </form>
            </div>
        )
    } 
} 
    
const LoginWithTranslation = withTranslation()(Login);

export default LoginWithTranslation;