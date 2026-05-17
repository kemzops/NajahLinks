import { connect } from "@tursodatabase/serverless";
import { TURSO } from "../config.js";

const db = connect({
  url: TURSO.DB_URL,
  authToken: TURSO.DB_TOKEN,
});

export default db;
