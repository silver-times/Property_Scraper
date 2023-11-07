import express from "express";
import sql from "./database/db";
import fs from "fs";
import { insertProperty } from "./controllers/propertyController";
import { KEYS } from "./config/keys";

const app = express();

app.get("/", (req, res) => {
  res.send({ message: "Hello World" });
});

app.post("/api/property", async (req, res) => {
  try {
    const rawData = fs.readFileSync("siteData.json");
    const siteData = JSON.parse(rawData.toString());

    for (const property of siteData) {
      console.log("Inserting property:", property);
      await insertProperty(property);
    }
    res.json({ message: "Site data imported successfully" });
  } catch (error) {
    console.error("Error importing site data:", error);
    res.status(500).json({ error: "Site data import failed" });
  }
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
