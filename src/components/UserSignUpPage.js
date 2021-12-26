import React from 'react';
import axios from 'axios';

class UserSignUpPage extends React.Component{
    state={
        username:null,
        displayName:null,
        password:null,
        passwordRepeat:null,
        pendingApiCall:true
    };

    onChangeUsername = event =>{
       this.setState({username:event.target.value});
        
    } 

    onChangeDisplayName = event =>{
        this.setState({displayname:event.target.value});
         
    } 
    
    onChangData = event => {
        const {name,value}=event.target; 
        this.setState({[name]:value});
    } 
    
    onClickSignUp = event => {
    	event.preventDefault();
    	const {username,displayName,password} =this.state;
    	const body = {username,displayName,password};
    	this.setState({pendingApiCall:true});
    	axios.post('/api/0.0.1/users',body);
    }
	
    render(){
    	const {pendingApiCall} = this.state;
        return(
        	<div className="container">
	            <form>
	                <h1 className="text-center">Sign Up</h1>
	                <div className="form-group">
	                    <label>Username</label>
	                    <input className="form-control" name="username" onChange={this.onChangData }  />   
	                </div>
	
	                <div className="form-group">
	                    <label>Display Name</label>
	                    <input className="form-control" onChange={this.onChangData} name="displayName"/>
	                </div>
	                <div className="form-group">
	                    <label> Password</label>
	                    <input className="form-control" type="password" onChange={this.onChangData} name="password" />
	                </div>
	                <div className="form-group">
	                    <label> Password Repeat</label>
	                    <input className="form-control" type="password" onChange={this.onChangData} name="passwordRepeat" />
	                </div>
	                <div className="text-center">
	                	<button 
	                		className="btn btn-primary" 
	                		onClick={this.onClickSignUp}
	                		disabled={pendingApiCall}
	                	>Sign Up</button>
	                </div>
	            </form>
            </div>
        )
    } 
} 
    


export default UserSignUpPage;