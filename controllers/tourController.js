const Tour = require('../models/tourModel');
const APIFeature = require('../utils/APIFeaures');

function setParameter(req, res, next) {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,maxGroupSize';
  next();
}

async function getAllTours(req, res) {
  try {
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
  } catch (error) {
    res.status(400).json({
      status: 'Error',
      msg: error.message,
    });
  }
}
async function getTheBusyMonth(req, res) {
  try {
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
  } catch (error) {
    res.status(400).json({
      status: 'Error',
      msg: error.message,
    });
  }
}
async function getTourStats(req, res) {
  try {
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
  } catch (error) {
    res.status(400).json({
      status: 'Error',
      msg: error.message,
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
