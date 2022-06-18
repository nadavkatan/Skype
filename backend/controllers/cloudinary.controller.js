const cloudinary = require("../config/cloudinary.config").v2;
const streamifier = require("streamifier");

const streamUpload = (file, publicID, folder) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          public_id: publicID,
          folder: folder,
          overwrite: true,
        },(err, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
      streamifier.createReadStream(file.buffer).pipe(stream);
    });
  };

  const uploadFile = async (file, publicId, folder) => {
    try{
        const uploadedFile = await streamUpload(file, publicId, folder);
        return uploadedFile
    }catch(err) {
        console.log(err)
    }
};

module.exports = {uploadFile}