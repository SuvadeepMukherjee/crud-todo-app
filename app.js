const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const port = process.env.PORT || 3000;

const app = express();

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (e.g., CSS, JS) from the "public" folder
app.use("/", express.static("public"));

//routes
const route = require("./routes/route.js");
app.use("/api", route);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//Connect to DB
async function connectToDB() {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("Connected to DB");
  } catch (err) {
    console.error("Error connecting to DB", err);
  }
}
connectToDB();
