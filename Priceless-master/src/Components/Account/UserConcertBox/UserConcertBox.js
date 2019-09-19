import React, { Component } from 'react'
import './UserConcertBox.css'
// import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
const moment = require('moment')


@inject("UserStore")
@observer

class UserConcertBox extends Component {

    deleteConcert = () => {
        this.props.deleteConcert(this.props.concert.id)
    }

    markAsSold = () => {
        this.props.markAsSold(this.props.concert.id)
    }
    render() {
        return (
            <div className="user-concert-box">
                {/* <div className="concert-box-info"> */}
                <div id="concert-box-date-Account">
                    <div>
                        <div id="dayAccount">{moment(this.props.concert.date).format("D")} </div>
                        <div id="monthAccount">{moment(this.props.concert.date).format("MMM")} </div>
                    </div>
                    <div id="box-price-Account">{this.props.concert.asked_price}$</div>
                </div>
                <div className="ticketInfo-Account">
                    <div className="artistName">{this.props.concert.artist}</div>
                    <div>{this.props.concert.num_of_tickets} Tickets</div>
                    <div>{this.props.concert.city}</div>
                </div>
                {/* </div> */}
                <div className="buttons-Account">
                    <div className="deleteConcert" onClick={this.deleteConcert}>Delete</div>
                    {this.props.concert.status === 'sold' ?
                        <div className="deleteConcert sold">sold!</div>
                        : <div className="deleteConcert markSold" onClick={this.markAsSold}>Mark as sold</div>
                    }
                </div>
            </div>
        )
    }
}
export default UserConcertBox
