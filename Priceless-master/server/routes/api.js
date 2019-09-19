const Sequelize = require('sequelize')
const express = require('express')
const router = express.Router()
const moment = require('moment')
const axios = require('axios')
const sequelize = new Sequelize('mysql://root:@localhost/priceless')
const cron = require('node-cron')
const sendMailFunc = require("./../send-email")

// *****checking the connection******

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     })

// *********post new concert*********

// sendMailFunc("hadaralon3@gmail.com")

const cronJobs = {}


const findArtistImg = async artist => {
    try {
        let images = await axios.get(`https://api.cognitive.microsoft.com/bing/v7.0/images/search/?q=${artist}%20concert&minHeight=1500&aspect=Wide&maxFileSize=200000`, { headers: { "Ocp-Apim-Subscription-Key": 'b88c6f95fe6d430d851bccea76ad2012' } })
        if (!images.data.value.length) {
            images = await axios.get(`https://api.cognitive.microsoft.com/bing/v7.0/images/search/?q=${artist}%20concert&minHeight=1200&aspect=Wide&maxFileSize=200000`, { headers: { "Ocp-Apim-Subscription-Key": 'b88c6f95fe6d430d851bccea76ad2012' } })
            if (!images.data.value.length) {
                images = await axios.get(`https://api.cognitive.microsoft.com/bing/v7.0/images/search/?q=${artist}%20concert&minHeight=900&aspect=Wide&maxFileSize=200000`, { headers: { "Ocp-Apim-Subscription-Key": 'b88c6f95fe6d430d851bccea76ad2012' } })
                if (!images.data.value.length) {
                    images = await axios.get(`https://api.cognitive.microsoft.com/bing/v7.0/images/search/?q=${artist}&maxFileSize=300000`, { headers: { "Ocp-Apim-Subscription-Key": 'b88c6f95fe6d430d851bccea76ad2012' } })
                }
            }
        }
        return images.data.value.length ? images.data.value[0].contentUrl : 'http://freshlytechy.com/wp-content/uploads/2013/04/EVNTLIVE-Offers-Live-Concert-Streaming-Platform.jpg'
    }
    catch (err) {
        const img_url_arr = ["https://www.signbuyer.co.uk/ekmps/shops/bracey77/images/live-show-neon-sign-1-3158-p.jpg", "http://appreciationatwork-media.s3.amazonaws.com/uploads/2016/04/concert-crowd-crop.jpg", "https://ep01.epimg.net/verne/imagenes/2015/10/18/articulo/1445171361_981733_1445201957_noticia_normal.jpg"]
        var randNum = Math.floor(Math.random() * img_url_arr.length) + 0
        console.log("Random pic");
        return img_url_arr[randNum]
         
    }
}
const findSeller = concertID => {
    return sequelize.query(`
        SELECT u.id, u.name, u.email, u.phone_number
        FROM
            concert c
            INNER JOIN
            user u ON c.seller = u.id
        WHERE c.seller = ${concertID}
    ;`)
        .then(result => result[0][0])
}

const fetchSellerInfo = seller => {
    return sequelize.query(`
    SELECT *
    FROM
        user
    WHERE id = ${seller}
;`)
        .then(result => result[0][0])
}

router.get('/user/:email/:password', (req, res) => {//need to change to: get('/user/:email:/:password'
    const email = req.params.email
    const password = req.params.password //need to change to password
    sequelize.query(`
        SELECT
            *
        FROM user
        WHERE
            email = '${email}'
    ;`)
        .spread((result, metadata) => {
            console.log(result)
            if (!result[0]) {
                console.log("ERROR! didn't find user with this email")
                res.send(false)
            }
            if (result[0].password === password) {
                console.log("user found! entering the website")
                res.send(result[0])
            } else {
                console.log('password dont match')
                res.send(false)
            }
        })
})



const findTopBidders = concertID => {
    return sequelize.query(`
        SELECT MAX(amount) AS amount, u.*
        FROM
            bid b
            INNER JOIN
            user u ON b.bidder = u.id
        WHERE
            b.concert_id = ${concertID}
        GROUP BY bidder
        ORDER BY amount DESC
        LIMIT 5
    ;`)
        .then(result => {
            if (result[0].length) {
                return result[0]
            } else {
                return 0
            }
        })
}

findTopBidders(5)
let concertsWithBids = []

const activateBids = () => {
    //get all concert that has bid and their time didnt passed
    let dataQuery = `
        SELECT
            *
        FROM concert
        WHERE
            is_bid = '1'
            AND
            ends_at >= NOW()+ interval 3 hour
        ORDER BY ends_at
    ;`
    sequelize
        .query(dataQuery)
        .spread(function (results, metadata) {
            concertsWithBids = [...results]
        }).then(r => {
            for (let concert of concertsWithBids) {
                let endTime = moment.utc(concert.ends_at, "Asia/Jerusalem").format('HH:mm')
                let endDate = moment(concert.ends_at).format('YYYY-MM-DD')
                startCronJob(concert.id, endTime, endDate, concert.seller, concert)
            }
        })
}

