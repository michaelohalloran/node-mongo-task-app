const mongoose = require("mongoose");
const validator = require("validator");

const Task = mongoose.model("Task", {
	desc: {
		type: String,
		trim: true,
		required: true
	},
	completed: {
		type: Boolean,
		default: false
	}
});

// const anotherNewTask = new Task({
// 	desc: "Go hiking",
// 	completed: false
// });

// anotherNewTask
// 	.save()
// 	.then((saved) => console.log("Saved task: ", saved))
// 	.catch((e) => console.log("Save task error: ", e));

// const newTask = new Task({
// 	desc: "Run",
// 	completed: false
// });

// newTask
// 	.save()
// 	.then((task) => console.log("New task saved: ", task))
// 	.catch((err) => console.log("Task save error: ", err));

module.exports = Task;
