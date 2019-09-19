import { observable, computed, action } from 'mobx'
import axios from 'axios';
import UserStore from './UserStore'
import { async } from 'q';

export class ConcertStore {
    @observable concert
    @observable bid

    constructor() {
        this.concert = {
            // id: 111,
            // artist: "Lola marsh",
            // date: "13/03/20",
            // country: "Israel",
            // city: "Tel aviv",
            // venue: "Barbi",
            // num_of_tickets: 2,
            // asked_price: 30,
            // original_price: 50,
            // additional_info: "great show!!!",
            // seller: 123,
            // status: "active",
            // img_url: "https://www.zappa-club.co.il/download/showPic/show_pic6773_img.jpg",
        }
        // ends_at


    }
    @action getConcert = async (concertId) => {
        // get(‘/concert:/concertId’)
        // Return specific concert
        const response = await axios.get(`http://localhost:5000/concert/${concertId}/${UserStore.user.id}`)

        this.concert = { ...response.data }
        this.concert.id = concertId
        // console.log(response.data)

    }
    @action handleBid = (value) => {
        this.bid = value

        // const { amount, concertID, bidder } = req.body

    }

    @action makeBid = async () => {
        console.log("store makeBid")
        // await axios.post(`http://localhost:5000/concert`, concert)
        // console.log("amount" + this.bid)
        // console.log("concertId" + this.concert.id)
        // console.log("bidder" + UserStore.user.id)
        await axios.post(`http://localhost:5000/bid`, {
            amount: this.bid,
            concertID: this.concert.id,
            bidder: UserStore.user.id
        })
    }


}