activateBids()
const startCronJob = (concertID, endTime, endDate, seller, concertInfo) => {
    console.log("start cron job-> " + endTime + " " + endDate)
    endTime = endTime.split(':')
    endDate = endDate.split('-')
    const mins = endTime[1],
        hours = endTime[0] == '00' ? '23' : Number(endTime[0]) - 1,
        day = endDate[2],
        month = endDate[1]

    concertInfo.id = concertID

    cronJobs[concertID] = cron.schedule(`${mins} ${hours} ${day} ${month} *`, async () => {
        console.log('cron.schedule')
        let topBidders = await findTopBidders(concertID)
        sendMailFunc(seller, topBidders, concertInfo)
    }, { timezone: 'Asia/Jerusalem' })
}

// POST NEW CONCERT + BIDDABLE (IF NEEDED)
router.post('/concert', async (req, res) => {
    const { artist, date, hour, country, city, venue, num_of_tickets, asked_price, original_price, additional_info, seller, isBid, bid_end_date, bid_end_time } = req.body
    console.log();

    let bidTime = await isBid ? `${bid_end_date} ${bid_end_time}:00` : `${date} ${hour}:00`
    // const img_url_arr = ["https://www.signbuyer.co.uk/ekmps/shops/bracey77/images/live-show-neon-sign-1-3158-p.jpg" , "http://appreciationatwork-media.s3.amazonaws.com/uploads/2016/04/concert-crowd-crop.jpg" , "https://ep01.epimg.net/verne/imagenes/2015/10/18/articulo/1445171361_981733_1445201957_noticia_normal.jpg"]
    // var randNum = Math.floor(Math.random() * img_url_arr.length) + 0
    // let img_url = img_url_arr[randNum] 
    //  console.log(img_url);

    const img_url = await findArtistImg(artist)

    const newConcert = await sequelize.query(`
        INSERT INTO concert ( artist, date, country, city , venue, num_of_tickets, asked_price, original_price, additional_info, seller, status, img_url, uploaded_at, is_bid, ends_at)
        VALUES ( '${artist}', '${date} ${hour}:00' , 
        '${country}', '${city}', '${venue}', ${num_of_tickets}, 
        ${asked_price}, ${original_price}, '${additional_info}', 
        ${seller} , 'active', '${img_url}', '${moment().format('YYYY-MM-DD  HH:mm:ss')}',
         ${isBid}, '${bidTime}')
        ;`)
    res.send(newConcert)

    const concertID = newConcert[0]
    if (isBid) {
        const sellerInfo = await fetchSellerInfo(seller)
        startCronJob(concertID, bid_end_time, bid_end_date, sellerInfo, req.body);
    }
})

// GET ALL/FILTERED CONCERTS
router.get('/concerts', function (req, res) {
    let query = req.query
    const queries = []
    query.artist ? queries.push(`artist = '${query.artist}'`) : null
    query.city ? queries.push(`city = '${query.city}'`) : null
    query.dateFrom && query.dateTo ? queries.push(`date BETWEEN '${query.dateFrom}' AND '${query.dateTo}' `) : null
    query.priceTo ? queries.push(`asked_price <= ${query.priceTo} `) : null
    query.minTickets ? queries.push(`num_of_tickets >= ${query.minTickets}`) : null


    let dataQuery = `
        SELECT
            id, artist, num_of_tickets, date, asked_price, original_price, img_url, city
        FROM concert
        WHERE
            status = 'active'
            AND
            date > NOW()+ interval 3 hour
            ${queries.length ? ' AND ' + queries.join(' AND ') : ''}
        ORDER BY date
    ;`

    sequelize
        .query(dataQuery)
        .spread(function (results, metadata) {
            res.send(results)
        })
})

// ******get all or filter by popularity******
// router.get('/popular', function (req, res) {
//     let query = req.query
//     const queries = []
//     query.artist ? queries.push(`artist = '${query.artist}'`) : null
//     query.city ?  queries.push(`city = '${query.city}'`) : null
//     query.dateFrom && query.dateTo ?  queries.push(`DATE(date) BETWEEN '${query.dateFrom}' AND '${query.dateTo}' `) : null
//     query.priceTo ?  queries.push(`asked_price <= ${query.priceTo} `) : null
//     query.minTickets ?  queries.push(`num_of_tickets >= ${query.minTickets}`) : null 


//     let dataQuery = `
//         SELECT
//             id, artist, num_of_tickets, date, asked_price, original_price, img_url
//         FROM
//             concert c
//             INNER JOIN
//             favorite f 
//         WHERE
//             status = 'active'
//             AND
//             DATE(date) > NOW()
//             ${queries.length ? ' AND ' + queries.join(' AND ') : ''}
//         ORDER BY date
//     ;`

