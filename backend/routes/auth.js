const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator"); // validation for input by user
const bcrypt = require("bcryptjs"); // for password hashing and salting
var jwt = require("jsonwebtoken");
var fetchuser = require("../Middleware/fetchuser");

const JWT_SECRET = "Tanujisnotsogoodboy";

// ROUTE 1:  Endpoint for Creating a User using: POST "/api/auth/createuser". No login required----------------------------------------------

router.post(
  "/createuser",
  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  // if there are errors, return bad request and the errors
  async (req, res) => {
    //   obj = {
    //     a: "thios",
    //     number: 34,
    //   };
    //   res.json(obj);

    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    let success = false;

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req); // using express-vadilator
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt); // await because it returns promise
      // check whether the  user with this email exists already
      let user = await User.findOne({ email: req.body.email }); // checking if user with same useremail exists
      if (user) {
        return res.status(400).json({
          success,
          error: " Sorry a user with this email already exists",
        });
      }
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      //   console.log(jwtData);
      //   res.json(user);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "Email already exists" });
      }

      console.error(error);
      res.status(500).json({ error: "Internal Server error" });
    }
    //   .then((user) => res.json(user))
    //   .catch((err) => {
    //     console.log(err);
    //     res.json({
    //       error: "please enter a unique value for email",
    //       message: err.message,
    //     });
    //   });

    // res.send(req.body);
  }
);

// ROUTE 2:  endpoint for Authenticate a User using: POST "/api/auth/login". No login required------------------- ---------------------------

router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],

  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; // destructuring taking out email and password from body

    try {
      let user = await User.findOne({ email });

      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct Credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct Credentials",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "Email already exists" });
      }

      console.error(error);
      res.status(500).json({ error: "Internal Server error" });
    }
  }
);

// ROUTE 3:  endpoint for getting loggedin user detail: POST "/api/auth/getuser".  login required------------------- ---------------------------

router.post(
  "/getuser",
  fetchuser, //fetchuser is middleware

  async (req, res) => {
    try {
      userId = req.user.id; // because id is present in req body
      const user = await User.findById(userId).select("-password"); // selecting everything except the password

      res.send(user);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "Email already exists" });
      }

      console.error(error);
      res.status(500).json({ error: "Internal Server error" });
    }
  }
);

module.exports = router;
