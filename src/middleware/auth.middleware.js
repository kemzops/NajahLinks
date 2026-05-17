import { verifyJWT } from "../utils/jwt.js";

export function attachUser(req, res, next) {
  const token = req.cookies?.auth_token;
  const decoded = token ? verifyJWT(token) : null;

  req.user = decoded;

  res.locals.user = decoded
    ? {
        email: decoded.email,
        student_id: decoded.student_id,
      }
    : null;

  next();
}

export function redirectIfAuthenticated(req, res, next) {
  const token = req.cookies?.auth_token;
  const decoded = token ? verifyJWT(token) : null;

  if (decoded) return res.redirect("/dashboard");

  next();
}

export function requireAuthentication(req, res, next) {
  const token = req.cookies?.auth_token;

  if (!token) {
    return res.status(401).redirect("/auth?msg_type=error&msg=Login required");
  }

  const decoded = verifyJWT(token);

  if (!decoded) {
    return res
      .status(401)
      .redirect("/auth?msg_type=error&msg=Session expired, please login again");
  }

  req.user = decoded;

  res.locals.user = {
    email: decoded.email,
    student_id: decoded.student_id,
  };

  next();
}
