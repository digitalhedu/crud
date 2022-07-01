const {Router} = require('express');
const router = Router();
const { index,detail, create, save } = require('../controllers/products.controller');
const multer = require('multer');
const {extname} = require('path')
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads/products');
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    callback(null, file.fieldname + '-' + uniqueSuffix +extname(file.originalname));
  }
});
const upload = multer({storage: storage});
router.get('/', index)
router.get('/detail/:id', detail)
router.get('/create', create)
router.post('/save',[upload.any()],save)
module.exports = router
