import express from "express";
import {
  getHi,
  getProperties,
  insertProperties,
} from "../controllers/propertyController";

const propertyRouter = express.Router();

propertyRouter.get("/hello", getHi);

propertyRouter.get("/", getProperties);

propertyRouter.post("/", insertProperties);

export default propertyRouter;
