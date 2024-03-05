const express = require("express");
const router = express.Router();
const EventsBlog = require("../models/events_blogs");
const { checkAuthMiddleware } = require("../utils/auths");
const { isValidText, isValidImageUrl } = require("../utils/validations");

router.get("/", async (req, res, next) => {
  try {
    const events = await EventsBlog.find({});
    res.json(events);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const events = await EventsBlog.findById(req.params.id);
    res.json(events);
  } catch (error) {
    next(error);
  }
});

router.use(checkAuthMiddleware);

router.post("/", async (req, res, next) => {
  console.log(req.token);
  let errors = {};
  if (!isValidText(req.body.title)) {
    errors.title = "Invalid Title";
  }
  if (!isValidText(req.body.description)) {
    errors.description = "Invalid Description";
  }
  if (!isValidImageUrl(req.body.image)) {
    errors.image = "Invalid Image URL";
  }
  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the event failed due to validation errors.",
      errors,
    });
  }

  const eventsNews = new EventsBlog(req.body);

  try {
    const events = await eventsNews.save();
    res.status(201).json({ message: "Event saved", events });
  } catch (error) {
    console.log(req.token);
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  let errors = {};

  if (!isValidText(req.body.title)) {
    errors.title = "Invalid Title";
  }
  if (!isValidText(req.body.description)) {
    errors.description = "Invalid Description";
  }
  if (!isValidImageUrl(req.body.image)) {
    errors.image = "Invalid Image URL";
  }
  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Updating the event failed due to validation errors.",
      errors,
    });
  }
  try {
    const events = await EventsBlog.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    res.status(201).json({ message: "Event saved", events });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await EventsBlog.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "Event deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
