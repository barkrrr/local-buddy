const express = require('express');
const User = require('../models/user');
const authMiddle = require('../middlewares/authMiddle');
const bcrypt = require('bcrypt');

const router = express.Router();
const saltRounds = 10;

// SIGN UP: --------------------------------------------------------------

router.get('/signup', (req, res, next) => {
  const data = {
    messages: req.flash('info')
  };
  res.render('auth/signup', data);
});

router.post('/signup', authMiddle.validUserInputSignUp, (req, res, next) => {
  const { username, password, email, userPositionLat, userPositionLon } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const newUser = new User({
    username,
    password: hashedPassword,
    email,
    location: {
      type: 'Point',
      coordinates: [userPositionLon, userPositionLat]
    }
  });
  newUser.save(function (err) {
    if (err) {
      req.flash('info', err.message);
      res.redirect('/signup');
    } else {
      req.session.currentUser = newUser;
      res.redirect('/profile');
    }
  });
});

// LOGIN: --------------------------------------------------------------

router.get('/login', (req, res, next) => {
  const data = {
    messages: req.flash('info')
  };
  res.render('auth/login', data);
});

router.post('/login', authMiddle.validUserInputLogin, (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then(user => {
      console.log(password);
      if (!user) {
        req.flash('info', 'Username does not exist');
        return res.redirect('/login');
      } else {
        if (bcrypt.compareSync(password, user.password)) {
        // Save the login in the session!
          req.session.currentUser = user;
          if (req.session.counter === 1) {
            const previousUrl = req.session.lastUrl;
            console.log(previousUrl);
            req.session.counter = 0;
            return res.redirect(`.${previousUrl}`);
          } else {
            return res.redirect('/profile');
          }
        } else {
          req.flash('info', 'password wrong');
          return res.redirect('/login');
        }
      }
    })
    .catch(error => {
      next(error);
    });
});

// LOG OUT: --------------------------------------------------------------

router.post('/logout', authMiddle.loggedUser, (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('/');
});

module.exports = router;
