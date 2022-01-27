import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LoginPage from '../components/pages/LoginPage';
import {loginSuccessAction,loginHandler} from '../actions/authActions';

const mapStateToProps = (reduxState) => {
	return{

	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		loginSuccessAction,
		loginHandler
	},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);