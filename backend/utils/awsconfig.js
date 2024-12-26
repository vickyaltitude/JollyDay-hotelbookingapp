const AWS = require('aws-sdk');


function uploadImagesToAWS(imageData,fileName){

    const BUCKET_NAME = 'jollydaydev';
    const IAM_USER_KEY = process.env.IAM_USER_KEY;
    const IAM_USER_SECRET = process.env.IAM_SECRET_KEY;

    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
    })

    const params ={
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: imageData.buffer, 
        ContentType: imageData.mimetype,
        ACL: 'public-read'
    }

    return new Promise((resolve,reject)=>{
        s3bucket.upload(params,(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })

}

module.exports = uploadImagesToAWS;