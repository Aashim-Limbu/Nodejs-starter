require('dotenv').config({ path: '../config.env' });
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../models/tourModel');

const tours = JSON.parse(
  fs.readFileSync('./../data/tours-simple.json', 'utf-8'),
);
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
async function importAllTours() {
  try {
    await Tour.create(tours);
    console.log('Imported Successfully');
    process.exit();
  } catch (error) {
    console.log(error);
  }
  process.exit();
}
async function deleteAllTours() {
  try {
    await Tour.deleteMany({});
    console.log('documents deleted successfully');
    process.exit();
  } catch (error) {
    console.log(error);
  }
  process.exit();
}
if (process.argv[2] === '--import') {
  importAllTours();
} else if (process.argv[2] === '--delete') {
  deleteAllTours();
}
