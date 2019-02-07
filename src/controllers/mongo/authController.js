const { MongoClient } = require('mongodb');
const debug = require('debug')('app:mongo:authController');

function authController() {
  function signUp(req, res) {
    // create user & redirect
    const { username, password } = req.body;
    const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
    const dbName = process.env.DB_NAME || 'libraryApp';

    (async function addUser() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);
        const col = db.collection('users');
        const user = { username, password };

        const results = await col.insertOne(user);
        req.login(results.ops[0], () => {
          res.redirect('/auth/profile');
        });
      } catch (error) {
        debug(error);
      }
    }());
  }

  function signIn(req, res) {
    res.render('signIn', {
      nav: req.app.locals.nav,
      title: 'Sign in',
    });
  }

  function profile(req, res) {
    res.render('profile', {
      nav: req.app.locals.nav,
      title: 'Profile',
      user: { username: req.user.username },
    });
  }

  return { signUp, signIn, profile };
}

module.exports = authController;
