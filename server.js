// require express
const express = require('express');

// initialize express
const app = express();

// config routing for blogRouter
const blogRouter = require('./blogRouter');

// look in public for static files
app.use(express.static('public'));

// use blogRouter for /blog-posts endpoint
app.use('/blog-posts', blogRouter);

// for root, use views/index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// direct requests to server.js
app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});