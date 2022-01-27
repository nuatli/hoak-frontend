import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UserSignUpPage from '../components/pages/UserSignUpPage';
import {loginSuccessAction,signupHandler} from '../actions/authActions';

const mapStateToProps = (reduxState) => {
	return{

	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		loginSuccessAction,
		signupHandler
	},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(UserSignUpPage);