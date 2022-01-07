import React from 'react';
import ApiProgress from '../shared/ApiProgress';
import UserSignUpPage from '../components/pages/UserSignUpPage';
import LoginPage from '../components/pages/LoginPage';
import HomePage from '../components/pages/HomePage';
import UserPage from '../components/pages/UserPage';
import LanguageSelector from '../components/LanguageSelector';
import TopBar from '../components/TopBar';
import {/*BrowserRouter*/HashRouter as Router,Route,Redirect,Switch} from 'react-router-dom'; //BrowserRouter js dosyalarını tekrar yüklüyor backende sorgu atıyor.  HashRouter saklıyor geçiş yapıyor 

class App extends React.Component{
	state = {
			isLoggedIn:false,
			username:undefined
	};
	
	onLoginSuccess = (username) => {
		this.setState({username,isLoggedIn:true});
	}
	
	onLogoutSuccess = () => {
		this.setState({username:undefined,isLoggedIn:false});
	}
	
	render(){
		const {isLoggedIn,username}=this.state;
		console.log(isLoggedIn,username)
		console.log("/user/:"+username)
		return (
				<div>
					<Router>
						<TopBar isLoggedIn={isLoggedIn} username={username} onLogoutSuccess={this.onLogoutSuccess}/>
						<Switch>
							<Route exact path="/" component={HomePage} />
							{!isLoggedIn && (<Route 
								path="/login" 
								component={props => {
									return <LoginPage {...props} onLoginSuccess={this.onLoginSuccess}/>;
								}}
							/>)}
							<Route path="/signup" component={UserSignUpPage} />
							<Route 
								path="/user/:username" 
								component={props => {
									return <UserPage {...props} username={username} />;
								}} 
							/>
							<Redirect to="/" />
						</Switch>
					</Router>
					<LanguageSelector />
				</div>
		);
	}
}

export default App;
