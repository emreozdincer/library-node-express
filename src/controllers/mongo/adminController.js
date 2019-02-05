const { MongoClient } = require('mongodb');
const debug = require('debug')('app:mongo:adminController');
const books = require('../../../public/js/books');

function adminController() {
  function insertMany(req, res) {
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
  }

  return { insertMany };
}

module.exports = adminController;
