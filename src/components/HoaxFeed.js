import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHoaxes, getOldHoaxes, getNewHoaxesCount, getNewHoaxes} from '../api/apiCalls';
import {useTranslation} from 'react-i18next';
import HoaxView from './HoaxView';
import {useApiProgress} from '../shared/ApiProgress';
import Spinner from './Spinner';


const HoaxFeed = () => {
    const {t} = useTranslation();
    const { username } = useParams(); //<Route path="/user/:username" component={UserPage} /> App.jsdeki
    const [hoaxPage,setHoaxPage] = useState({content:[],last:true,number : 0});
    const [newHoaxCount,setNewHoaxCount] = useState(0);

    const path = username ? `/api/0.0.1/users/${username}/hoaxes?page=` : `/api/0.0.1/hoaxes?page=`
    const initialHoaxLoadProgress = useApiProgress("get",path);

    let lastHoaxId = 0;
    let firstHoaxId = 0;
    
    if(hoaxPage.content.length > 0){
        firstHoaxId = hoaxPage.content[0].id;
        const lastHoaxIndex = hoaxPage.content.length -1 ;
        lastHoaxId = hoaxPage.content[lastHoaxIndex].id;
    }
    
    const oldHoaxPath = username ? `/api/0.0.1/users/${username}/hoaxes/${lastHoaxId}` : `/api/0.0.1/hoaxes/${lastHoaxId}`;
    const loadOldHoaxProgress = useApiProgress("get",oldHoaxPath,true);
    const newHoaxPath = username ? `/api/0.0.1/users/${username}/hoaxes/${firstHoaxId}}?direction=after` : `/api/0.0.1/hoaxes/${firstHoaxId}?direction=after`;
    const loadNewHoaxProgress = useApiProgress("get",newHoaxPath,true);

    useEffect( () => {
        console.log("newHoaxCount : "+ newHoaxCount);
    },[newHoaxCount]);
   
   useEffect( () => {
    const getCount = async () => {
        try {
            const response = await getNewHoaxesCount(firstHoaxId,username);
            setNewHoaxCount(response.data.count); 
        }catch(error){
            console.error(error);
        }
    }
    let looper = setInterval(getCount,5000);

    return function cleanup() {
        clearInterval(looper);
    }
   },[firstHoaxId,username]);


    useEffect( () => {
        loadHoaxes();
    },[]);

    const { content,last } = hoaxPage;

   

    const loadHoaxes = async (page) => {
        try {
            const response = await getHoaxes(username,page);
            //setHoaxPage(response.data);
            setHoaxPage(previousHoaxPage => ({
                ...response.data,
                content:[...previousHoaxPage.content,...response.data.content]
            })); // Geçmiş bilgileri almak için
        }catch(error){

        }
    }

    const onClickHandler = () => {
        loadOldHoaxes();
    } 

    const loadOldHoaxes = async () => {
        try {
            const response = await getOldHoaxes(lastHoaxId,username);
            setHoaxPage(previousHoaxPage => ({
                ...response.data,
                content:[...previousHoaxPage.content,...response.data.content]
            })); // Geçmiş bilgileri almak için
        }catch(error){
            console.error(error);
        }

    }

    const onNewClickHandler = () => {
        loadNewHoaxes();
    } 

    const loadNewHoaxes = async () => {
        try {
            const response = await getNewHoaxes(firstHoaxId,username);
            setHoaxPage(previousHoaxPage => ({
                ...previousHoaxPage,
                content:[...response.data , ...previousHoaxPage.content]
            })); 
            setNewHoaxCount(0);
        }catch(error){
            console.error(error);
        }
    }

    const onDeleteHoaxSuccess = id => {
        setHoaxPage(previousHoaxPage => ({
            ...previousHoaxPage,
            content:previousHoaxPage.content.filter( hoax => hoax.id !== id)                
          }))         
    }

   

    if(content.length === 0){
        return (
            <div className = "alert alert-secondary text-center">
                {loadNewHoaxProgress ?  <Spinner /> : t('There are no hoaxes')}
            </div>
        )
    }
    return (
        <div>
            {newHoaxCount > 0 && 
                    <div className = "alert alert-secondary text-center mb-1" style={{cursor:'pointer'}} onClick={onNewClickHandler}>
                        {  loadNewHoaxProgress ? <Spinner /> :  t('There are new hoaxes')}
                    </div>
            }
            {content.map(hoax => {
                return <HoaxView key={hoax.id} hoax={hoax} onDeleteHoax={onDeleteHoaxSuccess} />
            })}
            {!last && 
                loadOldHoaxProgress ?
                (
                    <div className = "alert alert-secondary text-center mt-1" > 
                        <Spinner />
                    </div>
                )
                : 
                (
                    <div className = "alert alert-secondary text-center mt-1" style={{cursor:'pointer'}} onClick={onClickHandler}>
                        {t('Load Old Hoaxes') }
                    </div>
                )
            }
        </div>
    )
    

}

export default HoaxFeed;