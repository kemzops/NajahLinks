import { findUserByEmail } from "../../../modules/users.db.js";
import { setAuthCookie } from "../../../utils/cookies.js";
import { verifyPassword } from "../../../utils/hash.js";
import {
  buildStudentEmail,
  isValidStudentEmail,
  isValidStudentID,
} from "../../../utils/helpers.js";
import { generateJWT } from "../../../utils/jwt.js";

export default async (req, res) => {
  try {
    const { student_id, password } = req.body;

    if (!student_id || !password) {
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
            "Passwords must be at least 8 characters.",
          )}`,
        );
    }

    if (!isValidStudentID(student_id)) {
      return res
        .status(400)
        .redirect(
          `/auth?msg_type=error&msg=${encodeURIComponent(
            "Invalid An-Najah student ID.",
          )}`,
        );
    }

    const email = buildStudentEmail(student_id);

    const user = await findUserByEmail(email);

    if (!user) {
      return res
        .status(404)
        .redirect(
          `/auth?msg_type=error&msg=${encodeURIComponent(
            "Account does not exist.",
          )}`,
        );
    }

    if (user.is_verified !== 1) {
      return res
        .status(403)
        .redirect(
          `/auth?msg_type=error&msg=${encodeURIComponent(
            "Account not verified.",
          )}`,
        );
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return res
        .status(401)
        .redirect(
          `/auth?msg_type=error&msg=${encodeURIComponent(
            "Invalid credentials.",
          )}`,
        );
    }

    const token = generateJWT({
      id: user.id,
      student_id: user.student_id,
      email: user.email,
    });

    if (!token) {
      return res
        .status(500)
        .redirect(
          `/auth?msg_type=error&msg=${encodeURIComponent(
            "Internal server error.",
          )}`,
        );
    }

    setAuthCookie(res, token);
    return res.status(200).redirect("/dashboard");
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
