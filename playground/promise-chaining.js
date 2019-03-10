require("../src/db/mongoose");
const User = require("../src/models/user");

//id for Jack's age, 5c843e6e1eb746544439d5fe
// User.findByIdAndUpdate("5c843e6e1eb746544439d5fe", { age: 56 })
// 	.then((user) => {
// 		console.log("user: ", user);
// 		return User.countDocuments({ age: 56 });
// 	})
// 	.then((count) => console.log("Count: ", count))
// 	.catch((err) => console.log(err));

const updateAgeAndCount = async (id, age) => {
	const user = await User.findByIdAndUpdate(id, { age });
	const count = await User.countDocuments({ age });
	return count;
};

updateAgeAndCount("5c843e6e1eb746544439d5fe", 67)
	.then((count) => console.log("new count: ", count))
	.catch((err) => console.log("error, ", err));
