const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadsService');

const parser = xml2js.Parser({ explicitArray: false });

function goodreadsService() {
  function getBookById(id) {
    return new Promise((resolve, reject) => {
      // resolve({ description: 'our description' });
      axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=XbUjF37IPf8xAlCBj3FvA`)
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              // debug(result);
              debug('Got API response.');
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch((error) => {
          reject(error);
          debug(error);
        });
    });
  }

  return { getBookById };
}

module.exports = goodreadsService();
