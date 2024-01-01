import express from "express";
import { ObjectId } from "mongodb";
import bodyParser from "body-parser";
import CourseModel from "../models/Courses";
const CoursesRoute = express.Router();
CoursesRoute.use(bodyParser.json());

//Create a document
CoursesRoute.post("/", async (req, res) => {
  const create = await CourseModel.create(req.body);
  res.send(create);
});
//create many documents
CoursesRoute.post("/bulk", async (req, res) => {
  const create = await CourseModel.insertMany(req.body);
  res.send(create);
});

// find one or more document
CoursesRoute.get("/:id?", async (req, res) => {
  const pages: any = req.query.p || 0;
  const studentsberpage = 5;

  if (req.params.id) {
    if (ObjectId.isValid(req.params.id)) {
      try {
        const findOne = await CourseModel.findOne({
          _id: new ObjectId(req.params.id),
        });
        res.send(findOne);
      } catch (error) {
        res.send(error);
      }
    } else {
      res.send("invalid ID");
    }
  } else {
    const FindAll = await CourseModel.find({})
      .skip(pages * studentsberpage)
      .limit(studentsberpage);
    res.send(FindAll);
  }
});

//update a document
CoursesRoute.patch("/:id", async (req, res) => {
  const update = await CourseModel.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.send(update);
});

//delete all documents
CoursesRoute.delete("/bulk", async (req, res) => {
  const destroyall = await CourseModel.deleteMany({});
  res.send(destroyall);
});

//delete a document
CoursesRoute.delete("/:id", async (req, res) => {
  const destroy = await CourseModel.deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.send("Deleted successfuly");
});

//testing

export default CoursesRoute;
