const express = require("express");
const router = new express.Router();
const User = require("../models/user");

router.get("/users", async (req, res) => {
	try {
		const users = await User.find({});
		res.status(200).send(users);
	} catch (e) {
		return res.status(500).send(err);
	}
});

router.get("/users/:id", async (req, res) => {
	try {
		const user = await User.findById({ _id: req.params.id });
		if (!user) {
			return res.status(404).send();
		}
		return res.status(200).send(user);
	} catch (e) {
		res.status(500).send();
	}
});

router.patch("/users/:id", async (req, res) => {
	//this disallows trying to update height or some other non-existent user property:
	const updates = Object.keys(req.body);
	const allowedUpdates = [ "name", "email", "password", "age" ];
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

	if (!isValidOperation) {
		return res.status(400).send({ error: "Not a valid update" });
	}

	try {
		//new option returns newly updated user instead of old one
		const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		if (!user) {
			return res.status(404).send();
		}
		return res.status(200).send(user);
	} catch (e) {
		return res.status(400).send(e);
	}
});

router.post("/users", async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		res.status(201).send(user);
	} catch (e) {
		res.status(400).send(err);
	}
});

router.delete("/users/:id", async (req, res) => {
	try {
		const userToDelete = await User.findByIdAndDelete(req.params.id);
		if (!userToDelete) {
			return res.status(404).send();
		}
		return res.status(204).send();
	} catch (e) {
		return res.status(500).send();
	}
});

module.exports = router;
