import React from 'react';
import logo from '../assets/avatar.png';
import {Link} from 'react-router-dom';
//import {withTranslation} from 'react-i18next';
import {useTranslation} from 'react-i18next';
import {useDispatch,useSelector} from 'react-redux'; 
import {logoutSuccess} from '../actions/authActions'; 

const TopBar = (props)  => {
	const {t} = useTranslation();
	const dispatch = useDispatch(); 
	const reduxState = useSelector((store) => {
	
		return{
			isLoggedIn:store.authReducer.isLoggedIn,
			username:store.authReducer.username
		} 
	
	});

	const { username,isLoggedIn } = reduxState; 

	const onLogoutSuccess = () => {
		dispatch(logoutSuccess());
	} 

	
	let links = (
		<ul className="navbar-nav ml-auto">
			<li><Link className="nav-link" to="/login">{t('Login')}</Link></li>
			<li><Link className="nav-link" to="/signup">{t('Sign Up')}</Link></li>
		</ul>
	);
	
	if(isLoggedIn){
		links= (
			<ul className="navbar-nav ml-auto">
				<li><Link className="nav-link" to={"/user/"+username}>{username}</Link></li>
				<li className="nav-link" onClick={onLogoutSuccess} style={{cursor:'pointer'}}>{t('Logout')}</li>
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
//to={"/user/"+username}> -> '/user/${username}'


export default TopBar;







