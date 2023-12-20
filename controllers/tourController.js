const fs = require("fs");
let tours = JSON.parse(fs.readFileSync("./data/tours-simple.json"));
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
exports.getAllTours = getAllTours;
exports.createTour = createTour;
exports.getTour = getTour;
exports.updateTour = updateTour;
exports.deleteTour = deleteTour;
