const mongoose = require("mongoose");
const EventsBlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  current_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("EventsBlog", EventsBlogSchema);
