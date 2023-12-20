const fs = require("fs");
const { v4 } = require("uuid");
let users = JSON.parse(fs.readFileSync("./data/users.json"));
function getAllUsers(req, res) {
	res.status(200).json({
		status: "Success",
		data: users,
		message: "successful request",
	});
}
function createUser(req, res) {
	const newUser = {
		_id: v4(),
		data: req.body,
		active: false,
	};
	users.push(newUser);
	fs.writeFile("./data/users.json", JSON.stringify(users), (err) => {
		if (err) return res.status(400).send("Error can't write the new Data");
		res.status(201).json({
			status: "successful",
			newData: newUser,
			message: "Created successfully",
		});
	});
}
function getUser(req, res) {
	const { index } = req.params;
	if (isNaN(index) || index < 1) {
		return res.status(400).json({
			status: "error",
			message: "Invalid index",
		});
	}
	const user = users[index - 1];
	if (!user) {
		return res.status(404).json({
			status: "error",
			message: "User not found",
		});
	}
	res.status(200).json({
		status: "success",
		data: user,
	});
}
function updateUser(req, res) {
	const { index } = req.params;
	if (index > users.length)
		res.status(400).send("Error can't update the users");
	res.status(200).json({
		status: "success",
		data: users[index - 1],
		message: "successfully updated",
	});
}
function deleteUser(req, res) {
	const id = req.params.index;
	if (id > users.length) res.status(400).send("No user to delete");
	users = users.filter((user, index) => id - 1 !== index);
	fs.writeFile("./data/users.json", JSON.stringify(users), (err) => {
		if (err) res.status(400).send("Can't delete the user");
		res.status(200).json({
			status: "success",
			msg: "user deleted successfully",
		});
	});
}
exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
