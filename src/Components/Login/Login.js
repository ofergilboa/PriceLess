import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import './login.css'
import image from '../../images/logo3.png'


@inject("UserStore")
@observer
class login extends Component {

    inputHandler = (e) => {
        if(e.target.value.length == 0){
            return alert("slkfmkfdv")
            
        }
        this.props.UserStore.handleInput(e.target.name, e.target.value)
     }
  
     loginUser =() =>{
        this.props.UserStore.getUser()
     }

     loginDemoUser = async () =>{
       await this.props.UserStore.handleInput( "email","hadaralon3@gmail.com")
       await this.props.UserStore.handleInput("password", "hadar" )
        this.props.UserStore.getUser()
     }


    render() {
        return (
            <div>
             <div className="logo"> <img src={image} /> </div>
            <div id="login">
               <input name="email" type="text" placeholder="your email" value={this.props.UserStore.user.email} onChange={this.inputHandler} />
               <input name="password" type="password" placeholder="your password" value={this.props.UserStore.user.password} onChange={this.inputHandler} />
               <div className="buttonSection">
                   <span className="loginButton" onClick={this.loginUser}>Login!</span>
                   <span className="loginButton" onClick={this.loginDemoUser}>Demo Account</span>
               </div>
            </div>
            </div>
        )
    }
}
export default login