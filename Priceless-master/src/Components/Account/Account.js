import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import './Account.css'
import UserConcertBox from './UserConcertBox/UserConcertBox'
const moment = require('moment')

@inject("UserStore")
@observer
class Account extends Component {

    componentDidMount() {
        this.props.UserStore.getUserConcerts()
    }

    deleteConcert=(concertId)=>{
        this.props.UserStore.deleteConcert(concertId)
    }
    markAsSold=(concertId)=>{
        this.props.UserStore.markAsSold(concertId)
    }
    render() {

        return (
            <div className="account">
                <div className="user-info">
                    <div className="hello" >Hello {this.props.UserStore.user.name.split(" ")[0]}!</div>
                    <div><strong>Full name:</strong> {this.props.UserStore.user.name}</div>
                    <div><strong>Phone number:</strong> 0{this.props.UserStore.user.phone_number}</div>
                    <div><strong>Email:</strong> {this.props.UserStore.user.email}</div>
                </div>
                <div className="yourConcert"><strong>Your Concerts:</strong></div>
                <div className="user-concerts">
                {this.props.UserStore.userConcerts.map(c=> <UserConcertBox key={c.id}
                                                concert={c} 
                                                deleteConcert={this.deleteConcert}
                                                markAsSold={this.markAsSold}/>)}</div>

               


            </div>)
    }
}
export default Account