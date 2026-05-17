import {
  findBundleBySlug,
  addLink,
} from "../../../../modules/bundles.db.js";

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

    await addLink({
      bundle_id: bundle.id,
      title,
      url,
    });

    return res.redirect(
      `/dashboard/manage/${slug}?msg_type=success&msg=${encodeURIComponent(
        "Link added successfully.",
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
