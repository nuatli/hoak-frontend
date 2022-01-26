import React from 'react';
import ApiProgress from '../shared/ApiProgress';
import UserSignUpPage from '../components/pages/UserSignUpPage';
import LoginPage from '../components/pages/LoginPage';
import HomePage from '../components/pages/HomePage';
import UserPage from '../components/pages/UserPage';
import LanguageSelector from '../components/LanguageSelector';
import TopBarContainer from './TopBarContainer';
import {/*BrowserRouter*/HashRouter as Router,Route,Redirect,Switch} from 'react-router-dom'; //BrowserRouter js dosyalarını tekrar yüklüyor backende sorgu atıyor.  HashRouter saklıyor geçiş yapıyor 
//import {Authentication} from '../shared/AuthenticationContext';


class App extends React.Component{
	render(){
		const isLoggedIn = false;
		return (
				<div>
					<Router>
						<TopBarContainer />
						<Switch>
							<Route exact path="/" component={HomePage} />
							{!isLoggedIn && (<Route path="/login" component={LoginPage}/>)}
							<Route path="/signup" component={UserSignUpPage} />
							<Route path="/user/:username" component={UserPage} />
							<Redirect to="/" />
						</Switch>
					</Router>
					<LanguageSelector />
				</div>
		);
	}
}

export default App;
