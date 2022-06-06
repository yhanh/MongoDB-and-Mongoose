const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");

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

// create a model for students
const Student = mongoose.model("Student", studentSchema);

// updateOne
// Student.updateOne({ name: "Hannah Huang" }, { name: "Thomas Pan" }).then(
//   (meg) => {
//     console.log(meg);
//   }
// );

// updateMany
// Student.updateMany({ major: "LA" }, { major: "Landscape Architecture" }).then(
//     (meg) => {
//       console.log(meg);
//     }
//   );

// findOneAndUpdate
// Student.findOneAndUpdate(
//   { name: "Ann Chen" },
//   { name: "Yin-Yin Huang" },
//   { new: true }
// ).then((meg) => {
//   console.log(meg);
// });

// deleteOne
// Student.deleteOne({ "scholarship.merit": { $gte: 2800 } }).then((meg) => {
//   console.log(meg);
// });

// findOneAndDelete
Student.findOneAndDelete({ "scholarship.merit": { $gte: 2800 } }).then((meg) => {
  //   console.log(meg);
  // });

// find
Student.find().then((data) => {
  console.log(data);
});

// find objects in students
// way 1
// Student.find({}).then((data) => {
//   console.log(data);
// });
// way 2 找到第一個符合的資料
// Student.findOne({name: "Ann Chen"}).then((data) => {
//   console.log(data);
// });

// create an object
// const Ann = new Student({
//   name: "Ann Chen",
//   age: 23,
//   major: "LA",
//   scholarship: {
//     merit: 2500,
//     other: 1300,
//   },
// });

// save Ann to DB
// Ann.save()
//   .then(() => {
//     console.log("Ann has been saved into DB.");
//   })
//   .catch((e) => {
//     console.log("error has happened");
//     console.log(e);
//   });

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
