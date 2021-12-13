import React from 'react';
import axios from 'axios';

class UserSignUpPage extends React.Component{
    state={
        username:null,
        displayName:null,
        password:null,
        passwordRepeat:null
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
    	axios.post('/api/0.0.1/users',body);
    }
	
    render(){
        return(
            <form>
                <h1>Sign Up</h1>
                <div>
                    <label>Username</label>
                    <input name="username" onChange={this.onChangData }  />   
                </div>
               

                <div>
                    <label>Display Name</label>
                    <input  onChange={this.onChangData} name="displayName"/>
                </div>
                <div>
                    <label> Password</label>
                    <input type="password" onChange={this.onChangData} name="password" />
                </div>
                <div>
                    <label> Password Repeat</label>
                    <input type="password" onChange={this.onChangData} name="passwordRepeat" />
                </div>
                <button onClick={this.onClickSignUp}>Sign Up</button>

            </form>
        )
    } 
} 
    


export default UserSignUpPage;