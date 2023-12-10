const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());
const tours = JSON.parse(fs.readFileSync("./data/tours-simple.json"));
function getAllTours(req, res) {
	console.log(typeof tours);
	res.status(200).json({
		status: "success",
		result: tours.length,
		data: tours,
	});
}
function createPost(req, res) {
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
app.route("/api/v1/tours").get(getAllTours).post(createPost);
app
	.route("/api/v1/tours/:id")
	.get(getTour)
	.patch(updateTour)
	.delete(deleteTour);
app.listen(8001, "127.0.0.1", () => {
	console.log("__Listening to port 8001__");
});
