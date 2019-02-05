const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:mongo:bookController');

function bookController(bookService) {
  function getIndex(req, res) {
    const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
    const dbName = process.env.DB_NAME || 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);
        const col = await db.collection('books');
        const books = await col.find().toArray();

        for (let i = 0; i < books.length; i++) {
          const book = books[i];
          // book.details = await bookService.getBookById(book.bookId);
          book.details = bookService.getBookById(book.bookId);
        }

        res.render(
          'bookListView',
          {
            nav: req.app.locals.nav,
            title: 'Library',
            books,
          },
        );
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }
  function getById(req, res) {
    const { id } = req.params;
    const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
    const dbName = process.env.DB_NAME || 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);
        const col = await db.collection('books');
        const book = await col.findOne({ _id: new ObjectID(id) });
        debug(book);

        book.details = await bookService.getBookById(book.bookId);

        res.render(
          'bookView',
          {
            nav: req.app.locals.nav,
            title: 'Library',
            book,
          },
        );
      } catch (err) {
        debug(err);
      }
    }());
  }
  function middleware(req, res, next) {
    // if (req.user)
    next();
    // else res.redirect('/');
  }

  return { getIndex, getById, middleware };
}

module.exports = bookController;
