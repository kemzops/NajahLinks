import jwt from "jsonwebtoken";
import { JWT } from "../config.js";

export function generateJWT(user) {
  if (!user?.id || !user?.email || !user?.student_id) return null;
  try {
    return jwt.sign(
      {
        id: user.id,
        student_id: user.student_id,
        email: user.email,
      },
      JWT.secret,
      {
        expiresIn: JWT.expiresIn,
        issuer: JWT.issuer,
        audience: JWT.audience,
      },
    );
  } catch {
    return null;
  }
}

export function verifyJWT(token) {
  try {
    return jwt.verify(token, JWT.secret, {
      issuer: JWT.issuer,
      audience: JWT.audience,
    });
  } catch {
    return null;
  }
}
