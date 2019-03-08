const mongodb = require("mongodb");
const { MongoClient, ObjectID } = mongodb;
const id = new ObjectID();
// console.log("id: ", id);
// console.log("timestamp: ", id.getTimestamp());

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-app";

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (err, client) => {
	if (err) {
		return console.log("Unable to connect");
	}
	// console.log("Connected!");

	const db = client.db(databaseName);
	//make users collection, insert a user
	// db.collection("users").insertOne({
	// 	name: "Bob",
	// 	age: 25
	// }, (error, res) => {
	// 	if (error) {
	// 		return console.log("Error", error);
	// 	}
	// 	console.log("result ops: ", res.ops);
	// });

	// db
	// 	.collection("users")
	// 	.insertMany([ { name: "Joe", age: 23 }, { name: "Dave", age: 33 }, { name: "Matt", age: 42 } ], (err, res) => {
	// 		if (err) {
	// 			return console.log("Error inserting many: ", err);
	// 		}
	// 		console.log("Res ops: ", res.ops);
	// 	});

	// db
	// 	.collection("tasks")
	// 	.insertMany(
	// 		[
	// 			{ task: "Walk", completed: true },
	// 			{ task: "Bike", completed: false },
	// 			{ task: "Sleep", completed: true }
	// 		],
	// 		(err, res) => {
	// 			if (err) {
	// 				return console.log("Tasks error: ", err);
	// 			}
	// 			console.log("Tasks res: ", res.ops);
	// 		}
	// 	);

	//RETRIEVE USER:
	// db.collection("users").findOne({ name: "Bob" }, (err, user) => {
	// 	if (err) {
	// 		return console.log("find error: ", err);
	// 	}
	// 	console.log("found user: ", user);
	// });

	//RETRIEVES CURSOR, WHICH CAN BE CAST AS ARRAY
	// db.collection("users").find({ age: 25 }).toArray((err, users) => {
	// 	if (err) {
	// 		return console.log("find error: ", err);
	// 	}
	// 	console.log("users: ", users);
	// });

	// db.collection("users").find({ age: 25 }).count((err, count) => {
	// 	console.log("count: ", count);
	// });

	//FIND TASKS
	// db.collection("tasks").findOne({ _id: new ObjectID("5c81f81e2587f83108131690") }, (err, task) => {
	// 	if (err) {
	// 		return console.log("task finding err: ", err);
	// 	}
	// 	console.log("found task: ", task);
	// });

	// db.collection("tasks").find({ completed: false }).toArray((err, tasks) => {
	// 	console.log("found tasks: ", tasks);
	// });

	// ***************************************************
	//UPDATING WITH PROMISES
	// db
	// 	.collection("users")
	// 	.updateOne(
	// 		{ _id: new ObjectID("5c80b96ce7697823b01ed2e0") },
	// 		// {
	// 		// 	$set: {
	// 		// 		name: "Tony"
	// 		// 	}
	// 		// }
	// 		{
	// 			$inc: {
	// 				age: 5
	// 			}
	// 		}
	// 	)
	// 	.then((update) => console.log("update applied: ", update))
	// 	.catch((err) => console.log("update error: ", err));

	//UPDATE ALL TASKS
	// db
	// 	.collection("tasks")
	// 	.updateMany({}, { $set: { completed: true } })
	// 	.then((result) => console.log("update many result: ", result))
	// 	.catch((e) => console.log("update many error: ", e));

	//*************** */
	// DELETE
	// db
	// 	.collection("users")
	// 	.deleteMany({ age: 42 })
	// 	.then((res) => console.log("delete count: ", res.deletedCount))
	// 	.catch((err) => console.log("delete error: ", err));

	db
		.collection("tasks")
		.deleteOne({ task: "Walk" })
		.then((res) => console.log("deleteOne count: ", res.deletedCount))
		.catch((err) => console.log("delete one error: ", err));
});
