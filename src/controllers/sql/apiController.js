const sql = require('mssql');
const debug = require('debug')('app:sql:apiController');
const exampleBooks = require('../../../public/js/books');

function apiController() {
  function getBooks(req, res) {
    if (!req.body.hasAccess) {
      debug('No access to get books');
      return;
    }

    (async function sqlBooks() {
      const request = new sql.Request();
      const response = await request.query('SELECT * FROM books');
      res.send(response);
    }());
  }

  function getUsers(req, res) {
    (async function sqlUsers() {
      const request = new sql.Request();
      const response = await request.query('SELECT * FROM users');
      res.send(response);
    }());
  }

  function postBook(req, res) {
    const { hasAccess, title, author, bookId } = req.body;
    if (req.user && hasAccess) {
      if (title && author && bookId) {
        (async function postBookSQL() {
          debug('Posting...');
          const request = new sql.Request();
          const query = `INSERT INTO books (title, author, bookId) VALUES ('${title}', '${author}', ${bookId})`;
          const response = await request.query(query);
          res.send(response);
        }());
      } else {
        res.status(400).send({ status: 'Bad Request' });
      }
    } else {
      res.status(403).send({ status: 'Unauthorized' });
    }
  }

  function getBookById(req, res) {
    const { hasAccess } = req.body;
    const { id } = req.params;

    if (hasAccess) {
      if (!id) {
        res.status(400).send({ status: 'Bad Request' });
      }

      (async function getBookSQL() {
        const request = new sql.Request();
        const query = `SELECT FROM books WHERE bookId = '${id}'`;
        // debug(query);
        const response = await request.query(query);
        res.send(response);
      }());

    } else {
      res.status(403).send({ status: 'Unauthorized' });
    }
  }

  function deleteBookById(req, res) {
    const { hasAccess } = req.body;
    const { id } = req.params;

    if (hasAccess) {
      if (!id) {
        res.status(400).send({ status: 'Bad Request' });
      }

      (async function deleteBookSQL() {
        const request = new sql.Request();
        const query = `DELETE FROM books WHERE bookId = '${id}'`;
        // debug(query);
        const response = await request.query(query);
        res.send(response);
      }());

    } else {
      res.status(403).send({ status: 'Unauthorized' });
    }
  }

  function postExampleBooks(req, res) {
    (async function postExampleBooksSQL() {
      // Build the SQL query.
      let query = 'INSERT INTO books (title, author, bookId) VALUES';
      exampleBooks.forEach((book) => {
        query += `\n('${book.title}', '${book.author}', ${book.bookId}),`;
      });
      query = query.slice(0, -1);
      // debug(query);

      debug('Querying SQL Database for insertion');
      const request = new sql.Request();
      const result = await request.query(query);
      // debug(result);

      res.send(result);
    }());
  }

  function deleteExampleBooks(req, res) {
    (async function deleteExampleBooksSQL() {
      // Build the SQL query.
      let query = 'DELETE FROM books WHERE title = ';
      exampleBooks.forEach((book) => {
        query += `'${book.title}' OR title = `;
      });
      query = query.slice(0, -12);
      debug(query);

      debug('Querying SQL Database for deletion');
      const request = new sql.Request();
      const result = await request.query(query);
      // debug(result);

      res.send(result);
    }());
  }

  function middleware(req, res, next) {
    debug('In API Middleware');

    req.body.hasAccess = true;
    next();
  }

  return {
    getBooks, postBook, getBookById, deleteBookById,
    postExampleBooks, deleteExampleBooks,
    getUsers, middleware,
  };
}

module.exports = apiController;
