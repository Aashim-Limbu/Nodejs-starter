const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());
const tours = JSON.parse(fs.readFileSync("./tours-simple.json"));
app.get("/api/v1/tours", (req, res) => {
	res.status(200).json({
		state: "success",
		length: tours.length,
		data: {
			tours,
		},
	});
});
app.post("/api/v1/tours", (req, res) => {
	const newId = tours[tours.length - 1]._id + 1;
	const newTour = Object.assign({ id: newId }, req.body);
	console.log(tours.length);
	tours.push(newTour);
	fs.writeFile("./tours-simple.json", JSON.stringify(tours), (err) => {
		res.status(201).json({
			status: "success",
			data: {
				tours: newTour,
			},
		});
	});
});
app.listen(8001, () => {
	console.log("__Listening To Port 8001__");
});
