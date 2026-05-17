import { clearAuthCookie } from "../../../utils/cookies.js";

export default (req, res) => {
  try {
    clearAuthCookie(res);
    return res.status(200).redirect("/auth?msg_type=success&msg=Logged out");
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
