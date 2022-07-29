import React from 'react';
//import {withRouter} from 'react-router-dom';
import {useParams} from 'react-router-dom';
//import {Authentication} from '../shared/AuthenticationContext';
import {useSelector} from 'react-redux'; 

const ProfileCard = (props) => {

	const {username : loggedInUserName }  = useSelector((store) => ({username:store.authReducer.username})); 
	const routeParams  = useParams();

	//const pathUserName = props.match.params.username;   withRouter iele bu oluyor
	const pathUserName = routeParams.username;

	let meessage = "We cannot edit";
	if(pathUserName === loggedInUserName){
		meessage = "We can edit";
	}
	return <div>{meessage}</div>;
};


//export default withRouter(ProfileCard);
export default ProfileCard;