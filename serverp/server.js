import express from "express";
import morgan from "morgan";
import cors from "cors";
import {
  studentRouter,
  instructorRouter,
  questionRouter,
  resultRouter,
} from "./router/route.js";
import connect from "./database/conn.js";
import { config } from "dotenv";

const app = express();

/** app middlewares */
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(cors());
app.use(express.json());
config();

/** appliation port */
const port = process.env.PORT || 8080;

/** routes */
app.use("/api/student", studentRouter);
app.use("/api/intructor", instructorRouter);
app.use("/api/question", questionRouter);
app.use("/api/result", resultRouter);

app.get("/", (req, res) => {
  try {
    res.json("Get Request");
  } catch (error) {
    res.json(error);
  }
});

/** start server only when we have valid connection */
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid Database Connection");
  });
