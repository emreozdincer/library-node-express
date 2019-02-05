const express = require('express');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');
const authController = require('../controllers/sql/authController');

const authRouter = express.Router();

// TODO: Implement log out
function router() {
  const { signUp, signIn, profile } = authController();

  authRouter.route('/signUp')
    .post(signUp);

  authRouter.route('/signIn')
    .get(signIn)
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/',
    }));

  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) next();
      else res.redirect('/');
    })
    .get(profile);
  return authRouter;
}

module.exports = router;
