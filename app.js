const fs = require("fs");
const { v4 } = require("uuid");
const express = require("express");
const app = express();
app.use(express.json());
let tours = JSON.parse(fs.readFileSync("./data/tours-simple.json"));
let users = JSON.parse(fs.readFileSync("./data/users.json"));
function getAllTours(req, res) {

	res.status(200).json({
		status: "success",
		result: tours.length,
		data: tours,
	});
}
function createTour(req, res) {
	const id = tours[tours.length - 1].id + 1;
	const newTour = Object.assign({ id }, req.body);
	tours.push(newTour);
	fs.writeFile("./data/tours-simple.json", JSON.stringify(tours), (err) => {
		if (err) res.status(400).send("unable to write the file");
		res.status(201).json({
			method: "post",
			status: "success",
			data: newTour,
		});
	});
}
function getTour(req, res) {
	const id = req.params.id;
	res.status(200).json({
		status: "success",
		data: tours.find((tour) => tour.id == id),
	});
}
function updateTour(req, res) {
	const id = req.params.id;
	if (id > tours.length) res.status(404).json({ error: "Error 404" });
	res.status(200).json({
		status: "success",
		message: "Updated the data",
	});
}
function deleteTour(req, res) {
	const id = req.params.id;
	if (tours.length < id) res.status(404).json({ error: "Error 404" });
	res.status(200).json({
		status: "success",
		message: "deleted",
		data: null,
	});
}
const toursRouter = express.Router();
const usersRouter = express.Router();
toursRouter.route("/").get(getAllTours).post(createTour);
toursRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);
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
usersRouter.route("/").get(getAllUsers).post(createUser);
usersRouter.route("/:index").get(getUser).patch(updateUser).delete(deleteUser);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/tours", toursRouter);
app.listen(8001, "127.0.0.1", () => {
	console.log("__Listening to port 8001__");
});
