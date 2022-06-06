const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const fs = require("fs");

// connect to mongoDB
mongoose
  .connect("mongodb://localhost:27017/exampleDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((err) => {
    console.log("Connection Failed.");
    console.log(err);
  });

//defind a schema
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  major: String,
  scholarship: {
    merit: Number,
    other: Number,
  },
});

// create an instance method
studentSchema.methods.totalScholarship = function () {
  return this.scholarship.merit + this.scholarship.other;
};

studentSchema.method.addAge = function () {
  this.age++;
};

// create a static method
studentSchema.static.setOtherToZero = function () {
  return this.updateMany({}, { "scholarship.other": 0 });
};

// define middleware
studentSchema.pre("save", async function () {
  fs.writeFile("presave.txt", "One data is trying to be saved", (e) => {
    if (e) throw e;
  });
});

studentSchema.post("save", async function () {
  fs.writeFile("record.txt", "One data has been saved", (e) => {
    if (e) throw e;
  });
});

// create a model for students
const Student = mongoose.model("Student", studentSchema);

const newStudent = new Student({
  name: "Juin Lin",
  age: 23,
  major: "Landscape Architecture",
  scholarship: { merit: 0, other: 0 },
});

newStudent
  .save()
  .then(() => {
    console.log("saved");
  })
  .catch((e) => {
    console.log("not saved.");
    fs.writeFile("rexord.txt", "Data is not saved", (e) => {
      if (e) throw e;
    });
  });

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
