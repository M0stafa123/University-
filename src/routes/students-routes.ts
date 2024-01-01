import express, { query } from "express";
import { ObjectId } from "mongodb";
import bodyParser from "body-parser";
import StudentModel from "../models/students";
import CourseModel from "../models/Courses";
const studentsRoute = express.Router();

studentsRoute.use(bodyParser.json());

//Create a document
studentsRoute.post("/", async (req, res) => {
  const create = await StudentModel.create(req.body);

  await CourseModel.updateOne(
    { name: create.department_name },
    {
      $push: {
        students: { id: create.id, academic_year: create.academic_year },
      },
    }
  );
  res.json(create);
});
//create many documents
studentsRoute.post("/bulk", async (req, res) => {
  const create = await StudentModel.insertMany(req.body);
  create.forEach(async (result) => {
    await CourseModel.updateOne(
      { name: result.department_name },
      { $push: { student_id: result.id } }
    );
  });
  res.json(create);
});

studentsRoute.get("/academicyear", async (req, res) => {
  let query;
  if (req.query.year === "first-year") {
    query = await StudentModel.find({
      academic_year: "first year",
    });
    console.log(req.query.year === "first-year");
  } else if (req.query.year === "second-year") {
    query = await StudentModel.find({
      academic_year: "second year",
    });
  } else if (req.query.year === "third-year") {
    query = await StudentModel.find({
      academic_year: "third year",
    });
  } else if (req.query.year === "fourth-year") {
    query = await StudentModel.find({
      academic_year: "fourth year",
    });
  } else {
    res.send("pls enter a valid academic year");
  }
  res.json(query);
});

// find one or more document
studentsRoute.get("/:id?", async (req, res) => {
  const pages: any = req.query.p || 0;
  const studentsberpage = 5;
  if (req.params.id) {
    if (ObjectId.isValid(req.params.id)) {
      try {
        const findOne = await StudentModel.findOne({
          _id: new ObjectId(req.params.id),
        });
        res.json(findOne);
      } catch (error) {
        res.json(error);
      }
    } else {
      res.json("invalid ID");
    }
  } else {
    const FindAll = await StudentModel.find({})
      .skip(pages * studentsberpage)
      .limit(studentsberpage);

    res.send(FindAll);
  }
});

//update a document
studentsRoute.patch("/:id", async (req, res) => {
  const update = await StudentModel.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.json(update);
});

//delete  all docs
studentsRoute.delete("/bulk", async (req, res) => {
  const destroyall = await StudentModel.deleteMany({});
  res.send(destroyall);
});

//delete a document
studentsRoute.delete("/:id", (req, res) => {
  const destroy = StudentModel.deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.json("Deleted successfuly");
});

export default studentsRoute;
// .then((result) => {
//   const student = result._id.toString();

//   CourseModel.updateOne(
//     { name: req.body.department_name },
//     { $push: { student_id: student } }
//   );
//   console.log(student, req.body.department_name, query);
// })
// .catch((err) => {
//   console.log(err);
// });
