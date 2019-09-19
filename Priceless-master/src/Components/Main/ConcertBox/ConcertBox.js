import React, { Component } from 'react'
import './ConcertBox.css'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
const moment = require('moment')

@inject("ConcertStore")
@inject("UserStore")
@observer

class ConcertBox extends Component {

   addToFavorites = () => {
      this.props.UserStore.addToFavorites(this.props.concert.id)
   }

   //if throuhg ConcertPage it wont work
   // addToFavorites = () => {
   //    this.props.UserStore.addToFavorites(this.props.concert.id)
   // }

   render() {
      return (
         <Link to={`/concert/${this.props.concert.id}`}>
            <div className="concert-box">
               <div className="concert-box-img">
                  <img src={this.props.concert.img_url} />
               </div>
               <div className="concert-box-info">
                  <div className="textInfo">
                     <div  className="artist">{this.props.concert.artist}</div>
                     <div className="smallInfo">{this.props.concert.num_of_tickets} Tickets</div>
                     <div className="smallInfo">{this.props.concert.city}</div>
                  </div>
                  <div id="concert-box-date">
                     <div>
                        <div id="day">{moment(this.props.concert.date).format("D")} </div>
                        <div id="month">{moment(this.props.concert.date).format("MMM")} </div>
                     </div>
                     <div id="concert-box-price">{this.props.concert.asked_price}$</div>
                  </div>
               </div>

            </div>
         </Link>)
   }
}
export default ConcertBox
