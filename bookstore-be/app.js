require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const router = require("./routes/route");

// read the json data
app.use(express.json());

// use middleware cors
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// routes
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});
