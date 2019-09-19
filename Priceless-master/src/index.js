import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react'


import { ConcertsStore as concertsStore } from './Stores/ConcertsStore'
import { ConcertStore as concertStore } from './Stores/ConcertStore'
import UserStore from './Stores/UserStore'
import { NewConcertStore as newConcertStore } from './Stores/NewConcertStore'


const ConcertsStore = new concertsStore()
const ConcertStore = new concertStore()
// const UserStore = new userStore()
const NewConcertStore = new newConcertStore()

const stores = {
   ConcertsStore, ConcertStore, UserStore, NewConcertStore
}

ReactDOM.render(<Provider {...stores}> <App /></Provider>, document.getElementById('root'));


serviceWorker.unregister();
