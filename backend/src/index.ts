import express from "express";
import cors from "cors";
import { KEYS } from "./config/keys";
import { sql } from "./database/db";
import propertyRouter from "./router/propertyRouter";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World !!!");
});

app.use("/api/property", propertyRouter);

app.listen(KEYS.PORT, () => {
  console.log(`Server running on port ${KEYS.PORT}`);
  try {
    sql`SELECT 1 + 1`;
    console.log("Database connected ✅");
  } catch (error) {
    console.log("Database connection failed ❌");
    console.log(error);
  }
});
