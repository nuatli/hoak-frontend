import React from 'react';
import {signup,changeLanguage} from '../api/apiCalls';
import Input from './Input';
import {withTranslation} from 'react-i18next';
import { t } from 'i18next';


class UserSignUpPage extends React.Component{
    state={
        username:null,
        displayName:null,
        password:null,
        passwordRepeat:null,
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
		const {t} = this.props; 
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
    /*
    onClickSignUp = async event => {
    	event.preventDefault();
    	const {username,displayName,password} =this.state;
    	const body = {username,displayName,password};
    	this.setState({pendingApiCall:true});
    	axios.post('/api/0.0.1/users',body)
    		.then((response) => {
    			this.setState({pendingApiCall:false});
    		}).catch(error => {
    			this.setState({pendingApiCall:false});
    		});
    }
    */
    /*
    onClickSignUp = async event => {
    	event.preventDefault();
    	const {username,displayName,password} =this.state;
    	const body = {username,displayName,password};
    	this.setState({pendingApiCall:true});
    	signup(body)
    		.then((response) => {
    			this.setState({pendingApiCall:false});
    		}).catch(error => {
    			this.setState({pendingApiCall:false});
    		});
    }
    */
    onClickSignUp = async event => {
    	event.preventDefault();
    	const {username,displayName,password} =this.state;
    	const body = {username,displayName,password};
    	this.setState({pendingApiCall:true});
    	
    	try{
			const response = await signup(body)   
    	}catch(error){
			if(error.response.data.validationErrors){
				this.setState({errors:error.response.data.validationErrors});
			}
    	}
    	this.setState({pendingApiCall:false});
	}
	
	onChangeLanguage = language => {
		const {i18n} =this.props;
		i18n.changeLanguage(language); 
		changeLanguage(language);
	} 
    render(){
    	const {pendingApiCall,errors} = this.state;
    	const {username,displayName,password,passwordRepeat} = errors;
        return(
        	<div className="container">
	            <form>
	                <h1 className="text-center">{this.props.t('Sign Up')}</h1>
					<Input name="username" label={t("Username")} error={username}  onChange={this.onChange} />
					<Input name="displayName" label={t("Display Name")} error={displayName}  onChange={this.onChange} />
					<Input name="password" label={t("Password")} type="password" error={password}  onChange={this.onChange} />
					<Input name="passwordRepeat" label={t("Password Repeat")} type="password" error={passwordRepeat}  onChange={this.onChange} />
	                <div className="text-center">
	                	<button className="btn btn-primary" onClick={this.onClickSignUp} disabled={pendingApiCall || passwordRepeat !== undefined }>
	                		{pendingApiCall && <span className="spinner-border spinner-border-sm" ></span> }
	                		{this.props.t('Sign Up')}
	                	</button>
	                </div>
					<div>
						<img src="https://www.countryflags.io/tr/flat/24.png" alt="Turkish Flag" onClick={()=> this.onChangeLanguage('tr')} style={{cursor:'pointer'}} />
						<img src="https://www.countryflags.io/en/flat/24.png" alt="USA flag" onClick={()=> this.onChangeLanguage('en')} style={{cursor:'pointer'}} />
					</div>
	            </form>
            </div>
        )
    } 
} 
    
const UserSignupPageWithTranslation = withTranslation()(UserSignUpPage);

export default UserSignupPageWithTranslation;