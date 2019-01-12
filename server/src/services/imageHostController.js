import Datauri from 'datauri';
import path from 'path';

const cloudinary = require('cloudinary');
const multer = require('multer');

let storage = multer.memoryStorage();
let upload = multer({ storage: storage });
const dUri = new Datauri();

cloudinary.config({
  cloud_name: 'dj9kc6yib',
  api_key: '423564988423112',
  api_secret: '1hyDl7PPsYNDhu6qmWSOx02ICPA'
});

class ImageHostController {
  dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

  uploadImage(req, callback) {
    let file = this.dataUri(req);
    cloudinary.v2.uploader.upload(file, function(error, result) {
      if (!error) {
        console.log(result);
        callback(result.url);
      } else {
        console.log(error);
      }
    });
  }
}
module.exports = new ImageHostController();
