const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const bucket = storage.bucket('hverdagshelt');

class ImageHostController {

  checkFileExists(name) {
    // check if a file exists in bucket
    // https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.39.0/storage/file?method=exists
    bucket.getFiles(function(err, files) {
      if (!err) {
        files.map((file) => {
            if (file.name == name) {
              return true;
            }
          }
        )
      }
    });
  }

  uploadFile(path) {
      bucket.upload(path, function(err, file, apiResponse) {

      });
  }
/*
  getFileUrl(name) {
  // get public url for file
    var getPublicThumbnailUrlForItem = file_name => {
      return `https://storage.googleapis.com/${BUCKET_NAME}/${file_name}`
    };
  }*/

}

module.exports = new ImageHostController();