import mongoose, { Schema } from "mongoose";

mongoose.connect("mongodb://0.0.0.0:27017/UNIVERSITY");

const CourseModel = mongoose.model(
  "departments",
  new Schema({
    name: String,
    students: Array,
    proffesor_id: Array,
  })
);
export default CourseModel;
