const express = require('express');
const debug = require('debug')('app:apiRoutes');
const apiController = require('../controllers/sql/apiController');

const apiRouter = express.Router();

function router() {
  const { getBooks, getBookById, postBook, deleteBookById,
    postExampleBooks, deleteExampleBooks,
    getUsers, middleware } = apiController();

  apiRouter.use(middleware);

  apiRouter.route('/books')
    .get(getBooks);

  apiRouter.route('/books')
    .post(postBook);

  apiRouter.route('/book/:id')
    .get(getBookById);

  apiRouter.route('/books/:id')
    .delete(deleteBookById);

  apiRouter.route('/books/examples')
    .post(postExampleBooks);

  apiRouter.route('/books/examples')
    .delete(deleteExampleBooks);

  apiRouter.route('/users')
    .get(getUsers);

  return apiRouter;
}

module.exports = router;