//     sequelize
//       .query(dataQuery)
//       .spread(function (results, metadata) {
//             res.send(results)
//       })
// })

// ******get concert******

router.get('/concert/:concertID/:userID', function (req, res) {
    const { concertID, userID } = req.params
    // send is favorite, is bid and last bid
    sequelize.query(`
        SELECT c.*, COUNT(*) AS is_favorite
        FROM
            concert C
            INNER JOIN
            favorite f ON f.concert_id = c.id
        WHERE
            c.id = ${concertID}
            AND
            f.user_id = ${userID}
    ;`)
        .spread((result, metadata) => {
            if (result[0].is_bid) {
                sequelize.query(`
                SELECT MAX(amount) AS amount
                FROM
                    bid b
                WHERE
                    b.concert_id = ${concertID}
                    AND
                    b.bidder = ${userID}
            ;`)
                    .spread((highestBid, metadata) => {
                        result[0].user_highest_bid = highestBid[0].amount
                        res.send(result[0])
                    })
            } else {
                res.send(result[0])
            }
        })
})

router.put('/sold/:concertID', (req, res) => {
    const concertID = req.params.concertID
    sequelize.query(`
    UPDATE concert
    SET status = 'sold'
    WHERE id = ${concertID}
    ;`)
        .spread((result, metadata) => {
            res.send(result)
        })
})

router.put('/delete-concert/:concertID', (req, res) => {
    const concertID = req.params.concertID
    sequelize.query(`
        UPDATE concert
        SET status = 'deleted'
        WHERE id = ${concertID}
    ;`)
        .spread((result, metadata) => {
            res.send(result)
        })
})

router.get('/user-info/:userID', (req, res) => {
    const userID = req.params.userID
    sequelize.query(`
        SELECT *
        FROM user
        WHERE id = ${userID}
    ;`)
        .spread((result, metadata) => {
            res.send(result[0])
        })
})

router.get('/user-concerts/:userID', (req, res) => {
    const user = req.params.userID

    sequelize.query(`
        SELECT
            id, artist, date, country, city, venue, num_of_tickets, asked_price, original_price, additional_info, status, img_url
        FROM concert
        WHERE
            seller = ${user}
            AND
            status != 'deleted'
    ;`)
        .spread((result, metadata) => {
            res.send(result)
        })
})
router.get('/user/:email/:name', (req, res) => {//need to change to: get('/user/:email:/:password'

    const email = req.params.email
    const name = req.params.name //need to change to password

    sequelize.query(`
        SELECT
            *
        FROM user
        WHERE
            email = '${email}'
    ;`)
        .spread((result, metadata) => {
            if (!result[0]) {
                console.log("ERROR! didn't find user with this email")
                res.send(false)
            }
            if (result[0].name === name) {
                console.log("user found! entering the website")
                res.send(result[0])
            } else {
                console.log('names(password) dont match')
                res.send(false)
            }
        })
})

router.post('/favorite/:userID/:concertID', (req, res) => {
    const user = req.params.userID,
        concert = req.params.concertID

    sequelize.query(`
        INSERT INTO favorite (user_id, concert_id)
        VALUES(${user}, ${concert})
    ;`)
        .spread((result, metadata) => {
            res.end(result)
        })
})

// DELETE FROM FAVORITE

router.delete("/favorite/:userID/:concertID", (req, res) => {
    const user = req.params.userID,
        concert = req.params.concertID
    sequelize.query(`
        DELETE FROM favorite 
        WHERE
        user_id = ${user}
        AND
        concert_id = ${concert};
    ;`)
        .spread((result, metadata) => {
            res.send(result)
        })

})
// DELETE FROM TABLE_NAME
// WHERE SOME_CONDITION;


// GET A SPECIFIC USER FAVORITES

router.get('/favorites/:userID', (req, res) => {
    const user = req.params.userID
    sequelize.query(`
        SELECT c.id, artist, c.date, c.country, c.city, c.venue, c.num_of_tickets, c.asked_price, c.original_price, c.additional_info, c.seller, c.img_url
        FROM
            favorite f
            INNER JOIN
            user u ON u.id = f.user_id
            INNER JOIN
            concert c ON c.id = f.concert_id
        WHERE
            status = 'active'
            AND
            f.user_id = ${user}
            AND
            date > NOW()+ interval 3 hour
        ORDER BY date
    ;`)
        .spread((result, metadata) => {
            res.send(result)
        })
})

router.post('/bid', (req, res) => {
    const { amount, concertID, bidder } = req.body
    sequelize.query(`
        INSERT INTO bid (amount, concert_id, bidder)
        VALUES (${amount}, ${concertID}, ${bidder})
    ;`)
        .then(result => {
            res.send(result)
        })
})

module.exports = router