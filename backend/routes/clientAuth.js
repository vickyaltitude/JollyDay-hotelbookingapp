const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const Users = require('../models/userModel/user');
const generatedToken = require('../utils/jwt');


router.post('/client/newuser',(req,res)=>{
     console.log(req.body)
     const newClientDetails = req.body;

      bcrypt.hash(newClientDetails.password,10, (err,hash)=>{

             if(err){
                 console.log(err)
             }
             else{
      
                Users.find({ userEmail: newClientDetails.email }).then(result =>{
      
                   if(result.length){

                      res.json({message: 'User already exist'});

                   }else{
     
                     const newUser = new Users({
                         userName: newClientDetails.username,
                         userEmail: newClientDetails.email,
                         userPassword: hash,
                         userContact: newClientDetails.contact
                     })
     
                     newUser.save().then(resp =>{
       
                       res.json({message: 'User creation success'}) 
       
                     }).catch(err =>{
       
                         console.log(err)
                         res.json({message: 'Something went wrong with our database... please try again'})

                     })
     
                   }
      
            
             })
      
         
             }
      
          })
   
})

router.post('/client/userlogin',async (req,res)=>{

     const { email,password} = req.body;
    
         try {
          
           const client = await Users.findOne({userEmail: email});
       
           if (!client) {
             return res.json({ message: 'Invalid Email' });
           }

         
       
           const isMatch = await bcrypt.compare(password, client.userPassword);
       
           if (!isMatch) {
             return res.json({ message: 'Invalid password' });
           }
       
        
           const clientDetails = {
             userName : client.userName,
             userEmail : client.userEmail,
             userContact: client.userContact,
             
           }
    
           res.json({message: 'User login successfull',clientAuthToken: generatedToken.encryptuserid(client._id.toString(),client.userName,client.userEmail),clientDetails})
       
         } catch (error) {
           console.error(error);
           res.status(500).json({ message: 'Server error' });
         }
})

module.exports = router