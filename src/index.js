import React from 'react';
import ReactDOM from 'react-dom';
//import {Provider} from 'react-redux';
import './bootstrap-override.scss';
import './index.css';
//import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import './i18n';

import App from './container/App';
import AuthenticationContext from './shared/AuthenticationContext';

/*
ReactDOM.render(
		<Provider >
			<LoginPage />
			<LanguageSelector />
		</Provider>
		,document.getElementById("root")
);
*/
ReactDOM.render(<AuthenticationContext><App /></AuthenticationContext>,document.getElementById("root"));
registerServiceWorker();
