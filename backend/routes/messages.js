var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

const CheckAuth = require("../middleware/CheckAuth");
var User = require('../models/user');
var Message = require('../models/message');

router.post("", CheckAuth, (req, res, next) => {

  const message = new Message({
    content: req.body.content,
    creator: req.userData.userId
  })

  message.save().then(createdPost => {
    res.status(201).json(
      {
        message: "Message added Successfully"
      }
    );
  }).catch(error => {
    res.status(500).json(
      {
        message: "Creating a message failed! "
      }
    )
  })
})
module.exports = router;
