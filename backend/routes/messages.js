var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

const CheckAuth = require("../middleware/CheckAuth");

const MessageContent = require('../models/message');

router.post("", CheckAuth, (req, res, next) => {

  const message = new MessageContent({
      title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId
  });


  message.save().then(createdPost => {

    return res.status(201).json({
      message: "Message added successfully",
      post: {
          ...createdPost,
          id: createdPost._id
      }

    });


      }
    ).catch(error => {
      console.log(error);
        return res.status(500).json({
          message: "Creating a message failed!"
        });
      });
  });


router.put(
  "/:id",
  CheckAuth, (req, res, next) => {
    const message = new MessageContent({
      _id : req.body.id,
        title: req.body.title,
      content : req.body.content,
      creator: req.userData.userId
    });

    MessageContent.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
    .then(result => {
      if (result.nModified > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate post!"
      });
    });
});

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = MessageContent.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return MessageContent.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Messages fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count
      });
    });
});

router.get("/:id", (req, res, next) => {
  MessageContent.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Message not found!" });
    }
  });
});

router.delete("/:id", CheckAuth, (req, res, next) => {
  MessageContent.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Message deleted!" });
  });
});

module.exports = router;
