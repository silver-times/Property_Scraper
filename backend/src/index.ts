import express from "express";
import cors from "cors";
import { KEYS } from "./config/keys";
import { sql } from "./database/db";
import propertyRouter from "./router/propertyRouter";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", propertyRouter);

app.listen(KEYS.PORT, () => {
  console.log(`Server running on port ${KEYS.PORT}`);
  try {
    sql`SELECT 1 + 1`;
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
});
