import nodemailer from "nodemailer";
import { SMTP } from "../config.js";

/**
 * SMTP transport
 */
export const transporter = nodemailer.createTransport({
  pool: SMTP.pool, // https://nodemailer.com/smtp
  host: SMTP.host,
  port: SMTP.port,
  secure: SMTP.secure,
  auth: {
    user: SMTP.auth.user,
    pass: SMTP.auth.pass,
  },
});
