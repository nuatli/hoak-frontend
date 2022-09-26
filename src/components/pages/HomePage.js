import React from 'react';
import { useSelector }  from 'react-redux';
import UserList from '../UserList';
import HoaxSubmit from '../HoaxSubmit';
import HoaxFeed from '../HoaxFeed';
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
	
	return( 
		<div className="container">
			<div className="row">
				<div className="col">
					{ isLoggedIn && 
						<div className="mb-1"> <HoaxSubmit /> </div>
					} 
					<HoaxFeed />
				</div>
				
				<div className="col"><UserList /></div>
			</div>
		</div>
	)
};

export default HomePage;