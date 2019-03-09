const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-api", {
	useNewUrlParser: true,
	useCreateIndex: true
});

const User = mongoose.model("User", {
	name: {
		type: String,
		required: true,
		trim: true
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error("Age must be a positive number");
			}
		}
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		required: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Not a valid email");
			}
		}
	},
	password: {
		type: String,
		trim: true,
		required: true,
		minlength: 7,
		validate(value) {
			if (value.toLowerCase().includes("password")) {
				throw new Error('Password cannot include the word "password"');
			}
		}
	}
});

// const jack = new User({
// 	name: "Jack",
// 	email: "JACK@GMAIL.COM",
// 	age: 26,
// 	password: "secret"
// });

// jack.save().then((saved) => console.log("Saved user: ", saved)).catch((err) => console.log("Error: ", err));

// const joe = new User({
// 	name: "Joe",
// 	email: "JOE@GMAIL.COM"
// });

// joe.save().then((saved) => console.log("Saved user: ", saved)).catch((err) => console.log("Error: ", err));

// const bob = new User({
// 	name: "Jimmy",
// 	// age: 34,
// 	email: "a"
// });

// bob.save().then((saved) => console.log("Saved user: ", saved)).catch((err) => console.log("Error: ", err));

// const me = new User({
// 	name: "Patrick",
// 	age: 24
// });

//save user:
// me.save().then((user) => console.log("saved user: ", user)).catch((err) => console.log("Save error: ", err));

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

const anotherNewTask = new Task({
	desc: "Go hiking",
	completed: false
});

anotherNewTask
	.save()
	.then((saved) => console.log("Saved task: ", saved))
	.catch((e) => console.log("Save task error: ", e));

// const newTask = new Task({
// 	desc: "Run",
// 	completed: false
// });

// newTask
// 	.save()
// 	.then((task) => console.log("New task saved: ", task))
// 	.catch((err) => console.log("Task save error: ", err));
