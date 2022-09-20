import {LOGIN_SUCCESS,UPDATE_SUCCESS} from '../actions/authActions';
import SecureLS from 'secure-ls';
import {setAuthorizationHeader} from '../api/apiCalls'

const secureLS = new SecureLS();
const defaultState = {
		isLoggedIn:false,
		username:undefined,
		displayName:undefined,
		image:undefined,
		password:undefined
}

let initialState = JSON.parse(JSON.stringify(defaultState));

const getStateFromStorage = () => {
	//const hoaxAuth = localStorage.getItem('hoax-auth');
	const hoaxAuth = secureLS.get('hoax-auth');
	if(hoaxAuth){
		try{
			//initialState = JSON.parse(hoaxAuth)
			initialState = hoaxAuth;
		}catch (e) {

		}
	}
	return initialState;
}



const authReducer = (state = {...getStateFromStorage()},action) => {
	setAuthorizationHeader(getStateFromStorage()); //CurrentUser listede gözükmesin diye
	if(action.type === 'logout-success'){
		return defaultState;
	}else if(action.type === LOGIN_SUCCESS){
		return {...action.payload,isLoggedIn:true}
	}else if(action.type === UPDATE_SUCCESS){
		return {...state,...action.payload}
	}
	return state;
}



export default authReducer;