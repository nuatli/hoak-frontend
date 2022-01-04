import React from 'react';
import ReactDOM from 'react-dom';
//import {Provider} from 'react-redux';
import './bootstrap-override.scss';
import './index.css';
import UserSignUpPage from './components/pages/UserSignUpPage';
import LoginPage from './components/pages/LoginPage';
import LanguageSelector from './components/LanguageSelector';
//import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import './i18n';

/*
ReactDOM.render(
		<Provider >
			<LoginPage />
			<LanguageSelector />
		</Provider>
		,document.getElementById("root")
);
*/
ReactDOM.render(
		<div>
			<UserSignUpPage />
			<LanguageSelector />
		</div>
		,document.getElementById("root")
);
registerServiceWorker();
