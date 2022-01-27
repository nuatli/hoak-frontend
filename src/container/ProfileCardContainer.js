import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ProfileCard from '../components/ProfileCard';
import {logoutSuccess} from '../actions/authActions';

const mapStateToProps = (reduxState) => {
	return{
		isLoggedIn:reduxState.authReducer.isLoggedIn,
		username:reduxState.authReducer.username
	}
}

const mapDispatchToProps = dispatch => {
	return{
		onLogoutSuccess:() => dispatch(logoutSuccess())
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileCard);