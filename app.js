const express = require("express");
const toursRouter = require("./routes/toursRouter");
const usersRouter = require("./routes/usersRouter");
const app = express();
app.use(express.json());

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/tours", toursRouter);
app.listen(8001, "127.0.0.1", () => {
	console.log("__Listening to port 8001__");
});
