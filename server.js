require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');
const express = require('express');

const app = express();

const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
async function connectToDatabase() {
  try {
    const response = await mongoose.connect(db);

    if (response) {
      console.log('DB connected successfully');
    }
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
}

// Express server setup
const PORT = process.env.PORT || 8001;

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Call functions to connect to the database and create sample data
connectToDatabase();
