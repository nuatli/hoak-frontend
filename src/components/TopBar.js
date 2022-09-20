import React,{useState,useEffect,useRef} from 'react';
import logo from '../assets/avatar.png';
import {Link} from 'react-router-dom';
//import {withTranslation} from 'react-i18next';
import {useTranslation} from 'react-i18next';
import {useDispatch,useSelector} from 'react-redux'; 
import {logoutSuccess} from '../actions/authActions';
import ProfileImageWithDefault from './ProfileImageWithDefault'; 
import LanguageSelector from './LanguageSelector';

const TopBar = (props)  => {
	const menuArea = useRef(null);
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

	const [menuVisible,setMenuVisible] = useState(false);
	const { username,isLoggedIn,displayName,image } = reduxState; 
	const onLogoutSuccess = () => {
		dispatch(logoutSuccess());
	} 

	const onClickHandler = () => {
		setMenuVisible(!menuVisible);
	} 
	
	useEffect(() => {
		document.addEventListener('click',menuClickTracker);
		return () => {
			document.removeEventListener('click',menuClickTracker);
		}
	},[isLoggedIn]);
	
	const menuClickTracker = event => {
		if(menuArea.current == null || !menuArea.current.contains(event.target)){
			setMenuVisible(false);
		}	
	};
	
	let links = (
		<ul className="navbar-nav ml-auto">
			<li><Link className="nav-link" to="/login">{t('Login')}</Link></li>
			<li><Link className="nav-link" to="/signup">{t('Sign Up')}</Link></li>
		</ul>
	);
	
	if(isLoggedIn){
		let dropDownClass = "dropdown-menu p-0 shadow";
		if(menuVisible) {
			dropDownClass += " show";
		}
		
		links= (
			<ul className="navbar-nav ml-auto" ref={menuArea}>
				<li className="nav-item dropdown p-0 shadow">
					<div className="d-flex" style={{cursor:'pointer'}} onClick={onClickHandler}>
						<ProfileImageWithDefault alt={`${username} profile`} image={image}  className="rounded-circle shadow m-auto" width="32" height="32"  /> 
						<span className="nav-link dropdown-toggle" >{displayName}</span>
					</div>
					<div className={dropDownClass}>
						<Link className="dropdown-item d-flex p-2" to={"/user/"+username} onClick={()=>setMenuVisible(false)}><i className="material-icons text-info mr-2">person</i> {t('MyProfile')}</Link>
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
				<div><LanguageSelector /></div>
				{links}
				</nav>
		</div>
	)
} 
//to={"/user/"+username}> -> '/user/${username}'


export default TopBar;







