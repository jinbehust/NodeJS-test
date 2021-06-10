const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const authenticate = require('../middlewares/authenticate');

const uploadController = require('../controllers/uploadController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('You can upload only image files!'), false);
  }
  return cb(null, true);
};

const upload = multer({ storage, fileFilter: imageFileFilter });

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.get('/', uploadController.getImageFile);
uploadRouter.post('/', authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), uploadController.postImageFile);
uploadRouter.put('/', authenticate.verifyUser, authenticate.verifyAdmin, uploadController.putImageFile);
uploadRouter.delete('/', authenticate.verifyUser, authenticate.verifyAdmin, uploadController.deleteImageFile);

module.exports = uploadRouter;
