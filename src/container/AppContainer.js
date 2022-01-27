import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import App from '../App';
//import {logoutSuccess} from '../actions/authActions';

const mapStateToProps = (reduxState) => {
	return{
		isLoggedIn:reduxState.authReducer.isLoggedIn,
	}
}

const mapDispatchToProps = dispatch => {
	return{
		//onLogoutSuccess:() => dispatch(logoutSuccess())
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(App);