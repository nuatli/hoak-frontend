import {createStore,applyMiddleware} from 'redux';
import mainReducer from '../reducers';
import thunk from 'redux-thunk';
import SecureLS from 'secure-ls';
import {setAuthorizationHeader} from '../api/apiCalls'


const secureLS = new SecureLS();



const store = createStore(mainReducer,applyMiddleware(thunk));




store.subscribe(() => {
	secureLS.set('hoax-auth',store.getState().authReducer)
	//console.log("store.getState() :",store.getState())
	setAuthorizationHeader(store.getState().authReducer)
	//localStorage.setItem('hoax-auth', JSON.stringify(store.getState().authReducer));
});

export default function (){
    return store;
}