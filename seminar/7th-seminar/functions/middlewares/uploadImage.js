const admin = require('firebase-admin');
const functions = require('firebase-functions');
// 이걸 이용해서 이미지 업로드 구현, multer은 s3 쓸 땐 적합한데 파베랑은 조금 안맞음
const BusBoy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');
const dayjs = require('dayjs');
const { firebaseConfig } = require('../config/firebaseClient');
const util = require('../lib/util');
const statusCode = require('../constants/statusCode');
const responseMessage = require('../constants/responseMessage');

const uploadImage = (req, res, next) => {
  const busboy = new BusBoy({ headers: req.headers });

  let imageFileName = {};
  let imagesToUpload = [];
  let imageToAdd = {};
  let imageUrls = [];

  let fields = {};

  // busboy.on -> 조건 ) 이런 것들 들어왔을 때 이렇게 해라 하는 조건들
  // req.body로 들어오는 key:value 페어들을 처리
  busboy.on('field', (fieldName, val) => {
    fields[fieldName] = val;
  });

  // req.body로 들어오는 게 파일일 경우 처리
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      return res.status(400).json({ error: 'Wrong file type submitted' });
    }
    // my.image.png => ['my', 'image', 'png']
    const imageExtension = filename.split('.')[filename.split('.').length - 1];
    // 32756238461724837.png
    imageFileName = `${dayjs().format('YYYYMMDD_HHmmss_')}${Math.round(Math.random() * 1000000000000).toString()}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToAdd = { imageFileName, filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
    // imagesToUpload에 사전 처리가 된 애들이 있을 것
    imagesToUpload.push(imageToAdd);
  });

  // req.body로 들어온 파일들을 Firebase Storage에 업로드
  busboy.on('finish', async () => {
    let promises = [];
    imagesToUpload.forEach((imageToBeUploaded) => {
      imageUrls.push(`https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageToBeUploaded.imageFileName}?alt=media`);
      // 실제로 파일을 업로드하는 코드
      promises.push(
        admin
          .storage()
          .bucket(firebaseConfig.storageBucket)
          .upload(imageToBeUploaded.filepath, {
            resumable: false,
            metadata: {
              metadata: {
                contentType: imageToBeUploaded.mimetype,
              },
            },
          }),
      );
    });

    try {
      await Promise.all(promises);
      req.body = fields;
      req.imageUrls = imageUrls;
      next();
    } catch (err) {
      console.error(err);
      functions.logger.error(`[FILE UPLOAD ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`);
      return res.status(500).json(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
  });

  busboy.end(req.rawBody);
};

module.exports = uploadImage;
