const sql = require('mssql');
const debug = require('debug')('app:sql:authController');

function authController() {
  function signUp(req, res) {
    const { username, password } = req.body;

    (async function signup() {
      try {
        // build query
        debug('Querying SQL Database for sign up...');
        const request = new sql.Request();
        const query = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
        // debug(query);
        const result = await request.query(query);
        // debug(result);

        if (result.rowsAffected[0] === 1) {
          res.redirect('/auth/profile');
        } else {
          // Unexpected result.
          debug('unexpected result');
          res.send(result);
        }
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
    debug('rendering profile sql');
    res.render('profile', {
      nav: req.app.locals.nav,
      title: 'Profile',
      user: { username: req.user.username },
    });
  }

  return { signUp, signIn, profile };
}

module.exports = authController;
