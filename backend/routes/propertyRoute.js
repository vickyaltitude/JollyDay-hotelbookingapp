const express = require('express');
const router = express.Router();
const multer = require('multer');
const Property = require('../models/adminModel/property');
const uploadImagesToAWS = require('../utils/awsconfig');
const jwt = require('jsonwebtoken')

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });


router.post('/admin/addproperty',upload.array('images[]', 10),async (req,res)=>{

    const userToken = req.body.adminToken;
    const jwtVerifiedToken = jwt.verify(userToken,process.env.JWT_TOKEN_SECRET);

   try{


    const uploadedFiles = req.files;
    const uploadPromises = uploadedFiles.map((file) => {
     
     
      return uploadImagesToAWS(file,`/propertyimages/image-${file.originalname}-${Date.now()}`)

    });

    const uploadedResults = await Promise.all(uploadPromises);
    const fileUrls = uploadedResults.map(result => result.Location);

     const newProperty = new Property({
        platformId: jwtVerifiedToken.userId,
        propertyName: req.body.propertyName,
        propertyAddress: req.body.propertyAddress,
        ppn: Number(req.body.ppn),
        roomsAvailable: Number(req.body.roomsAvailable),
        propertyCategory: req.body.propertyCategory,
        propertyImages: fileUrls,
        propertyRules:{
            coupleFriendly: req.body.coupleFriendly.toLowerCase() === 'yes' ? true : false,
            alcoholAllowed: req.body.drinkingAllowed.toLowerCase() === 'yes' ? true : false,
            smokeAllowed: req.body.smokingAllowed.toLowerCase() === 'yes' ? true : false,
            visitorsAllowed: req.body.visitorsAllowed.toLowerCase() === 'yes' ? true : false,
            localIdAllowed: req.body.localIdAllowed.toLowerCase() === 'yes' ? true : false,
            petsAllowed: req.body.petsAllowed.toLowerCase() === 'yes' ? true : false
        }

     })

     const storedNewProperty = await newProperty.save()

     res.json({message:'successfully added new property',storedNewProperty})


  }catch(err){
    
    console.log(err);
    res.json({message:'error while uploading new property into database'})

  }
    


})


router.get('/admin/getproperties',(req,res)=>{
    const adminToken = req.headers.authorization;
    const adminTokenVerified = jwt.verify(adminToken,process.env.JWT_TOKEN_SECRET)
    console.log(adminTokenVerified)

    Property.find({platformId:adminTokenVerified.userId}).then(resp =>{
          console.log(resp)

          res.json({message:"Property fetch success",properties:resp})

    }).catch(err=>{

         console.log(err)

         res.json({message:"Property fetch error"})

    })
})

module.exports = router