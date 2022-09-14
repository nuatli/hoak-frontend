import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ProfileCard from '../components/ProfileCard';
import {logoutSuccess} from '../actions/authActions';
import {updateTempUser} from '../actions/updateUserActions';


const mapStateToProps = (reduxState) => {
	return{
		isLoggedIn:reduxState.authReducer.isLoggedIn,
		username:reduxState.authReducer.username,
		tempUser:reduxState.tempUserReducer
	}
}

const mapDispatchToProps = dispatch => {
	return{
		onLogoutSuccess:() => dispatch(logoutSuccess()),
		onUpdateTempUser:( )=> dispatch(updateTempUser())
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileCard);