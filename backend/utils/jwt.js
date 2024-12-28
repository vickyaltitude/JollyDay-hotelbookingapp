const jwt = require('jsonwebtoken')

exports.encryptuserid = (id,name,email) =>{
 

    return jwt.sign({userId: id, userName : name,userEmail: email},process.env.JWT_TOKEN_SECRET);
  
  
  }