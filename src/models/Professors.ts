import mongoose, { Schema } from "mongoose";

mongoose.connect("mongodb://0.0.0.0:27017/UNIVERSITY");

const professorModel = mongoose.model(
  "professors",
  new Schema({
    name: String,
    department_name: String,
  })
);

export default professorModel;
