# Library app with Node.js and Express

# Main Technologies
* Node.js
* Express
* ejs & bootstrap
* MongoDB
* SQL Server on Azure (In work)

# Features
* Routing, Middlewares, Debugging
* Simple authentication & authorization
* Structured (folder-by-type): config, controllers, routes, services, views
* Uses Goodreads API to fetch information via Axios

# Usage (in work)

`npm install`

`npm start`

### To switch between Mongo and SQL:

* Set respective import paths in router files (`adminRoutes`, `authRoutes`, and `bookRoutes`).
* Set the local strategy import path in `passport.js`. 

### Specifically, to use SQL Server on Azure:

* Set your credentials on /src/config/sql.js. Refer to [mssql](https://www.npmjs.com/package/mssql) package.

# TO-DOs
* Implement logout functionality
* Implement a feature about having a book read or not
* Implement a feature about searching and adding a book to the list
* Implement a section about Authors
* Implement security measures for authentication process
  
## Credits 
Based on this [course](https://app.pluralsight.com/library/courses/nodejs-express-web-applications-update) on pluralsight