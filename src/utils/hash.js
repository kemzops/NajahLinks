import bcrypt from "bcrypt";
import { config } from "../config.js";

const pepper = config.pepper;

export async function hashPassword(password) {
  return bcrypt.hash(password + pepper, 12);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password + pepper, hash);
}
