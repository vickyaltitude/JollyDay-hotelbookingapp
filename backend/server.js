const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const path = require("path");


const dbConnect = require('./utils/dbconnections');


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true
}))

app.use(express.static(path.join(__dirname,'../' ,'adminportal/build')));
app.use(express.static(path.join(__dirname,'../' , 'userportal/build')));

app.get('/client/home',(req,res)=>{
    res.sendFile(path.join(__dirname, "../" , "userportal/build", "index.html"));
})

app.get('/admin/home',(req,res)=>{
    res.sendFile(path.join(__dirname, "../" , "adminportal/build", "index.html"));
})

dbConnect().then(resp =>{

   app.listen(PORT,()=> console.log(`Server is running on Port ${PORT}`))
   
}).catch(error =>{

     console.log(error)

})
