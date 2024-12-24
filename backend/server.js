const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const cors = require('cors');
const PORT = process.env.PORT || 8000;

const dbConnect = require('./utils/dbconnections');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true
}))

dbConnect().then(resp =>{

   app.listen(PORT,()=> console.log(`Server is running on Port ${PORT}`))
   
}).catch(error =>{

     console.log(error)

})
