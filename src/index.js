const express = require("express");
const app = express();
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const port = process.env.PORT || 3000;

//parse incoming JSON so it can be used
app.use(express.json());

app.get("/users", (req, res) => {
	User.find({})
		.then((users) => {
			return res.status(200).send(users);
		})
		.catch((err) => {
			return res.status(500).send(err);
		});
});

app.get("/users/:id", (req, res) => {
	User.findById({ _id: req.params.id })
		.then((user) => {
			if (!user) {
				return res.status(404).send();
			}
			return res.status(200).send(user);
		})
		.catch((err) => {
			res.status(500).send();
		});
});

app.post("/users", (req, res) => {
	const user = new User(req.body);
	user
		.save()
		.then(() => {
			res.status(201).send(user);
		})
		.catch((err) => {
			res.status(400).send(err);
		});
});

// TASKS

app.post("/tasks", (req, res) => {
	const task = new Task(req.body);
	task
		.save()
		.then(() => {
			res.status(201).send(task);
		})
		.catch((err) => {
			res.status(400).send(err);
		});
});

app.get("/tasks", (req, res) => {
	Task.find({})
		.then((tasks) => {
			return res.status(200).send(tasks);
		})
		.catch((err) => {
			res.status(500).send();
		});
});

app.get("/tasks/:id", (req, res) => {
	Task.findById({ _id: req.params.id })
		.then((task) => {
			if (!task) {
				return res.status(404).send();
			}
			res.status(200).send(task);
		})
		.catch((err) => res.status(500).send());
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
