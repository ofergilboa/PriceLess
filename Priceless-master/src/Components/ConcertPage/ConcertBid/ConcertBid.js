import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import './ConcertBid.css'
import moment from 'moment';

import 'moment-timezone';

// const moment = require('moment')

@inject("ConcertStore")
@observer

class ConcertBid extends Component {
    constructor() {
        super()
        this.interval = 0
        this.state = {
            timer: undefined
        }
    }

    componentDidMount() {
        this.setState({ timer: this.props.ConcertStore.concert.ends_at })
        this.countdown()
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }
    countdown = (e) => {
        let time = moment(this.props.ConcertStore.concert.ends_at).subtract(3, 'hours').format('DD-MM-YYYY HH:mm:ss')
        let currTime = moment().format('DD-MM-YYYY HH:mm:ss')

        var eventTime = moment(time, 'DD-MM-YYYY HH:mm:ss').unix(),
            currentTime = moment(currTime,'DD-MM-YYYY HH:mm:ss').unix(),
            diffTime = eventTime - currentTime,
            duration = moment.duration(diffTime * 1000, 'milliseconds'),
            intervalTime = 1000;

        // if time to countdown
        if (diffTime > 0) {
            this.interval = setInterval(() => {
                duration = moment.duration(duration.asMilliseconds() - intervalTime, 'milliseconds');
                var d = moment.duration(duration).days(),
                    h = moment.duration(duration).hours(),
                    m = moment.duration(duration).minutes(),
                    s = moment.duration(duration).seconds();
                this.setState({ timer: `${d}:${h}:${m}:${s}` })
            }, intervalTime);
        } else {
            console.log("TIME is PASSED!!!!")
        }
    };

    handleBid = (e) => {
        this.props.ConcertStore.handleBid(e.target.value)
    }
    makeBid = () => {
        this.props.ConcertStore.makeBid()
    } 


    render() {
        return (
            
            <div className="display">
              <div className="glow ">

            <div className="concert-bid">
                <input id="bid" type="number" placeholder="$" value={this.props.ConcertStore.bid} onChange={this.handleBid}></input>
                <div className="bidButton" onClick={this.makeBid}>Make a bid!</div>
                <div className="timeBid">Bid ends in <br></br><span id="bidTime">{this.state.timer}</span></div>
                <div className="lastBid">{this.props.ConcertStore.concert.user_highest_bid ? "Your last bid is " + this.props.ConcertStore.concert.user_highest_bid + "$" : null}</div>
            </div>
            </div>
            </div>)
    }
}
export default ConcertBid