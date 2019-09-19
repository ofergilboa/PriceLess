import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
// import './Favorites.css'
import ConcertBox from '../ConcertBox/ConcertBox'
import SearchBar from '../SearchBar/SearchBar';

@inject("UserStore")
@inject("ConcertsStore")
@observer
class Favorites extends Component {

   componentDidMount() {
      this.props.UserStore.getFavorites()
   }

   render() {
      return (
         <div className="main concerts">
            <SearchBar />
            <div className="concerts">
               {this.props.UserStore.favorites.map(c => <ConcertBox key={c.id} concert={c} />)}
               {/* <Link to="/concertpage" className="Concerts"> specifiec Concert </Link> */}
            </div>
         </div>)

   }
}
export default Favorites