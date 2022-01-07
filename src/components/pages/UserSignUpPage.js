import React from 'react';
import {signup} from '../../api/apiCalls';
import Input from '../Input';
import {withTranslation} from 'react-i18next';
import ButtonWithProgress from '../ButtonWithProgress';
import {withApiProgress} from '../../shared/ApiProgress';



class UserSignUpPage extends React.Component{
    state={
        username:null,
        displayName:null,
        password:null,
        passwordRepeat:null,
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
    onClickSignUp = async event => {
    	event.preventDefault();
    	const {username,displayName,password} =this.state;
    	const body = {username,displayName,password};
    	
    	try{
			const response = await signup(body)   
    	}catch(error){
			if(error.response.data.validationErrors){
				this.setState({errors:error.response.data.validationErrors});
			}
    	}
	}
	
    render(){
    	const {t,pendingApiCall} = this.props;
    	const {errors} = this.state;
    	const {username,displayName,password,passwordRepeat} = errors;
        return(
        	<div className="container">
	            <form>
	                <h1 className="text-center">{this.props.t('Sign Up')}</h1>
					<Input name="username" label={t("Username")} error={username}  onChange={this.onChange} />
					<Input name="displayName" label={t("Display Name")} error={displayName}  onChange={this.onChange} />
					<Input name="password" label={t("Password")} type="password" error={password}  onChange={this.onChange} />
					<Input name="passwordRepeat" label={t("Password Repeat")} type="password" error={passwordRepeat}  onChange={this.onChange} />
					<ButtonWithProgress onClick={this.onClickSignUp} disabled={passwordRepeat !== undefined || pendingApiCall} text={t('Sign Up')} pendingApiCall={pendingApiCall}/>
	            </form>
            </div>
        )
    } 
} 

const UserSignupPageWithApiProgress = withApiProgress(UserSignUpPage,"/api/0.0.1/users");
const UserSignupPageWithTranslation = withTranslation()(UserSignupPageWithApiProgress);


export default UserSignupPageWithTranslation;


