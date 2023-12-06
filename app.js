const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());
const tours = JSON.parse(fs.readFileSync("./tours.json"));
// app.get("/api/v1/tours", (req, res) => {
// 	res.status(200).json({
// 		state: "success",
// 		length: tours.length,
// 		data: {
// 			tours,
// 		},
// 	});
// });
app.post("/api/v1/tours", (req, res) => {
	console.log(req.body);
	res.send("Done");
});
app.listen(8001, () => {
	console.log("__Listening To Port 8001__");
});
