// utils/fileUpload.js

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const express = require('express');
const Picture = require('./picture');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  },
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.webp') {
      return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  }
});

const handleFileUpload = upload.single('profile_pic');

const multiUpload = upload.array('cat_pics', 10);



const savePictureToDatabase = async (req, res, next) => {
  try {
    if (!req.file && !req.files) {
      throw new Error('No file uploaded');
    }

    if (req.file) {
      const { originalname, filename } = req.file;

      const newPicture = new Picture({
        pic_id: filename,
        name: originalname,
        path: req.file.path,
      });

      await newPicture.save();
    }

    if (req.files) {
      for (const file of req.files) {
        const { originalname, filename } = file;

        const newPicture = new Picture({
          pic_id: filename,
          name: originalname,
          path: file.path,
        });

        await newPicture.save();
      }
    }

    next();
  } catch (error) {
    console.error('Error saving picture to database:', error);
    res.status(500).send('Error saving picture to database');
  }
};





module.exports = {
  upload,
  handleFileUpload,
  multiUpload,
  savePictureToDatabase,};
