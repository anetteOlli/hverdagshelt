var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name:'ozaug',
  api_key:'613813645562654',
  api_secret:'KFAfYRrdnj3-XWSlKqvXA-KzsDE'
  }
);


class ImageHostController {
  uploadImage(image,callback) {
    cloudinary.v2.uploader.upload(image,
      function(error, result) {
        if(!error){
          console.log(result);
          callback(result.url);
        }
      }
    );
  }
}
module.exports = new ImageHostController();