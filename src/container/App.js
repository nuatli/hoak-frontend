import React from 'react';
import ApiProgress from '../shared/ApiProgress';
import UserSignUpPage from '../components/pages/UserSignUpPage';
import LoginPage from '../components/pages/LoginPage';
import HomePage from '../components/pages/HomePage';
import UserPage from '../components/pages/UserPage';
import LanguageSelector from '../components/LanguageSelector';
import TopBar from '../components/TopBar';
import {/*BrowserRouter*/HashRouter as Router,Route,Redirect,Switch} from 'react-router-dom'; //BrowserRouter js dosyalarını tekrar yüklüyor backende sorgu atıyor.  HashRouter saklıyor geçiş yapıyor 

function App() {
let firstName = 'utku';
  return (
		<div>
			<Router>
				<TopBar />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/login" component={LoginPage} />
					<Route path="/signup" component={UserSignUpPage} />
					<Route path="/user/:username" component={UserPage} />
					<Redirect to="/" />
				</Switch>
			</Router>
			<LanguageSelector />
		</div>
  );
}

export default App;
