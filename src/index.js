const express = require("express");
const app = express();
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const bcrypt = require("bcryptjs");

const port = process.env.PORT || 3000;

//parse incoming JSON so it can be used
app.use(express.json());

//ROUTES:
app.use(userRouter);
app.use(taskRouter);

const myFunction = async () => {
	const pw = "secret";
	const hashed = await bcrypt.hash(pw, 8);
	console.log("pw", pw);
	console.log("pw2", hashed);
	const userPw = "secret";

	const isMatch = await bcrypt.compare(userPw, hashed);
	console.log("match?: ", isMatch);
};

myFunction();

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
