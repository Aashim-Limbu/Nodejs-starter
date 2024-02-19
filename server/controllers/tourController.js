const Tour = require('../models/tourModel');
// const APIFeature = require('../utils/APIFeaures');
// const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

function setParameter(req, res, next) {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,maxGroupSize';
  next();
}

const getTheBusyMonth = catchAsync(async (req, res) => {
  const year = req.params.year * 1;
  const data = await Tour.aggregate([
    { $unwind: '$startDates' },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' }, //grouping based on the months
        numberOfTour: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    { $project: { _id: 0 } }, //to remove the fields in the data
    { $addFields: { months: '$_id' } }, //add the fieldds
    { $sort: { numberOfTour: -1 } },
  ]);
  res.status(200).json({
    status: 'success',
    length: data.length,
    year,
    data,
  });
});

const getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    { $match: { ratingsAverage: { $gte: 4.5 } } },
    {
      $group: {
        _id: null,
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minRating: { $min: '$ratingsAverage' },
        maxRating: { $max: '$ratingsAverage' },
        noOfTour: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});
const getDistances = catchAsync(async (req, res, next) => {
  const { latlong } = req.params;
  const { queryParam } = req.query;
  const [lat, long] = latlong.split(',');
  if (!lat || !long) {
    return next(new AppError('Please provide the location access', 400));
  }
  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [long * 1, parseFloat(lat * 1)],
        },
        distanceField: 'distance',
        distanceMultiplier: 0.001,
        query: { name: queryParam },
      },
    },
    {
      $project: { name: 1, distance: 1 },
    },
  ]);
  res.status(200).json({
    status: 'success',
    length: distances.length,
    data: {
      data: distances,
    },
  });
});

const getAttractionWithIn = catchAsync(async (req, res, next) => {
  const { latlong } = req.params;
  let { maxDistance } = req.params;
  console.log(latlong, maxDistance);
  if (!latlong) {
    return next(new AppError("Can't get your location", 400));
  }
  if (!maxDistance) {
    maxDistance = 50;
  }
  const [lat, long] = latlong.split(',');
  const attractions = await Tour.find({
    startLocation: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [long * 1, lat * 1],
        },
        $maxDistance: maxDistance * 1000,
      },
    },
  });
  res.status(200).json({
    status: 'Success',
    length: attractions.length,
    data: {
      data: attractions,
    },
  });
});
// const getTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findById(req.params.id).populate('reviews');
//   if (!tour) {
//     return next(new AppError(`No tour with ${req.params.id} was found `, 404));
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
// });
const getTour = factory.getOne(Tour, { path: 'reviews' }); //we don't have the select
const createTour = factory.createOne(Tour);
const updateTour = factory.updateOne(Tour);
const deleteTour = factory.deleteOne(Tour);
const getAllTours = factory.getAll(Tour, { path: 'reviews' });
module.exports = {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  setParameter,
  getTourStats,
  getTheBusyMonth,
  getAttractionWithIn,
  getDistances,
};
