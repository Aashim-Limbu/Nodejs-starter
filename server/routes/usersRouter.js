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
router.route('/signOut').get(authController.signOut);
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:resetToken').patch(authController.resetPassword);
router.use(authController.control);
router
  .route('/getadmin')
  .get(userController.setPramasAdmin, userController.getAllUsers);

router.route('/updateMyPassword').patch(authController.updatePassword);
router
  .route('/updateMe')
  .patch(
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateMe,
  );
router.route('/deleteMe').delete(userController.deleteMe);
router.route('/me').get(userController.getMe, userController.getUser);
router.use(authController.restrictTo('admin'));
router.route('/').get(userController.getAllUsers);
router
  .route('/:id')
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .patch(
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateUser,
  );
module.exports = router;
