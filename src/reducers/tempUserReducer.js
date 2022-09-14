import {UPDATE_TEMP_USER} from '../actions/updateUserActions';

const defaultState = {
		isLoggedIn:false,
		username:undefined,
		displayName:undefined,
		image:undefined,
		password:undefined
}

let initialState = JSON.parse(JSON.stringify(defaultState));





const tempUserReducer = (state = defaultState,action) => {
	if(action.type === 'logout-success'){
		return defaultState;
	}else if(action.type === UPDATE_TEMP_USER){
		return {...action.payload}
	}
	return state;
}



export default tempUserReducer;