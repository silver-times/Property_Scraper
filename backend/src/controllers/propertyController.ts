import { Request, Response } from "express";
import {
  insertPropertyIntoDatabase,
  getPropertyFromDatabase,
} from "../database/db";
import fs from "fs/promises";

export const getProperties = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string);
    const properties = await getPropertyFromDatabase(page);

    res.json(properties);
  } catch (error) {
    console.error("Error getting properties:", error);
    res.status(500).json({ error: "Error getting properties" });
  }
};

export const insertProperties = async (req: Request, res: Response) => {
  try {
    const rawData = await fs.readFile("./src/scraper/siteData.json");

    const siteData = JSON.parse(rawData.toString());

    for (const property of siteData) {
      await insertPropertyIntoDatabase(property);
    }
    res.json({ message: "Site data imported successfully" });
  } catch (error) {
    console.error("Error importing site data:", error);
    res.status(500).json({ error: "Site data import failed" });
  }
};
