const express = require('express');
const router = require('./routes/routes');
const mongoose = require('mongoose');
const port = 3000;

const app = express();

const connectToMongoDB = require('./controllers/controllers');



app.use(express.static('public'));

app.use('/', router);
app.use('/uploads', express.static('uploads'));
app.use('/uploads-cat-pics', express.static('uploads'));


connectToMongoDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});