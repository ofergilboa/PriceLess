import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import './SearchBar.css'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import DatePicker from './DatePicker'
const moment = require('moment')
const slider = require('react-rangeslider')

@inject("ConcertsStore")
@observer
class SearchBar extends Component {

   handleInput = (e) => {
      this.props.ConcertsStore.handleInput(e.target.name, e.target.value)
   }

   handlePriceChange = (value) => {
      this.props.ConcertsStore.handleInput('priceTo', value)
   }

   handleDateChange = (range) => {
      this.props.ConcertsStore.handleInput("dateFrom", moment(range.from).format('YYYY-MM-DD  00:00:00'))
      this.props.ConcertsStore.handleInput("dateTo", moment(range.to).format('YYYY-MM-DD  23:59:59'))

   }
   render() {
      let store = this.props.ConcertsStore.formInputs
      return (
         <div className="search-bar search-container">
            <div id="search-bar-header">Search By</div>
            <div className="input-container">
               <div>Artist </div><input className="input-type" type="text" name="artist"
                  placeholder="Enter Artist.."
                  value={store.artist}
                  onChange={this.handleInput} />
            </div>
            <div className="input-container">
            <div>City</div><input className="input-type" type="text" id="city" name="city" placeholder="Enter city.."
                  value={store.city}
                  onChange={this.handleInput} />
            </div>
            <div className='slider'>
               Max price:           ${store.priceTo}

               <Slider
                  min={0}
                  max={400}
                  value={store.priceTo}
                  onChange={this.handlePriceChange}
               />
            </div>
            <div className="input-container">number of tickets<input className="input-type" type="number" id="minTickets" name="minTickets" min="1"
                  value={store.minTickets}
                  onChange={this.handleInput} />
            </div>

            <div>


               <DatePicker handleDateChange={this.handleDateChange}/>
            </div>

            {/* <button onClick={this.props.ConcertsStore.search}>search</button> */}
            <a onClick={this.props.ConcertsStore.search} className="brk-btn">Search</a>
         </div>)
   }
}
export default SearchBar