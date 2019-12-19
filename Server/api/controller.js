var express = require('express');
var mongoose = require('mongoose');
postModel = mongoose.model('postModel');
var waterfall = require('async-waterfall');

exports.getAllPost = function (req, res) {
    var finalResponse = {};
    var orgData = {};
    var count = req.body.count ? req.body.count : 0;
    var skip = req.body.count * (req.body.page - 1);
    waterfall([
        function (callback) {

            var condition = {};
            condition.isDelete = false;


            if (req.body.postName) {
                condition['postName'] = new RegExp(req.body.postName, 'gi');
            }
            var aggregate = [
                {
                    $match: condition
                },
            ];
            var project = {
                $project: {
                    "_id": "$_id",
                    "postName": "$postName",
                    "postDesc": "$postDesc",
                    "postCategory":"$postCategory",
                    "postStatus":"$postStatus"
                 }
            };

            aggregate.push(project);
            var countQuery = [].concat(aggregate);
            aggregate.push({
                $skip: parseInt(skip)
            });
            aggregate.push({
                $limit: parseInt(count)
            });
            postModel.aggregate(aggregate).then(function (postData) {
                var data = {};
                data.data = postData;
                countQuery.push({
                    $group: {
                        _id: null,
                        count: {
                            $sum: 1
                        }
                    }
                });
                postModel.aggregate(countQuery).then(function (dataCount) {
                    var cnt = (dataCount[0]) ? dataCount[0].count : 0;
                    data.total_count = cnt;
                    callback(null, data);
                });
            }).catch(function (err) {
                callback(err, false);
            });
        },
    ], function (err, data) {
        if (err) {
            res.json({
                code: 201,
                data: {},
                message: "Internal Server Error"
            });
        } else {
            res.json({
                code: 200,
                data: data,
                message: "Data found successfully"
            });
        }
    }
    )
}

exports.addNewPost = function (req, res) {
    var finalResponse = {};
    finalResponse.roleData = {};
    var userObj = {
        postName: req.body.postName,
        postDesc: req.body.postDesc,
        postCategory: req.body.postCategory,
        postStatus: req.body.postStatus

    };
    if (!userObj.postName || !userObj.postDesc || !userObj.postCategory || !userObj.postStatus) {
        res.json({
            code: 400,
            data: {},
            message: "Required Fields is missing"
        });
    } else {
        waterfall([
            function (callback) {
                postModel.findOne({ postName: userObj.postName, isDelete: false }, function (err, postExist) {
                    if (err) {
                        callback(err, false);
                    } else {
                        if (postExist) {
                            res.json({
                                code: 400,
                                data: {},
                                message: "This post is already exist. please try again with different post."
                            });
                        } else {
                            callback(null, finalResponse);
                        }
                    }
                });
            },

            function (finalResponse, callback) {
                var obj = {
                    postName: userObj.postName,
                    postDesc: userObj.postDesc,
                    postCategory: userObj.postCategory,
                    postStatus: userObj.postStatus
                };

                var postRecord = new postModel(obj);
                postRecord.save(function (err, postData) {
                    if (err) {
                        callback(err, false);
                    } else {
                        finalResponse.psotData = postData;
                        callback(null, finalResponse);
                    }
                });

            }
        ], function (err, data) {
            if (err) {
                res.json({
                    code: 201,
                    data: {},
                    message: "Internal Error"
                });
            } else {
                res.json({
                    code: 200,
                    data: data,
                    message: "Post Added Successfully"
                });
            }
        })
    }
}

exports.getPostById = function (req, res) {
    var finalResponse = {};
    finalResponse.postData = {};
    waterfall([
        function (callback) {
            postModel.findOne({ _id: mongoose.Types.ObjectId(req.body.postId) }).exec(function (err, postData) {
                if (err) {
                    callback(err, false);
                } else {
                    finalResponse.postData = postData;
                    callback(null, finalResponse);
                }
            });
        },
    ], function (err, data) {
        if (err) {
            res.json({
                code: 201,
                data: {},
                message: "Internal Error"
            });
        } else {
            res.json({
                code: 200,
                data: data,
                message: "Record Found Successfully"
            });
        }
    });

}

exports.updatePost = function (req, res) {
    var finalResponse = {};
    var postId = mongoose.Types.ObjectId(req.body.id);
    waterfall([
        function (callback) {
            postModel.findOneAndUpdate({
                _id: postId
            }, {
                $set: {
                    postId: req.body.id,
                    postName: req.body.postName,
                    postDesc: req.body.postDesc,
                    postCategory: req.body.postCategory,
                    postStatus: req.body.postStatus

                }
            }, function (err, postData) {
                if (err) {
                    callback(err, false);
                } else {
                    callback(null, finalResponse);
                }
            });
        }

    ], function (err, data) {
        if (err) {
            res.json({
                code: 201,
                data: {},
                message: "Internal Error"
            });
        } else {
            res.json({
                code: 200,
                data: {},
                message: "Post updated successfully!"
            });
        }
    });
}

exports.deletePost = function (req, res) {
    var finalResponse = {};
    waterfall([
        function (callback) {
            postModel.findOneAndUpdate({
                _id: req.body.postId
            }, {
                $set: {
                    isDelete: true,
                }
            }, function (err, postData) {
                if (err) {
                    callback(err, false);
                } else {
                    callback(null, finalResponse);
                }
            });
        },
    ], function (err, data) {
        if (err) {
            res.json({
                code: 201,
                data: {},
                message: "Internal Error"
            });
        } else {
            res.json({
                code: 200,
                data: {},
                message: "Post deleted successfully!"
            });
        }
    });
}