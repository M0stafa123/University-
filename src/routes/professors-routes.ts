import express from "express";
import { ObjectId } from "mongodb";
import bodyParser from "body-parser";
import professorModel from "../models/Professors";
import CourseModel from "../models/Courses";
const professorRoute = express.Router();
professorRoute.use(bodyParser.json());

//Create a document
professorRoute.post("/", async (req, res) => {
  const create = await professorModel.create(req.body);
  const query = await professorModel.findOne({ name: req.body.name });
  await CourseModel.updateOne(
    { name: req.body.department_name },
    { $push: { proffesor_id: query.id } }
  );
  console.log(query.id);

  res.json(create);
});
//create many documents
professorRoute.post("/bulk", async (req, res) => {
  const create = await professorModel.insertMany(req.body);
  create.forEach(async (result) => {
    await CourseModel.updateOne(
      { name: result.department_name },
      { $push: { proffesor_id: result.id } }
    );
  });
  res.send(create);
});

// find one or more document
professorRoute.get("/:id?", async (req, res) => {
  const pages: any = req.query.p || 0;
  const studentsberpage = 5;

  if (req.params.id) {
    if (ObjectId.isValid(req.params.id)) {
      try {
        const findOne = await professorModel.findOne({
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
    const FindAll = await professorModel
      .find({})
      .skip(pages * studentsberpage)
      .limit(studentsberpage);
    res.send(FindAll);
  }
});

//update a document
professorRoute.patch("/:id", async (req, res) => {
  const update = await professorModel.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.send(update);
});

//delete all documents
professorRoute.delete("/bulk", async (req, res) => {
  const destroyall = await professorModel.deleteMany({});
  res.send(destroyall);
});

//delete a document
professorRoute.delete("/:id", async (req, res) => {
  const destroy = await professorModel.deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.send("Deleted successfuly");
});

export default professorRoute;
