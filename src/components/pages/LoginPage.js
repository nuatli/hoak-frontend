import React,{Component} from 'react';
import {login} from '../../api/apiCalls';
import Input from '../Input';
import {withTranslation} from 'react-i18next';
import ButtonWithProgress from '../ButtonWithProgress';
import {withApiProgress} from '../../shared/ApiProgress';
//import {Authentication} from '../../shared/AuthenticationContext';

class Login extends Component {
	
	//static contextType = Authentication; // Sadece class tipinde gecerli
	
    state={
        username:null,
        password:null,
        pendingApiCall:false,
        errors:null
    };


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
    
	/*
    onClickLogin = async event => {
    	event.preventDefault()
    	const {username,password}=this.state;
    	const {onLoginSuccess,history}=this.props;
    	const creds = {username,password};//const creds= {username:username,password:paswword};
    	this.setState({errors:null});
    	try{
    		await login(creds);
    		history.push('/');
    		onLoginSuccess(username);
    	}catch(apiError){
    		this.setState({errors:apiError.response.data.message});
    	}
    	
    }
    */
    onClickLogin = async event => {
    	event.preventDefault()
    	const {username,password}=this.state;
    	const onLoginSuccess = () => {}
    	const creds = {username,password};
    	const {push} = this.props.history;
    	this.setState({errors:null});
    	try{
    		const response = await login(creds);
    		push('/');
    		/*
    		const authState = {
    				username:username,
    				pasword:password,
    				displayName:response.data.displayName;
    				image:response.data.image;
    		}
    		*/
    		const authState = {...response.data,password};
    		onLoginSuccess(authState);
    	}catch(apiError){
    		this.setState({errors:apiError.response.data.message});
    	}
    	
    }
    
    render(){
    	const {t,pendingApiCall} = this.props;
    	const {errors,username,password} = this.state;
    	const buttonEnabled = username && password;
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
    
const LoginPageWithApiProgress = withApiProgress(Login,"/api/0.0.1/auth");
const LoginWithTranslation = withTranslation()(LoginPageWithApiProgress);


export default LoginWithTranslation;