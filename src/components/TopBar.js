import React from 'react';
import logo from '../assets/avatar.png';
import {Link} from 'react-router-dom';
//import {withTranslation} from 'react-i18next';
import {useTranslation} from 'react-i18next';
import {useDispatch,useSelector} from 'react-redux'; 
import {logoutSuccess} from '../actions/authActions';
import ProfileImageWithDefault from './ProfileImageWithDefault'; 

const TopBar = (props)  => {
	const {t} = useTranslation();
	const dispatch = useDispatch(); 
	const reduxState = useSelector((store) => {
	
		return{
			isLoggedIn:store.authReducer.isLoggedIn,
			username:store.authReducer.username,
			displayName:store.authReducer.displayName,
			image:store.authReducer.image,
		} 
	
	});

	const { username,isLoggedIn,displayName,image } = reduxState; 

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
				<li className="nav-item dropdown p-0 shadow">
					<div className="d-flex" style={{cursor:'pointer'}}>
						<ProfileImageWithDefault alt={`${username} profile`} image={image}  className="rounded-circle shadow m-auto" width="32" height="32" tempimage={image} /> 
						<span className="nav-link dropdown-toggle" >{displayName}</span>
					</div>
					<div className="dropdown-menu show">
						<li><Link className="dropdown-item d-flex p-2" to={"/user/"+username}><i className="material-icons text-info mr-2">person</i> {t('MyProfile')}</Link></li>
						<span className="dropdown-item d-flex p-2" onClick={onLogoutSuccess} style={{cursor:'pointer'}}><i className="material-icons text-danger mr-2">power_settings_new</i> {t('Logout')}</span>
					</div>
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
//to={"/user/"+username}> -> '/user/${username}'


export default TopBar;







