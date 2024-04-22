// routes/router.js

const express = require('express');
const router = express.Router();
const { handleFileUpload, multiUpload, savePictureToDatabase, upload } = require('../utils/fileUpload');
const Picture = require('../utils/picture');

router.get('/', (req, res) => {
  res.send('Hello, world!');
});

router.post('/upload-profile-pic', handleFileUpload, savePictureToDatabase,(req, res) => {
  const imageUrl = `/uploads/${req.file.filename}`;
  res.send(`<div><h2>Here is the uploaded image:</h2><img src="${imageUrl}" /></div>`);
});

router.post('/upload-cat-pics', multiUpload, savePictureToDatabase, (req, res) => {
  const images = req.files.map(file => {
    return `<div><h2>Here is the uploaded image:</h2><img src="/uploads/${file.filename}" /></div>`;
  });
  res.send(images.join(''));
});


router.get('/get-pics', async (req, res) => {
  try {
    const pictures = await Picture.find();
    const pictureLinks = pictures.map(picture => {
      return `<div><a href="/view-pic/${picture._id}">${picture.name}</a></div>`;
    });
    res.send(`<h2>Uploaded Pictures:</h2>${pictureLinks.join('')}`);
  } catch (error) {
    console.error('Error fetching pictures:', error);
    res.status(500).send('Error fetching pictures');
  }
});

router.get('/view-pic/:id', async (req, res) => {
  try {
    const picture = await Picture.findById(req.params.id);
    res.send(`<div><h2>${picture.name}</h2><img src="/uploads/${picture.pic_id}" /></div>`);
  } catch (error) {
    console.error('Error fetching picture:', error);
    res.status(500).send('Error fetching picture');
  }
});




module.exports = router;
  



