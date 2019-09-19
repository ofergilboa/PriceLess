import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Modal from 'react-awesome-modal';

import './NewItem.css'
const moment = require('moment')

@inject("NewConcertStore")
@observer
class NewItem extends Component {
   constructor(props) {
      super(props);
      this.state = {
         visible: false
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

   //=======================POPUP
   inputHandler = (e) => {
      this.props.NewConcertStore.handleInput(e.target.name, e.target.value)
   }

   saveConcert = async () => {
      // console.log(this.props.NewConcertStore.newConcert.artist)
      // console.log(this.props.NewConcertStore.newConcert.date)
      // console.log(this.props.NewConcertStore.newConcert.hour)
      // console.log(this.props.NewConcertStore.newConcert.country)
      // console.log(this.props.NewConcertStore.newConcert.city)
      // console.log(this.props.NewConcertStore.newConcert.venue)
      // console.log(this.props.NewConcertStore.newConcert.asked_price)
      // console.log(this.props.NewConcertStore.newConcert.num_of_tickets)
      if (!this.props.NewConcertStore.newConcert.artist) return alert("Artist field is empty")
      if (this.props.NewConcertStore.newConcert.date == Date) return alert("Date field is empty")
      if (this.props.NewConcertStore.newConcert.hour == Date) return alert("Hour field is empty")
      if (!this.props.NewConcertStore.newConcert.country) return alert("Country field is empty")
      if (!this.props.NewConcertStore.newConcert.city) return alert("City field is empty")
      if (!this.props.NewConcertStore.newConcert.venue) return alert("Venue field is empty")
      if (this.props.NewConcertStore.newConcert.asked_price == Number) return alert("Asked Price field is empty")
      if (this.props.NewConcertStore.newConcert.num_of_tickets == Number) return alert("Number of tickets field is empty")
      console.log("saving")
      await this.props.NewConcertStore.saveConcert()
      await this.openModal()
   }
   radioButtonChanged = (e) => {
      e.target.value === "fixed_price" ?
         this.props.NewConcertStore.chooseFixedPrice() :
         this.props.NewConcertStore.chooseBid()
   }
   radioButtonChanged = (e) => {
      e.target.value === "fixed_price" ?
         this.props.NewConcertStore.chooseFixedPrice() :
         this.props.NewConcertStore.chooseBid()
   }

   render() {
      const store = this.props.NewConcertStore.newConcert

      const img = "https://media.giphy.com/media/26gst31Cm1x9lIMI8/giphy.gif";

      const fixedPriceComponent = (<div>
         <input id="fixed" name="asked_price" type="Number" placeholder="Asked price in $"
            value={store.asked_price} onChange={this.inputHandler} />
         <input id="fixed" name="original_price" type="Number" placeholder="Original price in $"
            value={store.original_price} onChange={this.inputHandler} />
      </div>
      )

      const bidComponent = (
         <div>
            <div id="date-time-input">
               <input name="bid_end_date" type="Date" placeholder="Date"
                  value={store.bid_end_date} onChange={this.inputHandler} />
               <input name="bid_end_time" type="time" placeholder="Hour"
                  value={store.bid_end_time} onChange={this.inputHandler} />
            </div>
            <div id="price-container">
               <input id="price" name="asked_price" type="Number" placeholder="Min price in $"
                  value={store.asked_price} onChange={this.inputHandler} />
               <input name="original_price" type="Number" placeholder="Original price in $"
                  value={store.original_price} onChange={this.inputHandler} />

            </div>
         </div>)

      return (
         <div>
            <div className="new-item">
               <section>

                  <Modal
                     visible={this.state.visible}
                     width="400"
                     height="300"
                     effect="fadeInUp"
                     onClickAway={() => this.closeModal()}
                  >
                     <div>
                        <h1 className="popMsg">Uploaded succecfuly</h1>
                        <div className="sellerInfoPop">
                           <p>Thank you!</p>
                           <p>Your'e gonna be rich!</p>
                        </div>
                        <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                        <div className="brk-btn" id="popButtonPost" onClick={() => this.closeModal()}> <Link to="/" className="Main"> Close </Link> </div>
                     </div>
                  </Modal>
               </section>
               <div class="container">
                  <h2>Get rid of your ticket now!</h2>
                  <form >
                     <input name="artist" type="text" placeholder="Artist" value={store.artist} onChange={this.inputHandler} />
                     <div id="date-time-input">
                        <input name="date" type="Date" placeholder="Date" value={store.date} onChange={this.inputHandler} />
                        <input name="hour" type="time" placeholder="Hour" value={store.hour} onChange={this.inputHandler} />
                     </div>
                     <div id="location-info">
                        <input name="country" type="text" placeholder="Country" value={store.country} onChange={this.inputHandler} />
                        <input name="city" type="text" placeholder="City" value={store.city} onChange={this.inputHandler} />
                     </div>
                     <input name="venue" type="text" placeholder="Venue" value={store.venue} onChange={this.inputHandler} />
                     <div className="radio-buttons">
                        <input type="radio" id="fixed_price" name="drone" value="fixed_price"
                           checked={!store.isBid} onChange={this.radioButtonChanged} />
                        <label for="fixed_price">Fixed Price</label>
                        <input type="radio" id="bid" name="drone" value="bid"
                           checked={store.isBid} onChange={this.radioButtonChanged} />
                        <label for="bid">Let Them Bid</label>
                     </div>
                     {!store.isBid ?
                        fixedPriceComponent
                        :
                        bidComponent
                     }
                     <input name="additional_info" type="text" placeholder="Additional info" value={store.additional_info} onChange={this.inputHandler} />
                     <input name="num_of_tickets" type="number" placeholder="Number of tickets" value={store.num_of_tickets} onChange={this.inputHandler} />
                  </form>
                  <div className="button">
                     <button onClick={this.saveConcert} class="add-concert-button">Add Concert</button>
                  </div>
               </div>
               <div className="image-container">
                  <img src={img} />
               </div>
            </div>
         </div>)
   }
}
export default NewItem