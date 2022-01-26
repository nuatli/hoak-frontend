import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap-override.scss';
import './index.css';
import './i18n';
import registerServiceWorker from './registerServiceWorker';
import App from './container/App';
import {Provider} from 'react-redux';
import configureStore from './redux/configureStore';






const store = configureStore();

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
		<Provider store={store}>
			<App />
		</Provider>
,document.getElementById("root"));
//ReactDOM.render(<App />,document.getElementById("root"));
registerServiceWorker();
