const Tour = require('../models/tourModel');

async function getAllTours(req, res) {
  try {
    const searchQuery = { ...req.query };
    const keys = ['page', 'limit', 'sort', 'fields'];
    keys.forEach((key) => delete searchQuery[key]);
    //Advance filtering
    let tempQuery = JSON.stringify(searchQuery);
    tempQuery = JSON.parse(
      tempQuery.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`),
    );
    console.log(tempQuery);
    const query = Tour.find(tempQuery);
    const tours = await query;
    res.status(200).json({
      status: 'success',
      length: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Error',
      msg: error,
    });
  }
}
async function createTour(req, res) {
  try {
    const newTour = await Tour.create(req.body);
    console.log(newTour);
    res.status(201).json({
      method: 'post',
      status: 'success',
      data: newTour,
    });
  } catch (e) {
    res.status(400).json({
      status: 'failed',
      message: e,
    });
  }
}
async function getTour(req, res) {
  //   const { id } = req.params;
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      msg: error,
    });
  }
}
async function updateTour(req, res) {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error,
    });
  }
}
async function deleteTour(req, res) {
  try {
    const response = await Tour.findByIdAndDelete(req.params.id);
    if (!response) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'No tour found with this ID.' });
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'failed',
      message: 'An error occurred while deleting the tour.',
    });
  }
}

exports.getAllTours = getAllTours;
exports.createTour = createTour;
exports.getTour = getTour;
exports.updateTour = updateTour;
exports.deleteTour = deleteTour;
