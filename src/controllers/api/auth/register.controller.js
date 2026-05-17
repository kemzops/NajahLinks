import { createUser, findUserByEmail } from "../../../modules/users.db.js";
import { sendVerificationEmail } from "../../../modules/verification.smtp.js";
import {
  isValidStudentEmail,
  extractStudentID,
  generateVerificationToken,
} from "../../../utils/helpers.js";
import { hashPassword } from "../../../utils/hash.js";

/**
 * NOTE: RES.STATUS(CODE) IS JUST TO INDICATE THE SERVER ERROR STATUS CODE AND WONT BE SENT TO THE CLIENT
 * INSTEAD RES.REDIRECT WILL SEND 302 (Found) STATUS CODE
 */
export default async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .redirect(
          `/auth?msg_type=error&msg=${encodeURIComponent(
            "Missing required form fields.",
          )}`,
        );
    }

    if (password.length < 8) {
      return res
        .status(400)
        .redirect(
          `/auth?msg_type=error&msg=${encodeURIComponent(
            "Password must be at least 8 characters.",
          )}`,
        );
    }

    const cleanEmail = email.trim().toLowerCase();

    const validStudentEmail = isValidStudentEmail(cleanEmail);

    if (!validStudentEmail) {
      return res
        .status(400)
        .redirect(
          `/auth?msg_type=error&msg=${encodeURIComponent(
            "Invalid An-Najah student email.",
          )}`,
        );
    }

    const existing = await findUserByEmail(cleanEmail);

    if (existing) {
      return res
        .status(409)
        .redirect(
          `/auth?msg_type=error&msg=${encodeURIComponent(
            "Account already exists.",
          )}`,
        );
    }

    const studentID = extractStudentID(cleanEmail);

    if (!studentID) {
      return res
        .status(422)
        .redirect(
          `/auth?msg_type=error&msg=${encodeURIComponent(
            "Invalid student ID.",
          )}`,
        );
    }

    const hashed = await hashPassword(password);
    const verificationToken = generateVerificationToken();

    if (!hashed || !verificationToken) {
      return res
        .status(500)
        .redirect(
          `/auth?msg_type=error&msg=${encodeURIComponent("Internal server error.")}`,
        );
    }

    const userId = await createUser({
      student_id: studentID,
      email: cleanEmail,
      password: hashed,
      verification_token: verificationToken,
    });

    await sendVerificationEmail(cleanEmail, verificationToken);

    return res
      .status(201)
      .redirect(
        `/auth?msg_type=success&msg=${encodeURIComponent(
          "User registered successfully, check your email to verify your account.",
        )}`,
      );
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .redirect(
        `/auth?msg_type=error&msg=${encodeURIComponent(
          "Internal server error.",
        )}`,
      );
  }
};
