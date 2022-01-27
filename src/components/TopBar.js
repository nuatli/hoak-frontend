import React,{Component} from 'react';
import logo from '../assets/avatar.png';
import {Link} from 'react-router-dom';
import {withTranslation} from 'react-i18next';

class TopBar extends Component{
	//static contextType = Authentication; // Sadece class tipinde gecerli
	
    render(){
    	//console.log(this.context)
    	const {t,username,isLoggedIn,onLogoutSuccess} =this.props;
		let links = (
			<ul className="navbar-nav ml-auto">
				<li>
					<Link className="nav-link" to="/login">
						{t('Login')}
					</Link>
				</li>
				<li>
					<Link className="nav-link" to="/signup">
						{t('Sign Up')}
					</Link>
				</li>
			</ul>
		);
		
		if(isLoggedIn){
			links= (
				<ul className="navbar-nav ml-auto">
					<li>
						<Link className="nav-link" to={"/user/"+username}>
							{username}
						</Link>
					</li>
					<li className="nav-link" onClick={onLogoutSuccess} style={{cursor:'pointer'}}>{
						t('Logout')}
					</li>
				</ul>
			)
		}
		
		return(
			<div className="shadow-sm mb-2 bg-ligt">
				<nav className="navbar navbar-light  container navbar-expand">
					<Link className="navbar-brand" to="/"> 
						<img src={logo} width="60"  alt= "Jiraiya" /> Jiraiya
					</Link>
					{links}
				 </nav>
			</div>
		)
    } 
} 
//to={"/user/"+username}> -> '/user/${username}'


export default withTranslation()(TopBar);







