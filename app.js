const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());
const tours = JSON.parse(fs.readFileSync("./data/tours-simple.json"));
app.get("/api/v1/tours", (req, res) => {
	console.log(tours);
	res.status(200).json({
		state: "success",
		length: tours.length,
		data: {
			tours,
		},
	});
});
app.get("/api/v1/tours/:userId", (req, res) => {
	const id = req.params.userId * 1;
	const searchedTours = tours.find((item) => item.id === id);
	if (!searchedTours) {
		return res.status(400).json({
			status: "Error",
			body: "Error 404 ",
		});
	}
	res.status(200).json({
		status: "Success",
		body: searchedTours,
	});
});
app.patch("/api/v1/tours/:id", (req, res) => {
	const id = req.params.id;
	console.log(req.body);
	if (id > tours.length)
		return res.status(400).json({
			status: "failed",
			message: "Error 404",
		});
	res.status(200).json({
		status: "success",
		data: {
			message: "This is successful",
		},
	});
});
app.post("/api/v1/tours", (req, res) => {
	const newId = tours[tours.length - 1]._id + 1;
	const newTour = Object.assign({ id: newId }, req.body);
	console.log(tours.length);
	tours.push(newTour);
	fs.writeFile("./data/tours-simple.json", JSON.stringify(tours), (err) => {
		res.status(201).json({
			status: "success",
			data: {
				tours: newTour,
			},
		});
	});
});
app.delete("/api/v1/tours/:id", (req, res) => {
	const id = req.params.id;
	if (id > tours.length) {
		return res.status(400).json({
			status: "failed",
			message: "Error",
		});
	}
	res.status(204).json({
		data: null,
	});
});
app.listen(8001, () => {
	console.log("__Listening To Port 8001__");
});
