import React,{useState, useEffect} from 'react';
import { useSelector }  from 'react-redux';
import {useTranslation} from 'react-i18next';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { postHoax, postHoaxAttachment } from '../api/apiCalls'; 
import {useApiProgress} from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import Input from './Input';
import AutoUploadImage from './AutoUploadImage';

const HoaxSubmit = () => {
    const { t }  = useTranslation();
    const { image } = useSelector((store) => ({image:store.authReducer.image}));

    const [focused,setFocused] = useState(false);
    const [hoax,setHoax] = useState('');
    const [errors,setErrors] =useState({});
    const [newImage,setNewImage] = useState();
    const [attachmentId,setAttachmentId] = useState();

    
    const onChangeHandler = (event) => {
        setHoax(event.target.value);
    }

    const onClickCancelHandler = () => {
        setFocused(false);
    }

    const onClickSubmitHandler = async () => {
        const body = {
            content:hoax,
            attachmentId:attachmentId
        };

        try {
            await postHoax(body);
            setFocused(false);
        }catch (error) {
            if(error.response.data.validationErrors){
				setErrors(error.response.data.validationErrors);
			}
        }
    }

    const onChangeFile = event => {
		if(event.target.files.length < 1){
			return;
		}
		const file = event.target.files[0];
		const fileReader = new FileReader();
		fileReader.onloadend = () => {
            setNewImage(fileReader.result);
            uploadFile(file);
		}
		fileReader.readAsDataURL(file);
    }
    
    const uploadFile = async (file) => {
        const attachment = new FormData();
        attachment.append('file',file);      
        try{
            const response = await postHoaxAttachment(attachment);
            setAttachmentId(response.data.id);
        }catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
        if(!focused){
            setHoax('');
            setErrors({});
            setNewImage();
            setAttachmentId();
        }
    },[focused])

    useEffect(() => {
        setErrors({});
    },[hoax]);

    const pendingApiCall = useApiProgress("post","/api/0.0.1/hoaxes",true);
    const pendingFileUpload = useApiProgress("post","/api/0.0.1/hoax-attachments",true);

    let textAreaClass = 'form-control';
    if(errors.content){
        textAreaClass += ' is-invalid'
    }

    

    return(
        <div className="card p-1 flex-row border-0">
            <ProfileImageWithDefault image = {image} width="32" height="32" className="rounded-circle mr-1" />
            <div className="flex-fill">
                <textarea 
                    className={textAreaClass} 
                    rows ={focused ? '3':'1'} 
                    onFocus={() => setFocused(true)}
                    onChange={onChangeHandler}
                    value={hoax}
                />
                <div className="invalid-feedback text-center">{errors.content}</div>
                {focused && (
                    <>
                        {!newImage &&  <Input type="file" onChange={onChangeFile} /> }
                        {newImage && <AutoUploadImage image={newImage} uploading = {pendingFileUpload} />}
                        <div className="text-center mt-2 d-flex justify-content-center">                            
                                <ButtonWithProgress onClick={onClickSubmitHandler} disabled={pendingApiCall || pendingFileUpload} text={t('Submit')} pendingApiCall={pendingApiCall} className="btn btn-primary"/>
                                <button className="btn btn-dark d-inline-flex ml-2" onClick={onClickCancelHandler} disabled={pendingApiCall || pendingFileUpload }>
                                    <i className="material-icons mr-2">cancel</i>{t('Cancel')}
                                </button>
                        
                        </div>
                    </>
                )}
            </div>

        </div>
    )
}

export default HoaxSubmit;