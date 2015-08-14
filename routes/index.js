var express = require('express');
var multer = require('multer');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})

var upload = multer({ storage: storage });

var cpUpload = upload.single('postImg');

var router = express.Router();

var titleController = require('../controllers/title_controller');
var courseController = require('../controllers/course_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.param('titleId', titleController.load)
router.param('courseId', courseController.load)



router.get('/upload', function(req,res){

	res.render('upload');


});
router.post('/createpost', cpUpload, function(req,res){

  console.log(req.file);
  res.redirect('/');

});





router.get('/verify',titleController.verify);

router.get('/login',sessionController.index);
router.post('/login',sessionController.login);
router.get('/logout',sessionController.destroy);

router.get('/admin',sessionController.loginRequired);
router.get('/titles',sessionController.loginRequired);
router.get('/titles/*',sessionController.loginRequired);


router.get('/courses',sessionController.loginRequired);
router.get('/courses/:courseId(\\d+)/show', courseController.show)

router.get('/admin', titleController.admin_panel);
router.get('/titles', titleController.get_titles);
router.get('/titles/:titleId(\\d+)/render', titleController.render);
router.delete('/titles/:titleId(\\d+)',titleController.delete);
router.get('/titles/:titleId(\\d+)/edit', titleController.edit);

router.get('/dummy',sessionController.loginRequired, titleController.create_dummy);
router.put('/admin/add_title', titleController.add_title);

router.put('/admin/add_course', courseController.add_course);
router.get('/courses', courseController.get_courses);
//router.get('/admin/add_title', titleController.add_title);

module.exports = router;
