import React, { Component } from 'react'
import ConcertBox from './ConcertBox/ConcertBox';
import SearchBar from './SearchBar/SearchBar';
import Concerts from './Concerts/Concerts'
import './Main.css'
import ConcertPage from '../ConcertPage/ConcertPage';

class Main extends Component {
   render() {
      return (
         <div className="main">
            <SearchBar />
            <Concerts/>
         </div>
         )
   }
}
export default Main