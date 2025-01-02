const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")
const Property = require('../models/adminModel/property');
const Bookings = require('../models/userModel/bookings');
const Razorpay = require('razorpay');
const Transaction = require('../models/userModel/transactions');


router.get('/client/allproperty',(req,res)=>{
     
    Property.find().then(resp =>{
         
          res.json({message:'Property fetch success',data:resp})

    }).catch(err =>{

          console.log(err)
          res.json({message:'error fetching property'})
    })
      
})

router.post('/client/newbooking',(req,res)=>{
  
    console.log(req.body)
    const {property,bookingDetails,clientToken} = req.body;
    const userDetail = jwt.verify(clientToken,process.env.JWT_TOKEN_SECRET)
    console.log(clientToken,userDetail)
    const newBooking = new Bookings({
        platformId: property.platformId,
        userId: userDetail.userId,
          numberOfRooms: Number(bookingDetails.numberOfRooms),
          numberOfGuests: Number(bookingDetails.numberOfGuests),
          startingDate: bookingDetails.startingDate,
          endingDate: bookingDetails.endingDate,
          totalCost: bookingDetails.totalCost,
          propertyId: property._id,
          bookingStatus: 'Pending Confirmation'
    })

    newBooking.save()
    .then(savedBooking => {
      
      return savedBooking.populate('propertyId')
      
    })
    .then(populatedBooking => {
      res.json({ 
        message: 'New booking successfully inserted', 
        booking: populatedBooking 
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Error inserting new booking' });
    });
    

})

router.get('/client/getbookingorders',(req,res)=>{
     
    Bookings.find().populate('propertyId').populate('userId')
  .then(resp => {
    console.log(resp)
    res.json({
      message: 'Orders fetch success',
      data: resp,
    });
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'Error while fetching orders' });
  });
})

router.post('/client/clientremovedbooking',(req,res)=>{


     Bookings.findByIdAndUpdate({_id:req.body.id},{$set:{bookingStatus: 'Cancelled by client'}}).then(resp =>{
        res.json({message:'Booking cancelled success'})
     }).catch(err =>{
       console.log(err)
     })

})

router.post('/client/payment',(req,res)=>{

  console.log(req.body)
  const clientToken = req.body.userToken;
  const userDetail = jwt.verify(clientToken,process.env.JWT_TOKEN_SECRET)
    

    let rzp = new Razorpay({
      key_id : process.env.Key_Id,
      key_secret: process.env.key_secret_id
   });
  let amount = req.body.amount * 100;

 
   rzp.orders.create({amount: amount, currency: 'INR'},(err,order)=>{

         if(err){

          console.log(err)
          res.status(500).json({msg: 'error creating new transaction'})

         }else{
         
          Transaction.create({userName: userDetail.userName,orderId:order.id,bookingId: req.body.bookingId,status:'pending'}).then(result =>{

              res.status(200).json({order_details : order,key_id: process.env.Key_Id });

          }).catch(err =>{

              console.log(err);
              res.status(500).json({msg: 'error while inserting into transaction db'})

          })

         
         }
   })

})


router.post('/client/transactionupdate',(req,res)=>{

  console.log(req.body)
       
   if(req.body.payment_id){

    Transaction.findOneAndUpdate({order_id: req.body.order_id},{paymentId : req.body.payment_id,status: "success"}).then(result =>{
          
        Bookings.updateOne({_id: req.body.bookingId},{bookingStatus: 'Confirmed booking'}).then(result =>{

             console.log(result,'transaction update result')
             res.json({msg: 'payment success'});

        })
            
    })

   
   }else{

    Transaction.findOneAndUpdate({order_id: req.body.order_id},{stauts: "failed"}).then( result =>{

         Bookings.updateOne({_id: req.body.bookingId},{bookingStatus: 'Payment failed'}).then(result =>{

             console.log(result,'transaction update result')
             res.json({msg: 'payment failed'});
             
        })

    }).catch( err => {

         console.log(err)

    })

  
   }

})


module.exports = router