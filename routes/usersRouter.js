const express = require("express");
const router = express.Router();
const {
	getAllUsers,
	createUser,
	getUser,
	updateUser,
	deleteUser,
} = require("../controllers/userController");
router.route("/").get(getAllUsers).post(createUser);
router.route("/:index").get(getUser).patch(updateUser).delete(deleteUser);
module.exports = router;
