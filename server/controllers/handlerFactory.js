const AppError = require('../utils/appError');
const APIFeature = require('../utils/APIFeaures');
const catchAsync = require('../utils/catchAsync');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const docs = await Model.findByIdAndDelete(req.params.id);
    if (!docs) {
      return next(AppError(`No tour with ${req.params.id} is found`, 404));
    }
    res.status(204).json({
      data: null,
    });
  });
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const docs = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!docs) {
      return next(
        new AppError(`No tour with ${req.params.id} was found `, 404),
      );
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: docs,
      },
    });
  });
exports.createOne = (Model) =>
  catchAsync(async (req, res) => {
    const docs = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: docs,
      },
    });
  });
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc) {
      return next(new AppError(`Sorry can't find ${req.params.id}  `, 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
exports.getAll = (Model, popOptions) =>
  catchAsync(async (req, res) => {
    //to allow for nested route for filter
    let tempFilter = {};
    if (req.params.tourId) tempFilter = { tour: req.params.tourId };
    let query = Model.find(tempFilter);
    if (popOptions) query = query.populate(popOptions);
    const features = new APIFeature(query, req.query)
      .filter()
      .sort()
      .limit()
      .page();
    const doc = await features.query;
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
