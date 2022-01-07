import React from 'react';
import {withRouter} from 'react-router-dom';

const ProfileCard = (props) => {
	const pathUserName = props.match.params.username;
	const loggedInUserName = props.username;
	let meessage = "We cannot edit";
	if(pathUserName === loggedInUserName){
		meessage = "We can edit";
	}
	return <div>{meessage}</div>;
};

export default withRouter(ProfileCard);