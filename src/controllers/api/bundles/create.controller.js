import { createBundle } from "../../../modules/bundles.db.js";
import { generateSlug } from "../../../utils/helpers.js";

export default async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.redirect(
        `/auth?msg_type=error&msg=${encodeURIComponent("Login required.")}`,
      );
    }

    let { title, description } = req.body;

    if (!title) {
      return res.redirect(
        `/dashboard?msg_type=error&msg=${encodeURIComponent(
          "Missing required title field.",
        )}`,
      );
    }

    title = title.trim();

    if (title.length <= 2 || title.length > 80) {
      return res.redirect(
        `/dashboard?msg_type=error&msg=${encodeURIComponent(
          "Invalid title length.",
        )}`,
      );
    }

    if (description) {
      description = description.trim();
      if (!description) description = null;
    }

    const slug = generateSlug();

    await createBundle({
      user_id: user.id,
      title,
      description: description || null,
      slug,
    });

    return res
      .status(200)
      .redirect(
        `/dashboard?msg_type=success&msg=${encodeURIComponent(
          "Bundle created successfully, you can now manage it and add links.",
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
