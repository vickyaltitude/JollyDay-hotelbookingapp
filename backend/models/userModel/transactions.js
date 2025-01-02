const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Transaction = new Schema({
   
    orderId: {
        type: String,
        required: true
    },
    bookingId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Bookings'
      },
      status:{
        type: String,
        required: true
      },
      userName:{
        type: String,
        required: true
      },
      paymentId:{
        type: String
      }

})

module.exports = mongoose.model('Transactions',Transaction);