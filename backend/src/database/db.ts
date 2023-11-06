import postgres from "postgres";
import { KEYS } from "../config/keys";

const sql = postgres({
  host: KEYS.DB_HOST,
  port: Number(KEYS.DB_PORT),
  database: KEYS.DB_NAME,
  username: KEYS.DB_USERNAME,
  password: KEYS.DB_PASSWORD,
});

export default sql;
