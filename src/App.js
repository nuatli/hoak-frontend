import React from 'react';
import ApiProgress from './shared/ApiProgress';
import {useSelector} from 'react-redux'; 
import UserSignUpPageContainer from './container/UserSignUpPageContainer';
import LoginPageContainer from './container/LoginPageContainer';
import HomePage from './components/pages/HomePage';
import UserPage from './components/pages/UserPage';
import LanguageSelector from './components/LanguageSelector';
import TopBarContainer from './container/TopBarContainer';
import {/*BrowserRouter*/HashRouter as Router,Route,Redirect,Switch} from 'react-router-dom'; //BrowserRouter js dosyalarını tekrar yüklüyor backende sorgu atıyor.  HashRouter saklıyor geçiş yapıyor 


const App = () => {
	const {isLoggedIn}  = useSelector((store) => ({isLoggedIn:store.authReducer.isLoggedIn})); 

	return (
			<div>
				<Router>
					<TopBarContainer />
					<Switch>
						<Route exact path="/" component={HomePage} />
						{!isLoggedIn && (<Route path="/login" component={LoginPageContainer}/>)}
						{!isLoggedIn && (<Route path="/signup" component={UserSignUpPageContainer}/>)}
						<Route path="/user/:username" component={UserPage} />
						<Redirect to="/" />
					</Switch>
				</Router>
				
			</div>
	);
	
}

export default App;
//Routerın altında <LanguageSelector />