import { verifyUserByToken } from "../../../modules/users.db.js";

/**
 * TODO: Add strict verificationToken format validation
 * OR better yet just move to signed JWT tokens to eliminate verification_token column and add expiration :)
 */
export default async (req, res) => {
  try {
    const { verificationToken } = req.params;

    if (!verificationToken) {
      return res
        .status(400)
        .redirect(
          `/auth?msg_type=error&msg=${encodeURIComponent(
            "Missing verification token.",
          )}`,
        );
    }

    const verified = await verifyUserByToken(verificationToken);

    /* EXPIRATION IS NOT CODED YET LOL - 410 GONE */
    if (!verified) {
      return res
        .status(410)
        .redirect(
          `/auth?msg_type=error&msg=${encodeURIComponent(
            "Invalid or expired verification token.",
          )}`,
        );
    }

    return res
      .status(200)
      .redirect(
        `/auth?msg_type=success&msg=${encodeURIComponent(
          "Account verified successfully. You can now login.",
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
