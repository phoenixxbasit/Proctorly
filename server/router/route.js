import express from "express";
import * as studentController from '../controllers/studentController.js'
import * as instructorController from '../controllers/instructorController.js'
import * as questionController from '../controllers/questionController.js'
import * as resultController from '../controllers/resultController.js'

const studentRouter = express.Router();
const instructorRouter = express.Router();
const questionRouter = express.Router();
const resultRouter = express.Router();


studentRouter.post("/register", studentController.createstudent);
studentRouter.post("/login", studentController.loginstudent);

instructorRouter.post("/register", instructorController.createinstructor);
instructorRouter.post("/login", instructorController.logininstructor);

questionRouter.get("/", questionController.getquestions);
questionRouter.get("/insertmany", questionController.insertmanyquestions);
questionRouter.post("/insert", questionController.insertquestion);
questionRouter.get("/delete/:id", questionController.deleteQuestion);

resultRouter.get("/:username", resultController.getresultbyusername);
resultRouter.get("/id/:id", resultController.getresultbyid);
resultRouter.get("/", resultController.getresults);
resultRouter.post("/insert", resultController.insertresult);
resultRouter.get("/delete/:id", resultController.deleteresult);

export {
  studentRouter,
  instructorRouter,
  questionRouter,
  resultRouter
};
