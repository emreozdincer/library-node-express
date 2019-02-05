const express = require('express');
const debug = require('debug')('app:adminRoutes');
const adminController = require('../controllers/sql/adminController');

const adminRouter = express.Router();

function router() {
  const { insertMany } = adminController();

  adminRouter.route('/insert')
    .get(insertMany);

  return adminRouter;
}

module.exports = router;
