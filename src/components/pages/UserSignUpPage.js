import React,{useState,useEffect} from 'react';
import {signup} from '../../api/apiCalls';
import Input from '../Input';
import {withTranslation} from 'react-i18next';
import ButtonWithProgress from '../ButtonWithProgress';
import {withApiProgress} from '../../shared/ApiProgress';



const UserSignUpPage = (props) => {
	/*
	const [username,setUsername] = useState();
	const [displayName,setDisplayname] = useState();
	const [password,setPassword] = useState();
	const [passwordRepeat,setPasswordRepeat] = useState();
	*/
	
	const [form,setForm] = useState({
		username:null,
		displayName:null,
		password:null,
		passwordRepeat:null,
	});
	
	const [errors,setErrors] = useState({});
	
   const onChange = event => {
		const {t} = props; 
		const {name,value}=event.target;
		setErrors((previousErrors)=>({...previousErrors,[name]:undefined}));
		setForm((previousForm) => ({...previousForm,[name]:value}));
    } 
   
    const onClickSignUp = async event => {
    	event.preventDefault();
    	const {username,displayName,password} = form;
    	const body = {username,displayName,password};
    	try{
	    	const {history,signupHandler} = props;
	    	const {push} = history;
			const response = await signupHandler(body);
	    	push('/');
    	}catch(error){
			if(error.response.data.validationErrors){
				setErrors(error.response.data.validationErrors);
			}
    	}
	}
	const {t,pendingApiCall} = props;
	const {username:usernameError,displayName:displayNameError,password:passwordError} = errors;

	let passwordRepeatError;
	if(form.password !== form.passwordRepeat){
		passwordRepeatError = t("Password Mismatch");
	}
    return(
    	<div className="container">
            <form>
                <h1 className="text-center">{t('Sign Up')}</h1>
				<Input name="username" label={t("Username")} error={usernameError}  onChange={onChange} />
				<Input name="displayName" label={t("Display Name")} error={displayNameError}  onChange={onChange} />
				<Input name="password" label={t("Password")} type="password" error={passwordError}  onChange={onChange} />
				<Input name="passwordRepeat" label={t("Password Repeat")} type="password" error={passwordRepeatError}  onChange={onChange} />
				<ButtonWithProgress onClick={onClickSignUp} disabled={passwordRepeatError !== undefined || pendingApiCall} text={t('Sign Up')} pendingApiCall={pendingApiCall}/>
            </form>
        </div>
    )
} 
/*
const UserSignupPageWithApiProgressForSignUpRequest = withApiProgress(UserSignUpPage,"/api/0.0.1/users");
const UserSignupPageWithApiProgressForLoginRequest = withApiProgress(UserSignupPageWithApiProgressForSignUpRequest,"/api/0.0.1/auth");
const UserSignupPageWithTranslation = withTranslation()(UserSignupPageWithApiProgressForLoginRequest);
*/
const UserSignupPageWithApiProgressForSignUpRequest = withApiProgress(UserSignUpPage,"/api/0.0.1/users");
const UserSignupPageWithApiProgressForLoginRequest = withApiProgress(UserSignupPageWithApiProgressForSignUpRequest,"/api/0.0.1/auth");
const UserSignupPageWithTranslation = withTranslation()(UserSignupPageWithApiProgressForLoginRequest);

export default UserSignupPageWithTranslation;


