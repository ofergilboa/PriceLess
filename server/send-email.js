const nodemailer = require("nodemailer")



let emailSender = function(seller, topBidders, concertInfo){
       console.log("emailSender")
       console.log(seller)
       console.log(topBidders)
       console.log(concertInfo)
       const transporter = nodemailer.createTransport({
              port: 465,
              service:'gmail',
              secure: false,
              auth:{
                     user:'priceless.tickets@gmail.com',
                     pass: 'priceless12345'
              },
       });

       const mailToSeller = {
              from: `priceless.tickets@gmail.com`,
              to: seller.email,
              subject: `Your public auction on Priceless timed out!!`,
              text: `Go on localhost:3000/concert/${concertInfo.id} to see who are the top bidders` // temp text
//               text: topBidders ? `There was no bidders :(` : `
// The auction for ${concertInfo.artist} live concert tickets on ${concertInfo.date} has ended.
// ${topBidders[0].name} is the highest bidder with a ${topBidders[0].amount}$ bid!
// S/he should contact you soon by phone / email, if you want to get those dollars fast you can contact him/her on ${topBidders[0].phone_number} or by email on ${topBidders[0].email}.
// If for some reason things doesn't work out you can contact the next highest bidders using this details:
// ${topBidders.map(b => `
// ${b.name} (${b.amount}$): 0${b.phone_number} - ${b.email}`)}

// You can go to localhost:3000/concert/${concertInfo.id} to checkout the concert details.

// Priceless team.
// `
       };

       transporter.sendMail(mailToSeller, function(error, info){
              if(error){
                     console.log(error);
              } else {
                     console.log('Email sent ' + info.response );
              }
       });
       
       if(topBidders) {
              const mailToWinner = {
                     from: `priceless.tickets@gmail.com`,
                     to: topBidders[0].email,
                     subject: `You've won a public auction on Priceless!!`,
                     text: `Go on localhost:3000/concert/${concertInfo.id} to contact the seller` // temp text
       //               text:`
       // You've submitted the highest bid for ${concertInfo.artist} live concert on ${concertInfo.date}.
       // Hit ${seller.name} up on 0${seller.phone_number} or by email on ${seller.email} to purchase the tickets for the agreed amount of ${topBidders[0].amount}$.
       // You can go to localhost:3000/concert/${concertInfo.id} to checkout the concert details.
       // Have fun!
       
       // Priceless team.
       // `
              };

              transporter.sendMail(mailToWinner, function(error, info){
                     if(error){
                            console.log(error);
                     } else {
                            console.log('Email sent ' + info.response );
                     }
              });
       }
}

module.exports = emailSender
