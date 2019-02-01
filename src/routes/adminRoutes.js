const express = require('express');
const adminRouter = express.Router();
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const books = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    bookId: 656,
    read: false
  },
  {
    title: 'Les Misérables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    bookId: 24280,
    read: false
  },
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    bookId: 2493,
    read: false
  },
  {
    title: 'A Journey into the Center of the Earth',
    genre: 'Science Fiction',
    author: 'Jules Verne',
    bookId: 32829,
    read: false
  },
  {
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    bookId: 1881716,
    read: false
  },
  {
    title: 'The Wind in the Willows',
    genre: 'Fantasy',
    author: 'Kenneth Grahame',
    bookId: 5659,
    read: false
  },
  {
    title: 'Life On The Mississippi',
    genre: 'History',
    author: 'Mark Twain',
    bookId: 99152,
    read: false
  },
  {
    title: 'Childhood',
    genre: 'Biography',
    author: 'Lev Nikolayevich Tolstoy',
    bookId: 2359878,
    read: false
  }];

function router(nav) {
  adminRouter.route('/insert')
    .get((req, res) => {
      const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
      const dbName = process.env.DB_NAME || 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);
          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (error) {
          debug(error);
        }

        client.close();
      }());
    });

  return adminRouter;
}

module.exports = router;
