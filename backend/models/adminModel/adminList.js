const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Admins = new Schema({
     platformId:{
        type: String,
        required: true
     },
     userName: {
        type: String,
        required: true
     },
     userEmail:{
        type: String,
        required: true
     },
     userContact:{
        type: Number,
        required: true
     },
     businessAddress:{
        type: String,
        required: true
     },
     ownerName:{
        type: String,
        required: true
     },
     yearsInBusiness:{
        type: Number,
        required: true
     },
     ownerContact:{
        type: Number,
        required: true
     },password:{
        type: String,
        required: true
     },
     profilePic:{
        type: String
     }
})

module.exports = mongoose.model('Admins',Admins)