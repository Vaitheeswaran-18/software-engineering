const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Connection Error:", err));

// Schema for the Authors

const userSchema = new mongoose.Schema({
  username: String,
  phoneno: String,
  usertype: String,
  email: String,
  password: String,
});

// Model
const User = mongoose.model("User", userSchema);

app.post("/data", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      phoneno: req.body.phoneno,
      usertype: req.body.usertype,
      email: req.body.email,
    });

    await newUser.save();

    console.log("Saved to DB:", newUser);
    res.send("User saved successfully!");
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).send("Error saving user");
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

