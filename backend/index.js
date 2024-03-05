if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
const EventBlogs = require("./routes/EventsBlogs");
const Authentication = require("./routes/Authentication");

/* connect to database */
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

const app = express();

/* middleware */
app.use(bodyParse.json());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

/* Route for events and blogs */
app.get("/", (req, res) => res.send("Express on Vercel"));
app.use("/events", EventBlogs);
app.use("/auth", Authentication);

/* start server */
app.listen(process.env.PORT || 8080, () => {
  console.log("server running on http://localhost:8080/");
});
