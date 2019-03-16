const express = require("express");
const app = express();
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 3000;

//Express middleware:
// app.use((req, res, next) => {
// 	if (req.method === "GET") {
// 		console.log("Cannot access", req.path);
// 	} else {
// 		console.log("method: ", req.method, "path: ", req.path);
// 	}
// 	next();
// });

//Server maintenance middleware:
// app.use((req, res, next) => {
// 	res.status(503).send({ message: "In maintenance mode" });
// 	next();
// });

//parse incoming JSON so it can be used
app.use(express.json());

//ROUTES:
app.use(userRouter);
app.use(taskRouter);

// const myFunction = async () => {
// 	const pw = "secret";
// 	const hashed = await bcrypt.hash(pw, 8);
// 	console.log("pw", pw);
// 	console.log("pw2", hashed);
// 	const userPw = "secret";

// 	const isMatch = await bcrypt.compare(userPw, hashed);
// 	console.log("match?: ", isMatch);
// };

const myFunction = async () => {
	const token = jwt.sign({ _id: "abc123" }, "mysecrettoken");
	console.log("token: ", token);

	const data = jwt.verify(token, "mysecrettoken");
	console.log("data: ", data);
};

// myFunction();

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
