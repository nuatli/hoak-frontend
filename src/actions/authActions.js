import {login,signup,logout} from '../api/apiCalls';


export const logoutSuccess = () => {
	return async function(dispatch){
		try{
			const response = await logout();
		}catch(error){
			
		}
		dispatch({
			type:'logout-success'
		})
	}
}

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const loginSuccessAction = data => {
	return{type:LOGIN_SUCCESS,payload:data};
}

export const UPDATE_SUCCESS = "UPDATE_SUCCESS";
export const updateSuccessAction = data => {
	return{type:UPDATE_SUCCESS,payload:data};
}


export function loginHandler(credentials){
	return async function(dispatch){
		const response = await login(credentials);
		const authState = {
			...response.data.user,
			password:credentials.password,
			token:response.data.token
		};
		dispatch(loginSuccessAction(authState));
		return response;
	}
}

export function signupHandler(user){
	return async function(dispatch){
		const response = await signup(user);
		await dispatch(loginHandler(user));
		return response;
	}
}