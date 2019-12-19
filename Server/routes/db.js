
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

require('../models/postModel');


var uri = 'mongodb://localhost:27017/postProject';


mongoose.connect(uri,{ useNewUrlParser: true ,useUnifiedTopology: true }, function(error) {
  if(error){
    console.log('connection failed!')
  }else{
    console.log("Database connected successfully!");
  }
});