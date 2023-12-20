const fs = require("fs");
const { v4 } = require("uuid");
const express = require("express");
const app = express();
app.use(express.json());
const tours = JSON.parse(fs.readFileSync("./data/tours-simple.json"));
const users = JSON.parse(fs.readFileSync("./data/users.json"));
function getAllTours(req, res) {
	console.log(typeof tours);
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
	console.log(tours);
	fs.writeFile("./data/tours-simple.json", JSON.stringify(tours), (err) => {
		if (err) console.log("unable to write the file");
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
app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
	.route("/api/v1/tours/:id")
	.get(getTour)
	.patch(updateTour)
	.delete(deleteTour);
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
function updateUser(req, res) {}
function deleteUser(req, res) {}
app.route("/api/v1/users").get(getAllUsers).post(createUser);
app
	.route("/api/v1/users/:index")
	.get(getUser)
	.patch(updateUser)
	.delete(deleteUser);
app.listen(8001, "127.0.0.1", () => {
	console.log("__Listening to port 8001__");
});
