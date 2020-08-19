var express = require('express');
var multer = require('multer');
const { testMask } = require('../app/FaceMask');
var router = express.Router();
var upload  = multer({ dest : 'tmp' })


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/face-mask' , upload.single('image') ,  testMask)

module.exports = router;
