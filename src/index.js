import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import UserSignUpPage from './components/UserSignUpPage';
//import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(<Provider ><UserSignUpPage /></Provider>,document.getElementById("root"));
registerServiceWorker();
