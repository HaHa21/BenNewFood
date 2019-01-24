var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var request = require('request');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var nodemailer = require('nodemailer');


router.post('/signup', function (req, res, next) {
  User.find({email:req.body.email})
  .exec().then(user => {
      if(user.length > 1) {
          return res.status(409).json({
              message: "Email already exist"
          });
      } else {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if(err){
                  return res.status(500).json({
                      error:err
                  });
              } else {
    var user = new User({

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hash,
        email: req.body.email,
        role: 'User'
    });

    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'User creation failed',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result

        });
    });
  }
  })
  }
 })

})

router.post('/admin-signup', function (req, res, next) {
  User.find({email:req.body.email})
  .exec().then(user => {
      if(user.length > 1) {
          return res.status(409).json({
              message: "Email already exist"
          });
      } else {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if(err){
                  return res.status(500).json({
                      error:err
                  })
              } else {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hash,
        email: req.body.email,
        role: 'Admin'
    });

    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Admin creation failed',
                error: err
            });
        }
        res.status(201).json({
            message: 'Admin created',
            obj: result

        });
    });
  }
  })
  }
 })

})

router.post('/signin', (req, res, next) => {
  //code not working - recaptcha
  let fetchedUser;

  User.findOne({ email: req.body.email }).then(user => {
    if(!user){
      return res.status(401).json({
        message: "Auth failed!!"

      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then(result => {
    if(!result) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id},
    "Secret_be_longer", { expiresIn: "1h" });


    res.status(200).json({
      token : token,
      expiresIn: 3600,
      userId: fetchedUser._id,
      role: fetchedUser.role
    });
  }).catch(err => {
    return res.status(401).json({
       message : "Auth failed"
    })
  });
});

router.post('/forgotpassword', async (req, res) => {

  let user = await User.findOne({ email : req.body.email});
  if(!user){
    return res.status(401).json({ err: 'could not find user' });

  }

  const token = jwt.sign({ id : user._id}, "Secret_be_longer");

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ldominic063@gmail.com',
      pass: 'Camry4560'
    }
  });

  const resetLink = `<h2>Please Reset you password here</h2>
  <a href='http://localhost:4200/auth/reset-password/${token}'>Reset password</a> `// html body

  let mailOptions = {
        from: 'domlee2012@gmail.com', // sender address
        to: req.body.email,
        html: resetLink
    };

  transporter.sendMail(mailOptions, (error, info) => {
     if(error){
       return res.status(401).json({ err: "could not send email"});

     }
     res.status(201).json({ message: "Reset email sent to your inbox"});


  });
});

router.put('reset-password', async(req, res) => {
  try {
			const { password } = req.body;
			if (!password) {
				return res.status(401).json({ err: 'password is required' });
			}

      // const user = await User.findOne({ email : req.body.email});


			//const hash = await getEncryptedPassword(password);
			//user.local.password = hash;
			await user.save();
			return res.json({ success: true });
		} catch (err) {
			console.error(err);
			return res.status(500).json(err);
		}
});
module.exports = router;
