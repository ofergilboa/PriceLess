import React, { Component, useState, useRef, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import Navbar from './Components/Navbar/Navbar'
import Main from './Components/Main/Main';
import NewItem from './Components/NewItem/NewItem';
import Concerts from './Components/Main/Concerts/Concerts';
import ConcertBox from './Components/Main/ConcertBox/ConcertBox';
import ConcertPage from './Components/ConcertPage/ConcertPage';
import SearchBar from './Components/Main/SearchBar/SearchBar';
import Favorites from './Components/Main/Favorites/Favorites';
import Account from './Components/Account/Account';
import Login from './Components/Login/Login';

@inject("UserStore")
@observer
class App extends Component {

   logout = () => {
      console.log("logout")
      this.props.UserStore.logout()
   }
   render() {

      return (
         <div>
            {this.props.UserStore.user.id ?
               <Router >
                  <div className="App">
                     <Navbar logout={this.logout} />
                     <Route exact path="/" render={() => <Main />} />
                     {/* <Main /> */}
                     <Route exact path="/newitem" render={() => <NewItem />} />
                     {/* <NewItem /> */}
                     <Route path="/concert/:id" render={({ match }) => <ConcertPage match={match} />} />
                     <Route path="/favorites" render={({ match }) => <Favorites match={match} />} />
                     <Route exact path="/myAccount" render={() => <Account />} />

                     {/* <ConcertPage /> */}
                  </div>
               </Router> :
               <Login />
            }

         </div>
      );
   }
}
export default App;
