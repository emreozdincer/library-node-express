const passport = require('passport');
const { Strategy } = require('passport-local');
const sql = require('mssql');
const debug = require('debug')('app:local.strategy');

function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password',
  }, (username, password, done) => {
    try {
      (async function strategy() {
        // debug('Using local SQL strategy...');
        const request = new sql.Request();
        const query = `SELECT * FROM users WHERE username='${username}' AND password = '${password}'`;
        const response = await request.query(query);

        const user = response.recordset[0];
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      }());
    } catch (error) {
      debug(error);
    }
  }));
}

module.exports = localStrategy;
