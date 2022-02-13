const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

if (process.env.ENV === 'Test') {
  console.log('This is a test');
  // eslint-disable-next-line no-unused-vars
  const db = mongoose.connect(
    'mongodb://username:password@localhost:27017/bookAPI_Test?authSource=admin&readPreference=primary&ssl=false'
  );
} else {
  console.log('This is a production');
  // eslint-disable-next-line no-unused-vars
  const db = mongoose.connect(
    'mongodb://username:password@localhost:27017/bookAPI?authSource=admin&readPreference=primary&ssl=false'
  );
}

const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API!!!');
});
app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
