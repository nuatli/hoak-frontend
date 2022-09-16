import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap-override.scss';
import './index.css';
import './i18n';
import registerServiceWorker from './registerServiceWorker';
import AppContainer from './container/AppContainer';
import {Provider} from 'react-redux';
import configureStore from './redux/configureStore';



const store = configureStore();

window.store = store;
/*
ReactDOM.render(
		<Provider >
			<LoginPage />
			<LanguageSelector />
		</Provider>
		,document.getElementById("root")
);
*/

if(module.hot){
	console.log("reload")
}


ReactDOM.render(
		<Provider store={store}>
			<AppContainer />
		</Provider>
,document.getElementById("root"));
//ReactDOM.render(<App />,document.getElementById("root"));
registerServiceWorker();
