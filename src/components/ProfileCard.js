import React,{useState, useEffect} from 'react';
//import {withRouter} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
//import {Authentication} from '../shared/AuthenticationContext';
import {useSelector} from 'react-redux'; 
import {updateUser} from '../api/apiCalls'; 
import ProfileImageWithDefault from './ProfileImageWithDefault';
import Input from './Input';
import {useApiProgress} from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';

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

	

	useEffect(() => {
		setUser(props.tempUser);
	},[props.tempUser]);

	const { username, displayName, image } = user;
	const [updatedDisplayName,setUpdatedDisplayName] = useState();
	

	const onClickSave = async () => {
		const body  = {displayName:updatedDisplayName,image:newImage};
		try {
			const response = await updateUser(username,body);
			setUser(response.data);
			setInEditMode(false);
		}catch(error){
			console.debug(error);
		}
	}

	useEffect(() => {
		if(!inEditMode){
			setUpdatedDisplayName(undefined);
			setNewImage(undefined);
		}else{
			setUpdatedDisplayName(displayName);
		}
	},[inEditMode,displayName]);

	useEffect(() => {
		setEditable(pathUsername === loggedInUserName);
	},[pathUsername,loggedInUserName]);

	const onChangeFile = event => {
		const file = event.target.files[0];
		const fileReader = new FileReader();
		fileReader.onloadend = () => {
			setNewImage(fileReader.result);
		}
		fileReader.readAsDataURL(file);
	}

	const pendingApiCall = useApiProgress("put",`/api/0.0.1/users/${username}`);


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
							 <button className="btn btn-success d-inline-flex" onClick={()=>setInEditMode(true)}>
								<i className="material-icons mr-2">edit</i>
								{t('Edit')}
							 </button>
							}
						</>
					)
				}
				{ inEditMode &&(
					<div>
						<Input label={t("Change Display Name")} defaultValue={displayName} onChange={(event) =>{setUpdatedDisplayName(event.target.value)}} />
						<div className="mw-25"><input type="file" onChange={onChangeFile}  /></div>
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
		</div>
	);
};

export default ProfileCard;