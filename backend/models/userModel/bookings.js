const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bookings = new Schema({
      userId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
      },
      platformId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Admins'
      },
      numberOfRooms:{
        type: Number,
         required: true
      },
      numberOfGuests:{
        type: Number,
        required: true
      },
      startingDate:{
        type: Date,
        required: true
      },
      endingDate:{
        type: Date,
        required:true
      },
      totalCost:{
        type: Number,
        required: true
      },
      propertyId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Property'
      },
      bookingStatus:{
        type: String,
        required: true
      }
})



module.exports = mongoose.model('Bookings',Bookings);