import mongoose, { Schema } from "mongoose";

mongoose.connect("mongodb://0.0.0.0:27017/UNIVERSITY");
const StudentModel = mongoose.model(
  "students",
  new Schema({
    name: String,
    academic_year: String,
    department_name: String,
  })
);
export default StudentModel;
