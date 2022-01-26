import React from 'react';
import {withRouter} from 'react-router-dom';
//import {Authentication} from '../shared/AuthenticationContext';

const ProfileCard = (props) => {
	const pathUserName = props.match.params.username;
	const loggedInUserName = props.username;
	let meessage = "We cannot edit";
	if(pathUserName === loggedInUserName){
		meessage = "We can edit";
	}
	return <div>{meessage}</div>;
};


/*
class ProfileCardContextWrapper extends React.Component{
	//static contextType = Authentication;
	render(){
		return <ProfileCard {...this.props} username={this.context.state.username} />
	}
}
*/

export default withRouter(ProfileCard);