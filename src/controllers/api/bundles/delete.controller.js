import { findBundleBySlug, deleteBundle } from "../../../modules/bundles.db.js";

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

    const bundle = await findBundleBySlug(slug);

    if (!bundle) {
      return res.redirect(
        `/dashboard?msg_type=error&msg=${encodeURIComponent(
          "Bundle not found",
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

    const deleted = await deleteBundle(bundle.id);

    if (!deleted) {
      return res.redirect(
        `/dashboard/manage/${slug}?msg_type=error&msg=${encodeURIComponent(
          "Failed to delete bundle.",
        )}`,
      );
    }

    return res.redirect(
      `/dashboard?msg_type=success&msg=${encodeURIComponent(
        "Bundle deleted successfully.",
      )}`,
    );
  } catch (err) {
    console.error(err);

    return res.redirect(
      `/auth?msg_type=error&msg=${encodeURIComponent(
        "Internal server error.",
      )}`,
    );
  }
};
