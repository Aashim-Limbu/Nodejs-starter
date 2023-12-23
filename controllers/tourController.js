const Tour = require('../models/tourModel');

// const tours = JSON.parse(fs.readFileSync('./data/tours-simple.json'));

function getAllTours(req, res) {
  res.status(200).json({
    status: 'success',
    // result: tours.length,
    // data: tours,
  });
}
async function createTour(req, res) {
  try {
    const newTour = await Tour.create(req.body);
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
