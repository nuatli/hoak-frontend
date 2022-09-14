import {combineReducers} from 'redux';
import authReducer from '../reducers/authReducer';
import tempUserReducer from '../reducers/tempUserReducer';

export default combineReducers({
	authReducer,
	tempUserReducer
});
