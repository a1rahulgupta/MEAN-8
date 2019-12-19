
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var placeSchema = Schema({
    postName: { type: String, required: true },
    postDesc: { type: String, required: true },
    postCategory: { type: String, required: true },
    postStatus: { type: String, enum: ['Draft', 'Published'] },
    isDelete:{ type: Boolean, default: false}

}, {
    timestamps: true
});



var postModel = mongoose.model('postModel', placeSchema);

module.exports = postModel;