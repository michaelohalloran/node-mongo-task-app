require("../src/db/mongoose");
const Task = require("../src/models/task");

//5c8449e64fb92234c4425c24
// Task.findByIdAndDelete({ _id: "5c8449e64fb92234c4425c24" })
// 	.then(() => {
// 		return Task.countDocuments();
// 	})
// 	.then((count) => console.log("Task count: ", count))
// 	.catch((err) => console.log(err));

//ASYNC/AWAIT
const deleteTaskAndCount = async (id) => {
	const deleted = await Task.findByIdAndDelete(id);
	const count = await Task.countDocuments();
	return deleted, count;
};

deleteTaskAndCount("5c8204038e88623e3494524b")
	.then((vals) => console.log("deleted values: ", vals))
	.catch((err) => console.log("Error: ", err));
