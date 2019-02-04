const express = require('express');
const chalk = require('chalk'); // Terminal string styling
const debug = require('debug')('app'); // Debugging utility
const morgan = require('morgan'); // HTTP request logger middleware for node.js
const path = require('path'); // Better, foolproof methods for writing url/file paths
// const sql = require('mssql'); // SQL package
const bodyParser = require('body-parser'); // Parses body of HTTP requests
const cookieParser = require('cookie-parser'); // Parses cookies
const session = require('express-session'); // Sessions

const app = express();
const PORT = process.env.PORT || 4000;

// // Connecting to SQL Server in Azure
// const config = {
//   user: 'library',
//   password: 'emre1234.',
//   server: 'pslibrary-emre.database.windows.net',
//   database: 'PSLibrary',

//   options: {
//     encrypt: true,
//   },
// };
// sql.connect(config).catch(err => debug(err));

// // Middleware: How It Works
// app.use((req, res, next) => {
// debug('My Middleware');
// next();
// });

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));

require('./src/config/passport')(app);

app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
app.set('views', 'src/views');
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');

app.locals.nav = [
  { link: '/books', title: 'Books' },
  // { link: '/authors', title: 'Authors' }, // not implemented
];

const bookRouter = require('./src/routes/bookRoutes')();
const adminRouter = require('./src/routes/adminRoutes')();
const authRouter = require('./src/routes/authRoutes')();

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'views/index.html'));
  res.render(
    'index',
    {
      title: 'Library',
      nav: req.app.locals.nav,
    },
  );
});

app.listen(PORT, () => {
  debug(`Listening on port ${chalk.green(PORT)}`);
});
