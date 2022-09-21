import React,{useState, useEffect} from 'react';
import { useSelector }  from 'react-redux';
import {useTranslation} from 'react-i18next';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import {postHoax} from '../api/apiCalls'; 
import {useApiProgress} from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';

const HoaxSubmit = () => {
    const { t }  = useTranslation();
    const { image } = useSelector((store) => ({image:store.authReducer.image}));

    const [focused,setFocused] = useState(false);
    const [hoax,setHoax] = useState('');
    const [errors,setErrors] =useState({});

    
    const onChangeHandler = (event) => {
        setHoax(event.target.value);
    }

    const onClickCancelHandler = () => {
        setFocused(false);
    }

    const onClickSubmitHandler = async () => {
        const body = {
            content:hoax
        }

        try {
            await postHoax(body);
            setFocused(false);
        }catch (error) {
            if(error.response.data.validationErrors){
				setErrors(error.response.data.validationErrors);
			}
        }
    }

    useEffect(() => {
        if(!focused){
            setHoax('');
            setErrors({});
        }
    },[focused])

    useEffect(() => {
        setErrors({});
    },[hoax]);

    const pendingApiCall = useApiProgress("post","/api/0.0.1/hoaxes");

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
                    <div className="text-center mt-2 d-flex justify-content-center">                            
                            <ButtonWithProgress onClick={onClickSubmitHandler} disabled={pendingApiCall} text={t('Submit')} pendingApiCall={pendingApiCall} className="btn btn-primary"/>
                            <button className="btn btn-dark d-inline-flex ml-2" onClick={onClickCancelHandler} disabled={pendingApiCall} >
                                <i className="material-icons mr-2">cancel</i>{t('Cancel')}
                            </button>
                      
                    </div>
                )}
            </div>

        </div>
    )
}

export default HoaxSubmit;