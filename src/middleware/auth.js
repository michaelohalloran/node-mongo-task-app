const User = require("../models/user");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
	try {
		const token = req.header("Authorization").replace("Bearer ", "");
		const decoded = jwt.verify(token, "secrettokenword");
		//check that token is still in user's token array
		//if not, that means it was deleted (i.e., user logged out)
		const user = await User.findOne({ _id: decoded._id, "tokens.token": token });

		if (!user) {
			throw new Error();
		}

		req.user = user;
		next();
	} catch (e) {
		res.status(401).send({ error: "Please authenticate." });
	}
};

module.exports = auth;
