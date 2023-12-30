const Tour = require('../models/tourModel');

async function getAllTours(req, res) {
  try {
    const tours = await Tour.find();
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
    return res.status(201).json({
      method: 'post',
      status: 'success',
      data: newTour,
    });
  } catch (e) {
    return res.status(400).json({
      status: 'failed',
      message: e,
    });
  }
}
function getTour(req, res) {
  //   const { id } = req.params;
  res.status(200).json({
    status: 'success',
    // data: tours.find((tour) => tour.id === id),
  });
}
function updateTour(req, res) {
  res.status(200).json({
    status: 'success',
    message: 'Updated the data',
  });
}
function deleteTour(req, res) {
  res.status(200).json({
    status: 'success',
    message: 'deleted',
    data: null,
  });
}
exports.getAllTours = getAllTours;
exports.createTour = createTour;
exports.getTour = getTour;
exports.updateTour = updateTour;
exports.deleteTour = deleteTour;
