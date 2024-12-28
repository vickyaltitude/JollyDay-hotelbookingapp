const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")
const Property = require('../models/adminModel/property');
const Bookings = require('../models/userModel/bookings');


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
     
    Bookings.find().populate('propertyId') 
  .then(resp => {
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


module.exports = router