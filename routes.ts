import express from "express";
import CoursesRoute from "./src/routes/Courses-route";
import studentsRoute from "./src/routes/students-routes";
import professorRoute from "./src/routes/professors-routes";
const router = express.Router();
router.use("/departments", CoursesRoute);
router.use("/students", studentsRoute);
router.use("/professors", professorRoute);

export default router;
