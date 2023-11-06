import express from "express";
import sql from "./database/db";
import { KEYS } from "./config/keys";

const app = express();

app.get("/", (req, res) => {
  res.send({ message: "Hello World" });
});

app.listen(KEYS.PORT, () => {
  console.log(`Server running on port ${KEYS.PORT}`);
  try {
    sql`SELECT 1 + 1`;
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
});
