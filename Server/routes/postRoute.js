
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
postModel = mongoose.model('postModel');
var postCtrl = require("../api/controller");


router.post('/getAllPost', postCtrl.getAllPost);
router.post('/addNewPost', postCtrl.addNewPost);
router.post('/getPostById', postCtrl.getPostById);
router.post('/updatePost', postCtrl.updatePost);
router.post('/deletePost', postCtrl.deletePost);


module.exports = router;

