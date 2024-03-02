require('dotenv').config({ path: '../config.env' });
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Review = require('../models/reviewModel');

const tours = JSON.parse(fs.readFileSync('./tours.json', 'utf-8'));
const reviews = JSON.parse(fs.readFileSync('./reviews.json', 'utf-8'));
const users = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));
const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
async function connectDb() {
  const response = await mongoose.connect(db);
  if (response) {
    console.log('Connected Successfully');
  } else {
    console.log("Error can't connect to the database");
  }
}
connectDb();
async function importAll() {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Imported Successfully');
    process.exit();
  } catch (error) {
    console.log(error);
  }
  process.exit();
}
async function deleteAll() {
  try {
    await Tour.deleteMany({});
    await User.deleteMany({});
    await Review.deleteMany({});
    console.log('documents deleted successfully');
    process.exit();
  } catch (error) {
    console.log(error);
  }
  process.exit();
}
if (process.argv[2] === '--import') {
  importAll();
} else if (process.argv[2] === '--delete') {
  deleteAll();
}
