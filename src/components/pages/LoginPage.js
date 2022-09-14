import React,{useState,useEffect} from 'react';
import {login} from '../../api/apiCalls';
import Input from '../Input';
import {useTranslation} from 'react-i18next';
import ButtonWithProgress from '../ButtonWithProgress';
import {useApiProgress} from '../../shared/ApiProgress';
//import {Authentication} from '../../shared/AuthenticationContext';
import {useDispatch} from 'react-redux'; 
import {loginHandler} from '../../actions/authActions';  

const Login = (props) =>  {
	
	const [username,setUsername] = useState();
	const [password,setPassword] = useState();
	const [error,setError] = useState();

	const {t} = useTranslation();
	const dispatch = useDispatch();  
	
	useEffect(()=> {
		setError(null);
	},[username,password]);

    const onClickLogin = async event => {
    	event.preventDefault();
		const creds = {username,password};
		const { history } = props; 
    	const { push } = history;
    	setError(null);
    	try{
			await dispatch(loginHandler(creds));
    		push('/');
    	}catch(apiError){
    		setError(apiError.response.data.message);
    	}
    	
    }
    
	const pendingApiCall = useApiProgress("post","/api/0.0.1/auth");
	
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
				<ButtonWithProgress onClick={onClickLogin} disabled={!buttonEnabled || pendingApiCall} text={t('Login')} pendingApiCall={pendingApiCall} className="btn btn-primary"/>
            </form>
        </div>
    );
    
} 


export default Login;