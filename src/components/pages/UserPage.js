import React, { useEffect,useState } from 'react';
import ProfileCardContainer from '../../container/ProfileCardContainer';
import { getUser } from '../../api/apiCalls';
import {updateTempUser} from '../../actions/updateUserActions';
import { useParams } from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {useApiProgress} from '../../shared/ApiProgress';
import Spinner from '../Spinner';
import HoaxFeed from '../HoaxFeed';


const UserPage = () => {
	const [user,setUser] = useState({});
	const [notFound,setNotFound] = useState(false);
	//const { username } = props.match.params; 
	const { username } = useParams(); //<Route path="/user/:username" component={UserPage} /> App.jsdeki
	const { t }  = useTranslation();
	const dispatch = useDispatch(); 
	
	const  pendingApiCall = useApiProgress("get",`/api/0.0.1/users/${username}`,true);
	
	useEffect(()=> {
		setNotFound(false);	
	},[user])

	const loadUser = async()  => {
		try{
			const response = await getUser(username);
			setUser(response.data);
			dispatch(updateTempUser(response.data));
		}catch(error){
			setNotFound(true);
			console.error(error)
		}
	}

	useEffect(()=> {
		loadUser();	
	},[username])


	if(notFound){
		return(
			<div className="container">
				<div className="alert alert-danger text-center">
					<div><i className="material-icons" style={{fontSize:'48px'}} >error</i></div>
					{t("User not Found")} 
				</div>
			</div>
		);
	}

	if(pendingApiCall || user.username !== username){
		return (<Spinner />)
	}


	return (
			<div className="container">
				<div className="row">
					<div className="col">
						<ProfileCardContainer user={user}/>
					</div>
					<div className="col">
						<HoaxFeed />
					</div>
				</div>
			
			</div>
	);
};

export default UserPage;
