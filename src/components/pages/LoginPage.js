import React from 'react';
import {login} from '../../api/apiCalls';
import Input from '../Input';
import {withTranslation} from 'react-i18next';
import { t } from 'i18next';

class Login extends React.Component{
    state={
        username:null,
        password:null,
        pendingApiCall:false,
        errors:{}
    };

    onChangeUsername = event =>{
       this.setState({username:event.target.value});
        
    } 

    onChangeDisplayName = event =>{
        this.setState({displayname:event.target.value});
         
    } 
    
    onChange = event => {
		const {name,value}=event.target; 
		const errors ={...this.state.errors};
		errors[name] = undefined
		if(name === 'password'|| name === 'passwordRepeat'){
			if(name === 'password' && value !== this.state.passwordRepeat){
				errors.passwordRepeat = t("Password Mismatch");
			}else if(name === 'passwordRepeat' && value !== this.state.password){
				errors.passwordRepeat = t("Password Mismatch");
			}else{
				errors.passwordRepeat = undefined;
			}					
		}
        this.setState({[name]:value,errors});
    } 
    
	
    onClickLogin = event => {
    	event.preventDefault();
    	const {username,password}=this.state;
    	const creds = {username,password};//const creds= {username:username,password:paswword};
    	login(creds);
    }
    
    render(){
    	const {pendingApiCall,errors} = this.state;
    	const {username,password} = errors;
        return(
        	<div className="container">
	            <form>
	                <h1 className="text-center">{t('Login')}</h1>
					<Input name="username" label={t("Username")} error={username}  onChange={this.onChange} />
					<Input name="password" label={t("Password")} type="password" error={password}  onChange={this.onChange} />
	                <div className="text-center">
	                	<button className="btn btn-primary" onClick={this.onClickLogin} disabled={pendingApiCall}>
	                		{pendingApiCall && <span className="spinner-border spinner-border-sm" ></span> }
	                		{t('Login')}
	                	</button>
	                </div>
	            </form>
            </div>
        )
    } 
} 
    
const LoginWithTranslation = withTranslation()(Login);

export default LoginWithTranslation;