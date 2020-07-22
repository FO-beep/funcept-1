const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
//routes

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/mernstack",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      process.exit(1);
      console.log("unable to connect to the database");
    } else console.log("successfully connected to the database");
  }
);

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(` 🌎  ==> App is running on PORT ${port}!`);
});
