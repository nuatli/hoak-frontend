import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TopBar from '../components/TopBar';
import {logoutSuccess} from '../redux/authActions';

const mapStateToProps = (reduxState) => {
	return{
		isLoggedIn:reduxState.isLoggedIn,
		username:reduxState.username
	}
}

const mapDispatchToProps = dispatch => {
	return{
		onLogoutSuccess:() => dispatch(logoutSuccess())
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(TopBar);