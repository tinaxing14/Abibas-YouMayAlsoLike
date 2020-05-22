
const AWS = require('aws-sdk')

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

const imageArr = 
['https://abibas-pictures.s3.us-east-2.amazonaws.com/B75807_00_plp_standard.png',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/BY4027_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/EE4394_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/EF6883_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/EG0420_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/EG0713_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/EG0714_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/EG0716_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/EG0718_00_plp_standard (1).jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/EG0718_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/EG0722_00_plp_standard.png',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/EG0746_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/EG0747_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/EG0752_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/EG0762_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/EG4958_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/EG4959_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/EG4960_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/EH1543_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/EH2038_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/FU8498_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/FV2809_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/FV2811_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/FV2814_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/FV3021_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/FV3286_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/FV3299_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/FV4653_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/FW5477_00_plp_standard.jpg',
'https://abibas-pictures.s3.us-east-2.amazonaws.com/FX3600_00_plp_standard.jpg']

module.exports = {imageArr, fetchUrls};