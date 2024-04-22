// mongoose.js



const mongoose = require('mongoose');
require('dotenv').config();

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DB_KEY);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  }
};

module.exports = connectToMongoDB;

