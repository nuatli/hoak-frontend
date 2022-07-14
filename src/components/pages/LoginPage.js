import React,{useState,useEffect} from 'react';
import {login} from '../../api/apiCalls';
import Input from '../Input';
import {useTranslation} from 'react-i18next';
import ButtonWithProgress from '../ButtonWithProgress';
import {withApiProgress} from '../../shared/ApiProgress';
//import {Authentication} from '../../shared/AuthenticationContext';

const Login = (props) =>  {
	
	const [username,setUsername] = useState();
	const [password,setPassword] = useState();
	const [error,setError] = useState();
	
	useEffect(()=> {
		setError(null);
	},[username,password]);

    const onClickLogin = async event => {
    	event.preventDefault()
    	const creds = {username,password};
    	const {push} = props.history;
    	setError(null);
    	try{
    		await props.loginHandler(creds);
    		push('/');
    	}catch(apiError){
    		setError(apiError.response.data.message);
    	}
    	
    }
    
	const {pendingApiCall} = props;
	const {t} = useTranslation;
	const buttonEnabled = username && password;
    return(
    	<div className="container">
            <form>
                <h1 className="text-center">{t('Login')}</h1>
				<Input name="username" label={t("Username")} onChange={(e)=>{setUsername(e.target.value)}} />
				<Input name="password" label={t("Password")} type="password"  onChange={(e)=>{setPassword(e.target.value)}}/>
                {error && 
					<div className="alert alert-danger" >
						{error}
					</div>	
                }
				<ButtonWithProgress onClick={onClickLogin} disabled={!buttonEnabled || pendingApiCall} text={t('Login')} pendingApiCall={pendingApiCall}/>
            </form>
        </div>
    );
    
} 
/* 
const LoginPageWithApiProgress = withApiProgress(Login,"/api/0.0.1/auth");
const LoginWithTranslation = withTranslation()(LoginPageWithApiProgress);
*/

export default withApiProgress(Login,"/api/0.0.1/auth");