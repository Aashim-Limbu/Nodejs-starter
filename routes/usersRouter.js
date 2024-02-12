const express = require('express');
// const {
//   getAllUsers,
//   createUser,
//   getUser,
//   updateUser,
//   deleteUser,
//   checkUser,
// } = require('../controllers/userController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authenticationController');

const router = express.Router();
//index in param is called everytime when we react /:index it is used in order to check if the useer is available or not
//the checkUser also have the argument req,res,next,val where val is used to check the value of the index sent
// since a router is specified to a particular  Router so the router.param is bound with the userRouter
router.route('/signup').post(authController.signUp);
router.route('/signin').post(authController.signIn);
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:resetToken').patch(authController.resetPassword);
router
  .route('/updateMyPassword')
  .patch(authController.control, authController.updatePassword);
router
  .route('/updateMe')
  .patch(authController.control, userController.updateMe);
// router.param('index', checkUser);
// .post(createUser);
router.route('/').get(authController.control, userController.getAllUsers);
router
  .route('/deleteMe')
  .delete(authController.control, userController.deleteMe);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(
    authController.control,
    authController.restrictTo('admin', 'lead-guide'),
    userController.deleteUser,
  );
module.exports = router;
