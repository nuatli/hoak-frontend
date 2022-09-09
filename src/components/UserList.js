import React,{useState, useEffect} from 'react';
import { getUsers,getUsersWithPage } from '../api/apiCalls';
import {useTranslation} from 'react-i18next';
import UserListItem from './UserListItem';
import {useApiProgress} from '../shared/ApiProgress';

const UserList = () => {
	const [page,setPage] = useState({
		content:[],size:10,number:0
	});

	const pendingApiCAll = useApiProgress(`/api/0.0.1/user?page`);

	useEffect(()=> {
		loadUsers();
	},[]) //componentDidMount,componentDidUpdate

	const  onClickNext = () => {
		const nextPage = page.number + 1;
		loadUsers(nextPage);
	}

	const	onClickPrevious = () => {
		const previousPage = page.number - 1;
		loadUsers(previousPage);
	}

	const loadUsers = page => {
		getUsersWithPage(page).then(response =>{
			setPage(response.data);
		})
	}

	let actionDiv = (
		<div>
			{first === false && <button className="btn btn-sm btn-light" onClick={onClickPrevious} >{"<"}</button>}
			{last === false && <button className="btn btn-sm btn-light float-right" onClick={onClickNext} >{">	"}</button>}
		</div>
	);

	if(pendingApiCAll){
		actionDiv = (
			<div className="d-flex justify-content-center">
				<div className="spinner-border">
					<span  className="sr-only">
						Loading ...
					</span>
				</div>
			</div>
		)
	}

	const { content:users ,last,first} = page;
	const { t }  = useTranslation();
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

	
		</div>
	)
	
};

export default UserList;