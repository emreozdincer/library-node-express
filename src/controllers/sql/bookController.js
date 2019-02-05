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

      // TODO: swap 3 with books.length
      for (let i = 0; i < 3; i++) {
        const book = books[i];
        book.details = await bookService.getBookById(book.bookId);
        debug(book.details.image_url);
      }

      res.render(
        'bookListView',
        {
          nav: req.app.locals.nav,
          title: 'Library',
          books: books.slice(0, 3),
        },
      );
    }());
  }
  function getById(req, res) {
    (async function query() {
      const { id } = req.params;
      const request = new sql.Request();
      const { recordset } = await request.input('id', sql.Int, id)
        .query('select * from books where id = @id');
      req.book = recordset[0];
      res.render(
        'bookView',
        {
          nav: req.app.locals.nav,
          title: 'Library',
          book: req.book,
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
