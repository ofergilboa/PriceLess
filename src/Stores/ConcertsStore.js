
import { observable, computed, action } from 'mobx'
import axios from 'axios';

export class ConcertsStore {
    @observable concerts = []
    @observable formInputs = {}

    constructor() {
        this.formInputs = {
            artist: '',
            city: '',
            dateFrom: '',
            dateTo: '',
            priceTo: '',
            minTickets: ''
        }
    }

    @action getConcerts = async () => {
            const response = await axios.get(`http://localhost:5000/concerts/`)
             this.concerts = [...response.data]
        //     Get all concerts,array of objects.
        //     Each contains: {concertId, artists, number of tickets,date,price,image}
        // Optional query: artist, city, dateFrom, dateTo, priceFrom, priceTo, minTickets
    }

    //in UserStore
    @action addToFavorite = (concertId) => {
        // (post “/favorite/:userId/:concertId”)
    }
    @action handleInput = (name, value) => {
        this.formInputs[name] = value
    }
    @action search = async () => {
        
        const response = await axios.get(`http://localhost:5000/concerts`, { params : {
            artist: this.formInputs["artist"],
            city: this.formInputs["city"],
            dateFrom: this.formInputs["dateFrom"],
            dateTo: this.formInputs["dateTo"],
            priceTo: this.formInputs["priceTo"],
            minTickets: this.formInputs["minTickets"]
        }} )
           

             this.concerts = [...response.data]

        // console.log(`SEARCH: 
        //  artist: ${this.formInputs["artist"]}, 
        //  city: ${this.formInputs["city"]}, 
        //  dateFrom: ${this.formInputs["dateFrom"]}, 
        //  dateTo: ${this.formInputs["dateTo"]}
        //  minTickets: ${this.formInputs["minTickets"]},  
        //  priceTo: ${this.formInputs["priceTo"]}, `)
    }

}



