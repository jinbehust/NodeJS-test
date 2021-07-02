const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const authenticate = require('../middlewares/authenticate');
const cors = require('../middlewares/cors');

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

uploadRouter.options('/', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });
uploadRouter.get('/', cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, uploadController.getImageFile);
uploadRouter.post('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), uploadController.postImageFile);
uploadRouter.put('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, uploadController.putImageFile);
uploadRouter.delete('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, uploadController.deleteImageFile);

module.exports = uploadRouter;
