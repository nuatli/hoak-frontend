import React from 'react';
import { useSelector }  from 'react-redux';
import UserList from '../UserList';
import HoaxSubmit from '../HoaxSubmit';
const HomePage = () => {
	const reduxState = useSelector((store) => {
	
		return{
			isLoggedIn:store.authReducer.isLoggedIn,
			username:store.authReducer.username,
			displayName:store.authReducer.displayName,
			image:store.authReducer.image,
		} 
	
	});
	const { isLoggedIn } = reduxState;
	console.log(isLoggedIn)
	
	return( 
		<div className="container">
			<div className="row">
				{ isLoggedIn && <div className="col"><HoaxSubmit /></div>}
				<div className="col"><UserList /></div>
			</div>
		</div>
	)
};

export default HomePage;