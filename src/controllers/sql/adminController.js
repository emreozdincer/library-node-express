const sql = require('mssql');
const debug = require('debug')('app:sql:adminController');
const books = require('../../../public/js/books');

function adminController() {
  function insertMany(req, res) {
    (async function insertManyQuery() {
      // Build the SQL query.
      let query = 'INSERT INTO books (title, author, bookId) VALUES';
      books.forEach((book) => {
        query += `\n('${book.title}', '${book.author}', ${book.bookId}),`;
      });
      query = query.slice(0, -1);
      // debug(query);

      debug('Querying SQL Database for insertion...');
      const request = new sql.Request();
      const result = await request.query(query);
      // debug(result);

      res.send(`
        Success! Added ${result.rowsAffected[0]} books.
        \n<a href='/'>Click</a> to return home.
      `);
    }());
  }

  return { insertMany };
}

module.exports = adminController;
