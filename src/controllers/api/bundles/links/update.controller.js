import {
  findBundleBySlug,
  findLinkById,
  updateLink,
} from "../../../../modules/bundles.db.js";

export default async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.redirect(
        `/auth?msg_type=error&msg=${encodeURIComponent("Login required.")}`,
      );
    }

    const { slug, id } = req.params;

    if (!slug || !id) {
      return res.redirect(
        `/dashboard?msg_type=error&msg=${encodeURIComponent(
          "Invalid request.",
        )}`,
      );
    }

    const bundle = await findBundleBySlug(slug);

    if (!bundle) {
      return res.redirect(
        `/dashboard?msg_type=error&msg=${encodeURIComponent(
          "Bundle not found.",
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

    const link = await findLinkById(id);

    if (!link) {
      return res.redirect(
        `/dashboard/manage/${slug}?msg_type=error&msg=${encodeURIComponent(
          "Link not found.",
        )}`,
      );
    }

    if (link.bundle_id !== bundle.id) {
      return res.redirect(
        `/dashboard/manage/${slug}?msg_type=error&msg=${encodeURIComponent(
          "Invalid link relation.",
        )}`,
      );
    }

    let { title, url } = req.body;

    if (!url) {
      return res.redirect(
        `/dashboard/manage/${slug}?msg_type=error&msg=${encodeURIComponent(
          "URL is required.",
        )}`,
      );
    }

    url = url.trim();

    if (!/^https?:\/\/.+/i.test(url)) {
      return res.redirect(
        `/dashboard/manage/${slug}?msg_type=error&msg=${encodeURIComponent(
          "Invalid URL format.",
        )}`,
      );
    }

    if (title) {
      title = title.trim();
      if (title === "") title = null;
    }

    const updated = await updateLink({
      id: link.id,
      title,
      url,
    });

    if (!updated) {
      return res.redirect(
        `/dashboard/manage/${slug}?msg_type=error&msg=${encodeURIComponent(
          "Failed to update link.",
        )}`,
      );
    }

    return res.redirect(
      `/dashboard/manage/${slug}?msg_type=success&msg=${encodeURIComponent(
        "Link updated successfully.",
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
