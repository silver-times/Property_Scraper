import express from "express";
import {
  getProperties,
  insertProperties,
} from "../controllers/propertyController";

const propertyRouter = express.Router();

propertyRouter.get("/", getProperties);

propertyRouter.post("/", insertProperties);

export default propertyRouter;
