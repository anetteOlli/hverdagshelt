import Datauri from 'datauri';
import path from 'path';

const cloudinary = require('cloudinary');
const multer = require('multer');

let upload = multer({storage: multer.memoryStorage()});
const dUri = new Datauri();

cloudinary.config({
  cloud_name:'dj9kc6yib',
  api_key:'423564988423112',
  api_secret:'1hyDl7PPsYNDhu6qmWSOx02ICPA'
  }
);

class ImageHostController {
  dataUri = req => dUri.format(path.extname(req.files[0].originalname).toString(), req.files[0].buffer);

  uploadImage(req,callback) {

    let file = this.dataUri(req);
    cloudinary.v2.uploader.upload(file.content,
      function(error, result) {
        if(!error){
          callback(result.url);
        }else {
          console.log(error);
        }

      }
    );
  }
}
module.exports = new ImageHostController();
