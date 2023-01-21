const router = require("express").Router();
const { User, validate } = require("../models/user");
const { OtherUser, othervalidate } = require("../models/otheruser");
const { team, teamvalidate } = require("../models/team");
const { match, matchvalidate } = require("../models/match");
const { player, playervalidate } = require("../models/player");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


router.post("/team", async (req, res) => {
	try {
		const { error } = teamvalidate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await team.findOne({ name: req.body.name });
		if (user)
			return res
				.status(409)
				.send({ message: "Team with given name already Exist!" });


		await new team({ ...req.body }).save();
		res.status(201).send({ message: "Team created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/match", async (req, res) => {
	try {
		const { error } = matchvalidate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });


		await new match({ ...req.body }).save();
		res.status(201).send({ message: "Match created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


router.post("/player", async (req, res) => {
	try {
		const { error } = playervalidate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });



		await new player({ ...req.body }).save();
		res.status(201).send({ message: "Player created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/otheruser", async (req, res) => {
	try {
		const { error } = othervalidate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await OtherUser.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given Email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		
		if(req.body.matchtype=="T20" || req.body.matchtype=="t20"){
			var d = new Date()
			d.setMinutes(d.getMinutes()+300);
			var r = new Date(d)
			await new OtherUser({ ...req.body, password: hashPassword,expireAt:r}).save();
			res.status(201).send({ message: "User created successfully" });
		}
		if(req.body.matchtype=="ODI" || req.body.matchtype=="odi"){
			var d = new Date()
			d.setMinutes(d.getMinutes()+480);
			var r = new Date(d)
			await new OtherUser({ ...req.body, password: hashPassword,expireAt:r}).save();
			res.status(201).send({ message: "User created successfully" });
		}
		if(req.body.matchtype=="TEST" || req.body.matchtype=="test"){
			var d = new Date()
			d.setMinutes(d.getMinutes()+100000000000);
			var r = new Date(d)
			await new OtherUser({ ...req.body, password: hashPassword,expireAt:r}).save();
			res.status(201).send({ message: "User created successfully" });
		}
		
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/allteam", function (req, res, next) {

	team.find().sort({"name": 1 }).exec(function (error, results) {
	  if (error) {
		return next(error);
	  }
	  // Respond with valid data
	  res.json(results);
	});
  });

router.get("/allmatch", function (req, res, next) {

	match.find().exec(function (error, results) {
	  if (error) {
		return next(error);
	  }
	  // Respond with valid data
	  res.json(results);
	});
  });

router.get("/alldoctor", function (req, res, next) {

	OtherUser.find().exec(function (error, results) {
	  if (error) {
		return next(error);
	  }
	  // Respond with valid data
	  res.json(results);
	});
  });

// router.get("/alldoctor", function (req, res, next) {
// 	// view all doctors
// 	User.find({ _id: { $nin: "63ad44742ccb8339b26e089b" } }).exec(function (error, results) {
// 	  if (error) {
// 		return next(error);
// 	  }
// 	  // Respond with valid data
// 	  res.json(results);
// 	});
//   });
  
router.get("/alldoctor/:id?", function (req, res, next) {
	// single user
	OtherUser.find({ _id: req.params.id }).exec(function (error, results) {
	  if (error) {
		return next(error);
	  }
	  // Respond with valid data
	  res.json(results);
	});
  });
router.delete("/removedoctor/:id", function (req, res) {
	// delete material
	OtherUser.deleteOne({ _id: req.params.id }, function (error, results) {
	  if (error) {
		console.log(error);
	  }
	  // Respond with valid data
	  res.json(results);
	});
  });

router.get("/allplayer/:teamname?", function (req, res, next) {
	// single user
	player.find({ teamname: req.params.teamname }).exec(function (error, results) {
	  if (error) {
		return next(error);
	  }
	  // Respond with valid data
	  res.json(results);
	});
  });

router.get("/allteam/:id?", function (req, res, next) {
	// single user
	team.find({ _id: req.params.id }).exec(function (error, results) {
	  if (error) {
		return next(error);
	  }
	  // Respond with valid data
	  res.json(results);
	});
  });
router.delete("/removeteam/:id", function (req, res) {
	// delete material
	team.deleteOne({ _id: req.params.id }, function (error, results) {
	  if (error) {
		console.log(error);
	  }
	  // Respond with valid data
	  res.json(results);
	});
  });

router.get("/allmatch/:assignuser", function (req, res, next) {
	// single user
	match.find({ assignuser: req.params.assignuser }).exec(function (error, results) {
	  if (error) {
		return next(error);
	  }
	  // Respond with valid data
	  res.json(results);
	});
  });
router.delete("/removematch/:id", function (req, res) {
	// delete material
	match.deleteOne({ _id: req.params.id }, function (error, results) {
	  if (error) {
		console.log(error);
	  }
	  // Respond with valid data
	  res.json(results);
	});
  });

module.exports = router;
