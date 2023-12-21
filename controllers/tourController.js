const fs = require("fs");
let tours = JSON.parse(fs.readFileSync("./data/tours-simple.json"));
function checkId(req, res, next, val) {
	if (req.params.id * 1 > tours.length)
		return res.status(400).json({
			status: "fail",
			message: "Invalid Id",
		});
	next();
}
function checkBody(req, res, next) {
    console.log("hi from the checkBody")
	if (req.body.name && req.body.price) next();
	else {
		return res.status(400).json({
			status: "error",
			message: "invalid body",
		});
	}
}
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
	res.status(200).json({
		status: "success",
		message: "Updated the data",
	});
}
function deleteTour(req, res) {
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
exports.checkId = checkId;
exports.checkBody = checkBody;
