const Tour = require('../models/tourModel');
const APIFeature = require('../utils/APIFeaures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

function setParameter(req, res, next) {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,maxGroupSize';
  next();
}
const getAllTours = catchAsync(async (req, res) => {
  // const searchQuery = { ...req.query };
  // const keys = ['page', 'limit', 'sort', 'fields'];
  // keys.forEach((key) => delete searchQuery[key]);
  // //! 1)Advance filtering
  // let tempQuery = JSON.stringify(searchQuery);
  // tempQuery = JSON.parse(
  //   tempQuery.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`),
  // );
  // let query = Tour.find(tempQuery);
  //! 2) Sorting the data
  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(',').join(' ');
  //   console.log(sortBy);
  //   query = query.sort(sortBy);
  // } else {
  //   query.sort('-createdAt');
  // }
  //! Limiting the data
  // if (req.query.fields) {
  //   const fields = req.query.fields.split(',').join(' ');
  //   query = query.select(fields);
  // } else {
  //   query = query.select('-__v');
  // }
  //! Pagination
  // if (req.query.page || req.query.limit) {
  //   console.log('inside the pagination');
  //   const page = req.query.page * 1 || 1;
  //   const limit = req.query.limit * 1 || 10;
  //   const skip = (page - 1) * limit;
  //   console.log('Page:', page);
  //   console.log('Limit:', limit);
  //   console.log('Skip:', skip);
  //   query = query.skip(skip).limit(limit);
  //   console.log(query);
  //   const numTours = await Tour.countDocuments(tempQuery);
  //   if (skip >= numTours) {
  //     throw new Error("Sorry the data doesn't exists");
  //   }
  // }
  const features = new APIFeature(Tour.find(), req.query)
    .filter()
    .sort()
    .page()
    .limit();
  const tours = await features.query;
  res.status(200).json({
    status: 'success',
    length: tours.length,
    data: {
      tours,
    },
  });
});

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

const createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  console.log(newTour);
  res.status(201).json({
    method: 'post',
    status: 'success',
    data: newTour,
  });
});
const getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour) {
    return next(new AppError(`No tour with ${req.params.id} was found `, 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});
const updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!tour) {
    return next(new AppError(`No tour with ${req.params.id} was found `, 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});
const deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  if (!tour) {
    return next(new AppError(`No tour with ${req.params.id} was found `, 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

module.exports = {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  setParameter,
  getTourStats,
  getTheBusyMonth,
};
