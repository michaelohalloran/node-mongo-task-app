const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

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

	db
		.collection("tasks")
		.insertMany(
			[
				{ task: "Walk", completed: true },
				{ task: "Bike", completed: false },
				{ task: "Sleep", completed: true }
			],
			(err, res) => {
				if (err) {
					return console.log("Tasks error: ", err);
				}
				console.log("Tasks res: ", res.ops);
			}
		);
});
