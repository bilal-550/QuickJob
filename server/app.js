if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected successfully to database'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', require('./routes/user'))

app.listen(port, () => {
  console.log(`App launched successfully on port ${port}`);
})