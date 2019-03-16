const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
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
		unique: true,
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
	},
	tokens: [
		{
			token: {
				type: String,
				required: true
			}
		}
	]
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

//MIDDLEWARE:

//instance method, so each user instance can have this
userSchema.methods.generateAuthToken = async function() {
	const user = this;
	//sign takes identifying payload, and secret key
	//use toString to convert type ObjectId to a string
	const token = jwt.sign({ _id: user._id.toString() }, "secrettokenword");

	//after creating the token, save it to user's token array
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

//static method, for the whole User model
userSchema.statics.findByCredentials = async (email, password) => {
	//find user by email (since pw is hashed)
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error("Unable to log in");
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error("Cannot login");
	}
	return user;
};

//hash pw before saving:
userSchema.pre("save", async function(next) {
	const user = this;

	//only hash the pw when it's being modified (e.g., new user)
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
