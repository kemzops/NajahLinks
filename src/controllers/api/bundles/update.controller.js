import { findBundleBySlug, updateBundle } from "../../../modules/bundles.db.js";

export default async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.redirect(
        `/auth?msg_type=error&msg=${encodeURIComponent("Login required.")}`,
      );
    }

    const { slug } = req.params;

    if (!slug) {
      return res.redirect(
        `/dashboard?msg_type=error&msg=${encodeURIComponent(
          "Invalid bundle request",
        )}`,
      );
    }

    let { title, description } = req.body;

    if (!title) {
      return res.redirect(
        `/dashboard/manage/${slug}?msg_type=error&msg=${encodeURIComponent(
          "Missing required title field.",
        )}`,
      );
    }

    title = title.trim();

    if (title.length < 2 || title.length > 80) {
      return res.redirect(
        `/dashboard/manage/${slug}?msg_type=error&msg=${encodeURIComponent(
          "Invalid title length.",
        )}`,
      );
    }

    const bundle = await findBundleBySlug(slug);

    if (!bundle) {
      return res.redirect(
        `/dashboard?msg_type=error&msg=${encodeURIComponent(
          "Bundle not found", // NEED SOME LOGIC BANALNCING LATER ;D
        )}`,
      );
    }

    if (bundle.user_id !== user.id) {
      return res.redirect(
        `/dashboard?msg_type=error&msg=${encodeURIComponent(
          "Unauthorized access.",
        )}`,
      );
    }

    if (description) {
      description = description.trim();
      if (description === "") description = null;
    }

    const updated = await updateBundle({
      id: bundle.id,
      title,
      description,
    });

    if (!updated) {
      return res.redirect(
        `/dashboard/manage/${slug}?msg_type=error&msg=${encodeURIComponent(
          "Failed to update bundle.",
        )}`,
      );
    }

    return res.redirect(
      `/dashboard/manage/${slug}?msg_type=success&msg=${encodeURIComponent(
        "Bundle updated successfully.",
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
