const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Property = new Schema({

    platformId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Admins'
    },

     propertyName:{
        type: String,
        required:true
     },
     propertyAddress:{
        type: String,
        required: true
     },
     ppn: {
        type: Number,
        required: true
     },
     roomsAvailable:{
        type: Number,
        required: true
     },
     propertyCategory:{
        type: String,
        required: true
     },
     propertyImages:[
        {
          type: String, 
          required: true,
        }
      ],
     propertyRules:{
        coupleFriendly:{
            type: Boolean,
            required: true
        },
        alcoholAllowed:{
            type: Boolean,
            required: true
        },
        smokeAllowed:{
            type: Boolean,
            required: true
        },
        visitorsAllowed:{
            type: Boolean,
            required: true
        },
        localIdAllowed:{
            type: Boolean,
            required: true
        },
        petsAllowed:{
            type: Boolean,
            required: true
        }
     }


})

module.exports = mongoose.model('Property',Property)