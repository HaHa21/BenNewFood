const router = require('express').Router();
const async = require('async');

const Category = require('../models/category');
const Product = require('../models/product');

const checkJWT = require('../middlewares/check-jwt');

router.route('/categories').get((req, res, next) => {
  Category.find({} , (err, categories) => {
    res.json(
      {
        success : true,
        message : "Success",
        categories : categories
      }
    )
  })
}).post((req,res,next) => {
  let category = new Category();
  category.name = req.body.category;
  category.save();
  res.json(
    {
      success : true,
      message : "Successful"
    }
  );
});

router.get('/categories')
