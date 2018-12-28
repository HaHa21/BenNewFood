var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

const CheckAuth = require("../middleware/CheckAuth");
var User = require('../models/user');
var Review = require('../models/reviews');

router.post("", CheckAuth, (req, res, next) => {

  const message = new Review({
    title: req.body.title,
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
});

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Review.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Review.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching posts failed!"
      });
    });
});

router.get("/:id", CheckAuth, (req, res, next) => {
  Review.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching post failed!"
      });
    });
});

router.delete("/:id", CheckAuth , (req, res, next) => {
  Review.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting posts failed!"
      });
    });
});

router.delete("/admin-delete/:id", CheckAuth , (req, res, next) => {
  Review.deleteOne({ _id: req.params.id })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting posts failed!"
      });
    });
});

router.put(
  "/:id", CheckAuth,
  (req, res, next) => {
    const message = new Review({
      _id : req.body.id,
        title: req.body.title,
      content : req.body.content,
      creator: req.userData.userId
    });

    Review.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
    .then(result => {
      if (result.nModified > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
  })
});

module.exports = router;
