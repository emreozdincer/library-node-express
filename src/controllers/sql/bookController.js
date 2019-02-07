const sql = require('mssql');
const debug = require('debug')('app:sql:bookController');

function bookController(bookService) {
  function getIndex(req, res) {
    (async function query() {
      const request = new sql.Request();
      debug('Querying SQL Database...');
      const result = await request.query('select * from books');
      // debug(result);
      const books = result.recordset;

      for (let i = 0; i < books.length; i++) {
        const book = books[i];
        book.details = await bookService.getBookById(book.bookId);
        debug(book.details.image_url);
      }

      res.render(
        'bookListView',
        {
          nav: req.app.locals.nav,
          title: 'Library',
          books,
          loggedIn: !!req.user,
        },
      );
    }());
  }
  function getById(req, res) {
    (async function query() {
      const { id } = req.params;
      const request = new sql.Request();
      const { recordset } = await request.input('bookId', sql.Int, id)
        .query('select * from books where bookId = @bookId');
      const book = recordset[0];
      book.details = await bookService.getBookById(book.bookId);
      res.render(
        'bookView',
        {
          nav: req.app.locals.nav,
          title: 'Library',
          book,
        },
      );
    }());
  }
  function middleware(req, res, next) {
    next();
  }

  return { getIndex, getById, middleware };
}

module.exports = bookController;
