const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Admins = require('../models/adminModel/adminList');
const generatedToken = require('../utils/jwt');
const multer = require('multer');
const uploadImagesToAWS = require('../utils/awsconfig')

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

router.post('/admin/newadmin',(req,res)=>{

    const newAdminDetails = req.body;
     bcrypt.hash(newAdminDetails.password,10, (err,hash)=>{
        if(err){
            console.log(err)
        }
        else{
 
            Admins.find({ platformId: newAdminDetails.platformId }).then(result =>{
 
              if(result.length){
                 res.json({message: 'User already exist'});
              }else{

                const newAdmin = new Admins({...newAdminDetails,password:hash})

                newAdmin.save().then(resp =>{
  
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

router.post('/admin/checklogin', async (req,res)=>{
    
       const { platformId} = req.body;
       const adminPassword = req.body.password;

     try {
      
       const admin = await Admins.findOne({ platformId});
   
       if (!admin) {
         return res.json({ message: 'Invalid platformId' });
       }
   
       const isMatch = await bcrypt.compare(adminPassword, admin.password);
   
       if (!isMatch) {
         return res.json({ message: 'Invalid password' });
       }
   
      const { password, ...adminWithoutPassword } = admin;
      console.log(admin)
    
       const userDetails = {
         userName : admin.userName,
         userEmail : admin.userEmail,
         userContact: admin.userContact,
         businessAddress: admin.businessAddress,
         ownerName: admin.ownerName,
         platformId: admin.platformId,
         yearsInBusiness: admin.yearsInBusiness,
         ownerContact: admin.ownerContact
       }

       res.json({msg: 'User login successfull',adminAuthToken: generatedToken.encryptuserid(admin._id.toString(),admin.userName,admin.userEmail),userDetails})
   
     } catch (error) {
       console.error(error);
       res.status(500).json({ message: 'Server error' });
     }
})

router.post('/admin/updateadminprofile',upload.single('profilePic'),(req,res)=>{

    try {
        const file = req.file;
    
        if (!file) {


            Admins.findOneAndUpdate({platformId: req.body.platformId}, {
                userName: req.body.userName,
                userContact: req.body.userContact,
                ownerName: req.body.ownerName,
                ownerContact: req.body.ownerContact,
                businessAddress: req.body.businessAddress,
                yearsInBusiness: req.body.yearsInBusiness,
              }, { new: true }).then(resp =>{
                   
                console.log(resp)
                return res.json({ message: 'admin profile update success',userDetails: resp });

              }).catch(err =>{
                 console.log(err)
                return res.json({ message: 'error updating admin profile' });

              });


          
        }else{

            uploadImagesToAWS(file,`/adminprofilepic/image-${req.body.platformId}-${Date.now()}`).then(resp =>{
                 let imageUrl = resp.Location;

                 Admins.findOneAndUpdate({platformId: req.body.platformId}, {
                    profilePic: imageUrl,
                    userName: req.body.userName,
                    userContact: req.body.userContact,
                    ownerName: req.body.ownerName,
                    ownerContact: req.body.ownerContact,
                    businessAddress: req.body.businessAddress,
                    yearsInBusiness: req.body.yearsInBusiness,
                  }, { new: true }).then(resp =>{

                     console.log(resp)
                    return res.json({ message: 'admin profile update success',userDetails: resp });

                  }).catch(err =>{
                    console.log(err)
                    return res.json({ message: 'error updating admin profile with pic' });

                  })


            }).catch(err =>{

                console.log(err)
                    return res.json({ message: 'error updating admin profile with pic' });

            })

        }
    
    
       
      } catch (error) {
        console.error('Error uploading image to S3:', error);
        res.status(500).json({ message: 'Error uploading image to S3' });
      }

})


module.exports = router;