const AWS = require('aws-sdk')
const fs = require('fs');

const s3 = new AWS.S3({
  region: 'us-east-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

var params = {
  Bucket: 'abibas-pictures',
}

const fetchUrls = () => {

  return new Promise ((resolve, reject) => {
  return  s3.listObjects(params, (err, results) => {
      if(err) {
        reject(err);
      } else {
          var imageUrls = [];
          results.Contents.forEach(item => {
            const url = `https://abibas-pictures.s3.us-east-2.amazonaws.com/${item.Key}`;
            imageUrls.push(url);
          });
        return resolve(imageUrls)
      }
    })
  })
}

fetchUrls()
  .then(data => {
    fs.writeFileSync('./imageURLs.json',JSON.stringify(data))
  })
module.exports = {fetchUrls};