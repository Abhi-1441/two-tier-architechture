const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// connection to mongodb
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const Users = new mongoose.model('Users', userSchema);

app.get("/demo", async (req, res) => {
  const entries = await Users.find();
  res.send(entries);
})

app.post("/demo", async (req, res) => {
  console.log(req.body);
  const user = new Users(req.body);
  user.save();
  const entries = await Users.find();
  res.send(entries);
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Succesfully started server ON port : " + port);
})