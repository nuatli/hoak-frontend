import React,{useState, useEffect} from 'react';
//import {withRouter} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useParams,useHistory} from 'react-router-dom';
//import {Authentication} from '../shared/AuthenticationContext';
import {useSelector,useDispatch} from 'react-redux'; 
import {updateUser,deleteUser} from '../api/apiCalls'; 
import ProfileImageWithDefault from './ProfileImageWithDefault';
import Input from './Input';
import {useApiProgress} from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import {updateSuccessAction, logoutSuccess} from '../actions/authActions';
import Modal from './Modal';

const ProfileCard = (props) => {
	const [inEditMode,setInEditMode] = useState(false);
	const {username : loggedInUserName }  = useSelector((store) => ({username:store.authReducer.username})); 
	const routeParams  = useParams();
	const pathUsername = routeParams.username;
	const { t }  = useTranslation();
	//const {tempUser:user}= props;
	const [user,setUser] = useState(props.tempUser);
	const [editable,setEditable] = useState(false);
	const [newImage,setNewImage] = useState();
	const [validationErrors,setValidationErrors] = useState({});
	const [modalVisible,setModalVisible] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();

	

	useEffect(() => {
		setUser(props.tempUser);
	},[props.tempUser]);

	useEffect(() => {
		setEditable(pathUsername === loggedInUserName);
	},[pathUsername,loggedInUserName]);




	const { username, displayName, image } = user;
	const [updatedDisplayName,setUpdatedDisplayName] = useState();

	useEffect(() => {
		if(!inEditMode){
			setUpdatedDisplayName(undefined);
			setNewImage(undefined);
		}else{
			setUpdatedDisplayName(displayName);
		}
	},[inEditMode,displayName]);

	const onClickSave = async () => {
		let image;
	
		if(newImage){
			image = newImage.split(',')[1];
		}
	
		const body  = {displayName:updatedDisplayName,image};
		try {
			const response = await updateUser(username,body);
			setUser(response.data);
			setInEditMode(false);
			dispatch(updateSuccessAction(response.data));
		}catch(error){
			setValidationErrors(error.response.data.validationErrors);
		}
	}

	const onChangHandler = event => {
		//(event) =>{setUpdatedDisplayName(event.target.value)}
		setUpdatedDisplayName(event.target.value);
	}

	useEffect(() => {
		setValidationErrors((previousValidationErrors) => ({
		...previousValidationErrors,displayName:undefined	
		}));
	},[updatedDisplayName,newImage]);

	const onChangeFile = event => {
		if(event.target.files.length < 1){
			return;
		}
		const file = event.target.files[0];
		const fileReader = new FileReader();
		fileReader.onloadend = () => {
			setNewImage(fileReader.result);
		}
		fileReader.readAsDataURL(file);
	}

	const onClickDeleteMyAccount = () => {
		setModalVisible(true);
	}
	
	const onClickModalCancel = () => {
		setModalVisible(false);
	}

	const onClickModalConfirm = async() => {
		const response = await deleteUser(username);
		try {
			if(response.data  != undefined){
				dispatch(logoutSuccess());
				history.push('/');
			}
		}catch(error){
			console.log(error)
		}
	}

	const pendingApiCall = useApiProgress("put",`/api/0.0.1/users/${username}`);
	const pendingDeleteUserApiCall = useApiProgress("delete",`/api/0.0.1/users/${username}`);
	const {displayName : displayNameError,image:imageError} = validationErrors;

	return (
		<div className="card text-center">
			<div className="card-header">
				<ProfileImageWithDefault alt={`${username} profile`} image={image}  className="rounded-circle shadow" width="200" height="200" tempimage={newImage}/>
			</div>
			<div className="card-body ">
				{ !inEditMode &&(
						<>
							<h3>{displayName}@{username}</h3>
							{editable &&
								<div className="d-flex flex-column align-items-center">
									<button className="btn btn-success d-inline-flex" onClick={()=>setInEditMode(true)}>
										<i className="material-icons mr-2">edit</i>
										{t('Edit')}
									</button>
									<button className="btn btn-danger d-inline-flex mt-2" onClick={onClickDeleteMyAccount}>
										<i className="material-icons mr-2">directions_run</i>
										{t('Delete My Account')}
									</button>
								</div>
							}
						</>
					)
				}
				{ inEditMode &&(
					<div>
						<Input label={t("Change Display Name")} defaultValue={displayName} onChange={onChangHandler} error={displayNameError}/>
						<div className="mw-25"><Input type="file" onChange={onChangeFile}  error = {imageError}/></div>
						<div className="d-inline-flex" >
							<ButtonWithProgress 
								className="btn btn-primary d-inline-flex" 
								onClick={onClickSave} 
								disabled={pendingApiCall} 
								pendingApiCall={pendingApiCall} 
								text={<><i className="material-icons mr-2">save</i>{t('Save')}</>} s
							/>
								
						
							
							<button className="btn btn-dark d-inline-flex ml-2" onClick={()=>setInEditMode(false)} disabled={pendingApiCall} >
								<i className="material-icons mr-2">cancel</i>{t('Cancel')}
							</button>
						</div>
					</div>
				)
			}
			</div>
			<Modal 
                visible={modalVisible} 
                onClickCancel={onClickModalCancel} 
				message = {t('Are you sure to delete your account ?')}
				title={t('Delete Account')}
                onClickConfirm = {onClickModalConfirm}
                pendingApiCall = {pendingDeleteUserApiCall}
            />
		</div>
	);
};

export default ProfileCard;