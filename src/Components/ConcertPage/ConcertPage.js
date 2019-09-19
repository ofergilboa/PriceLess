import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Modal from 'react-awesome-modal';
// import { PayPalButton } from "react-paypal-button-v2";



import './ConcertPage.css'
import ConcertBid from './ConcertBid/ConcertBid';

const moment = require('moment')
@inject("UserStore")
@inject("ConcertStore")
@observer

class ConcertPage extends Component {


   //=======================POPUP
   constructor(props) {
      super(props);
      this.state = {
         visible: false,
         isFavorite: false
      }
   }


   openModal() {
      this.setState({
         visible: true
      });
   }

   closeModal() {
      this.setState({
         visible: false
      });
   }

   isFav() {
      this.setState({
         isFavorite: true
      })
   }

   isNotFav() {
      this.setState({
         isFavorite: false
      })
   }
   markAsSold = (concertId) => {
      this.props.UserStore.markAsSold(concertId)
   }

   //=======================POPUP


   componentDidMount() {
      this.props.ConcertStore.getConcert(this.props.match.params.id)
   }

   addToFavorites = () => {
      this.isFav()
      this.props.UserStore.addToFavorites(this.props.match.params.id)
      this.props.ConcertStore.getConcert(this.props.match.params.id)

   }

   deleteFromFav = async () => {
      await this.isNotFav()
      await this.props.UserStore.deleteFromFavorite(this.props.match.params.id)
      await this.props.ConcertStore.getConcert(this.props.match.params.id)
   }


   culcPercentage = () => {
      return Math.floor(100 - (100 / this.props.ConcertStore.concert.original_price * this.props.ConcertStore.concert.asked_price))
   }

   render() {

      return (

         <div className="concertSection">

            <section>

               <Modal
                  visible={this.state.visible}
                  width="400"
                  height="300"
                  effect="fadeInUp"
                  onClickAway={() => this.closeModal()}
               >
                  <div>
                     <h1>Seller Info</h1>
                     <div className="sellerInfoPop">
                        <p><strong>Name:</strong> {this.props.UserStore.user.name}</p>
                        <p><strong>Make a call:</strong><a className="phonePop" href={"tel:" + this.props.UserStore.user.phone_number}  >0{this.props.UserStore.user.phone_number}</a></p>
                        <p><strong>Send Email:</strong> {this.props.UserStore.user.email}</p>
                     </div>
                     <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                     <div className="brk-btn bbb" id="popButton" onClick={() => this.closeModal()}> Close </div>
                  </div>
               </Modal>
            </section>
            <div className="bidSection"> {this.props.ConcertStore.concert.is_bid ? <ConcertBid concertId={this.props.match.params.id}></ConcertBid> : null}</div>
            <div className="concertPhoto" style={{ backgroundImage: "url(" + this.props.ConcertStore.concert.img_url + ")", backgroundSize: "51.2vw 22vw", marginRight: "14.5%" }} >{this.props.ConcertStore.concert.is_favorite ? <i onClick={this.deleteFromFav} class="fas fa-heart"></i> : <i onClick={this.addToFavorites} class="far fa-heart"></i>}</div>
            <div className="concertTitle">{this.props.ConcertStore.concert.artist}</div>
            <div className="ticketSection">

               <div className="ticketData">
                  <div className="concertDate">
                     <div id="hour">{moment(this.props.ConcertStore.concert.date).format('LT')} </div>
                     <div id="month">{moment(this.props.ConcertStore.concert.date).format("MMM Do")} </div>
                     <div id="day">{moment(this.props.ConcertStore.concert.date).format("YYYY")} </div>

                  </div>
                  <div className="place">
                     <div>{this.props.ConcertStore.concert.venue}</div>
                     <div>{this.props.ConcertStore.concert.city}, {this.props.ConcertStore.concert.country}</div>
                     <div className="price">{this.props.ConcertStore.concert.is_bid ? null : "Price: $" + this.props.ConcertStore.concert.asked_price} </div>
                  </div>
                  <div className="buttonBox"><span onClick={() => this.openModal()} className="contactButton">Contact Seller</span></div>
                  {/* <div ><span className="buttonBox" onClick={() => this.addToFavorites()} className="contactButton">Save</span></div> */}
               </div>
               <div className="info">
                  <div className="iconBar"><i class="fas fa-ticket-alt iconConcert"></i>{this.props.ConcertStore.concert.num_of_tickets} Tickets</div>
                  <div className="iconBar"><i class="fas fa-check-circle iconConcert"></i>Saving {this.culcPercentage()}%</div>
                  <div className="iconBar"><i class="fas fa-info-circle iconConcert"></i>{this.props.ConcertStore.concert.additional_info} </div>
                  {/* <button onClick={this.addToFavorites}>save</button> */}
                  {/* <Lottie options={defaultOptions} /> */}

               </div>
            </div>
            {/* {this.props.ConcertStore.concert.is_bid ? "" :
               <PayPalButton
                  amount={this.props.ConcertStore.concert.asked_price * this.props.ConcertStore.concert.num_of_tickets}
                  onSuccess={(details, data) => {
                     alert(details.payer.name.given_name + " bought " +
                        this.props.ConcertStore.concert.num_of_tickets + " " +
                        this.props.ConcertStore.concert.artist + " tickets for $" +
                        this.props.ConcertStore.concert.asked_price * this.props.ConcertStore.concert.num_of_tickets);
                     this.markAsSold(this.props.ConcertStore.concert.id)
                     // OPTIONAL: Call your server to save the transaction
                     return fetch("/paypal-transaction-complete", {
                        method: "post",
                        body: JSON.stringify({
                           orderID: data.orderID
                        })
                     });
                  }}
               />
            } */}
         </div>)
   }
}
export default ConcertPage

