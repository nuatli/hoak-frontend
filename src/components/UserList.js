import React,{useState, useEffect} from 'react';
import { getUsers,getUsersWithPage } from '../api/apiCalls';
import {useTranslation} from 'react-i18next';
import UserListItem from './UserListItem';
import {useApiProgress} from '../shared/ApiProgress';
import Spinner from './Spinner';


const UserList = () => {
	const [page,setPage] = useState({
		content:[],size:10,number:0
	});

	const [loadFailure,setLoadFailure] = useState(false);

	const pendingApiCall = useApiProgress("get","/api/0.0.1/usersWithPage");

	useEffect(()=> {
		loadUsers();
	},[]) //componentDidMount,componentDidUpdate

	const  onClickNext = () => {
		console.log(page.number)
		const nextPage = page.number + 1;
		console.log(nextPage)
		loadUsers(nextPage);
	}

	const	onClickPrevious = () => {
		const previousPage = page.number - 1;
		loadUsers(previousPage);
	}

	const loadUsers = async page => {
		setLoadFailure(false);
		try {	
			const response = await /*getUsers*/getUsersWithPage(page);
			console.log(response.data)
			setPage(response.data);
		}catch(error){
			setLoadFailure(true);
		}
	}


	const { content:users ,last,first} = page;
	const { t }  = useTranslation();
	

	let actionDiv = (
		<div>
			{first === false && <button className="btn btn-sm btn-light" onClick={onClickPrevious} >{"<"}</button>}
			{last === false && <button className="btn btn-sm btn-light float-right" onClick={onClickNext} >{">	"}</button>}
		</div>
	);
	
	if(pendingApiCall){
		actionDiv = (<Spinner />)
	}
	
	//console.table(users)


	return(

		<div className="card">
			<h3 className="card-header text-center">{t('Users')}</h3>
			<div className="list-group-flush">
				{
					users.map( 
						user => ( <UserListItem key={user.username} user={user}   />)  
					)
				}
			</div>
			{actionDiv}
			{loadFailure && <div className="text-center text-danger"> {t('Load Failure')} </div>}

	
		</div>
	)
	
};

export default UserList;