import Datauri from 'datauri';
import path from 'path';

const cloudinary = require('cloudinary');
const multer = require('multer');
const dUri = new Datauri();

cloudinary.config({
  cloud_name: 'dj9kc6yib',
  api_key: '423564988423112',
  api_secret: '1hyDl7PPsYNDhu6qmWSOx02ICPA'
});

const upload = multer({ storage: multer.memoryStorage() });

const imgFilter = (file: multer): void => {
  //reject a file check if a file does not ends with jpg, jpeg, png or gif
  return file.originalname.match(/\.(jpg|jpeg|png|gif)$/);
};

class ImageHostController {
  dataUri = file => dUri.format(path.extname(file.originalname).toString(), file.buffer);

  uploadImage(file, callback) {
    if (!imgFilter(file)) {
      callback({ Error: 'File not accepted' });
    }
    let bufferedFile = this.dataUri(file);
    cloudinary.v2.uploader.upload(bufferedFile.content, function(error, result) {
      if (!error) {
        callback(result.url);
      } else {
        console.log(error);
      }
    });
  }
}
module.exports = {
  ImageHostController: new ImageHostController(),
  uploader: upload.single('image')
};
