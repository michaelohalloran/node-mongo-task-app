const express = require("express");
const Task = require("../models/task");
const router = new express.Router();

// TASKS

// router.post("/tasks", (req, res) => {
// 	const task = new Task(req.body);
// 	task
// 		.save()
// 		.then(() => {
// 			res.status(201).send(task);
// 		})
// 		.catch((err) => {
// 			res.status(400).send(err);
// 		});
// });

router.post("/tasks", async (req, res) => {
	try {
		const task = new Task(req.body);
		await task.save();
		return res.status(201).send(task);
	} catch (e) {
		return res.status(400).send(e);
	}
});

//PROMISES:
// router.get("/tasks", (req, res) => {
// 	Task.find({})
// 		.then((tasks) => {
// 			return res.status(200).send(tasks);
// 		})
// 		.catch((err) => {
// 			res.status(500).send();
// 		});
// });

// router.get("/tasks/:id", (req, res) => {
// 	Task.findById({ _id: req.params.id })
// 		.then((task) => {
// 			if (!task) {
// 				return res.status(404).send();
// 			}
// 			res.status(200).send(task);
// 		})
// 		.catch((err) => res.status(500).send());
// });

//ASYNC/AWAIT:
router.get("/tasks", async (req, res) => {
	try {
		const tasks = await Task.find({});
		return res.status(200).send(tasks);
	} catch (e) {
		return res.status(500).send();
	}
});

router.get("/tasks/:id", async (req, res) => {
	try {
		const task = Task.findById({ _id: req.params.id });
		if (!task) {
			return res.status(400).send();
		}
		return res.status(200).send(task);
	} catch (e) {
		return res.status(500).send();
	}
});

router.delete("/tasks/:id", async (req, res) => {
	try {
		const taskToDelete = await Task.findByIdAndDelete(req.params.id);
		if (!taskToDelete) {
			return res.status(404).send();
		}
		return res.status(204).send();
	} catch (e) {
		return res.status(500).send();
	}
});

router.patch("/tasks/:id", async (req, res) => {
	//validation
	const updates = Object.keys(req.body);
	const allowedUpdates = [ "desc", "completed" ];
	//is every update such that allowedUpdates includes it?
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

	if (!isValidOperation) {
		return res.status(404).send({ error: "Invalid update field" });
	}
	try {
		const task = await Task.findById(req.params.id);

		updates.forEach((update) => (task[update] = req.body[update]));
		await task.save();

		//find task to update
		// const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

		if (!task) {
			return res.status(404).send();
		}
		return res.status(200).send(task);
	} catch (e) {
		return res.status(400).send(e);
	}
});

module.exports = router;
