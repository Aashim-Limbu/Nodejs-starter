require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');
const express = require('express');
const { Schema } = require('mongoose');

const app = express();

const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
async function connectToDatabase() {
  try {
    const response = await mongoose.connect(db);

    if (response) {
      console.log(response.connections);
      console.log('DB connected successfully');
    }
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
}

// Define Mongoose schema and model
const tourSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Tour name is required'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'Tour price is required'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

// Sample data creation
async function createSampleTour() {
  try {
    const testTour = new Tour({
      name: 'the Trekkers',
      price: 1500,
      rating: 5.0,
    });

    const savedTour = await testTour.save();
    console.log('Tour saved successfully:', savedTour);
  } catch (error) {
    console.error('Error saving tour:', error.message);
  }
}

// Express server setup
const PORT = process.env.PORT || 8001;

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Call functions to connect to the database and create sample data
connectToDatabase();
createSampleTour();
