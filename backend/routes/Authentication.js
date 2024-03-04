const express = require("express");
const { createJSONToken, isValidPassword } = require("../utils/auths");
const { isValidEmail, isValidText } = require("../utils/validations");
const { hash } = require("bcryptjs");
const User = require("../models/users");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json({ users });
  } catch (error) {
    next(error);
  }
});

router.delete("/secret/delete/user/:id", async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
});

router.post("/signup", async (req, res, next) => {
  let errors = {};

  if (!isValidEmail(req.body.email)) {
    errors.email = "Invalid Email";
  } else {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        errors.email = "Email exists already.";
      }
    } catch (error) {}
  }

  if (!isValidText(req.body.password, 6)) {
    errors.password = "Invalid password. Must be at least 6 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "User signup failed due to validation errors.",
      errors,
    });
  }

  const hashPassword = await hash(req.body.password, 12);
  const user = new User({ ...req.body, password: hashPassword });
  try {
    await user.save();
    const authToken = createJSONToken(user.email);
    res.status(201).json({ message: "User created", user, token: authToken });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  let user;
  try {
    user = await User.findOne({ email: req.body.email });
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed." });
  }

  const pwIsValid = await isValidPassword(req.body.password, user.password);
  if (!pwIsValid) {
    return res.status(422).json({
      message: "Invalid credentials.",
      errors: { credentials: "Invalid email or password entered." },
    });
  }

  const token = createJSONToken(user.email);
  res.json({ token });
});

module.exports = router;
