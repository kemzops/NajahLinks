import { render } from "../../eta.js";
import {
  findBundleBySlug,
  getLinksByBundleId,
} from "../../modules/bundles.db.js";

export default async (req, res) => {
  const user = req.user;
  const { slug } = req.params;

  if (!user) {
    return res.redirect(
      `/auth?msg_type=error&msg=${encodeURIComponent("Login required")}`,
    );
  }

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
      `/dashboard?msg_type=error&msg=${encodeURIComponent("Bundle not found")}`,
    );
  }

  if (bundle.user_id !== user.id) {
    return res.redirect(
      `/dashboard?msg_type=error&msg=${encodeURIComponent(
        "Unauthorized access.",
      )}`,
    );
  }

  const links = await getLinksByBundleId(bundle.id);

  const template = render("dashboard/manage", {
    title: `NajahLinks | ${bundle.slug}`,
    template: "manage",
    user: res.locals.user,
    msg_type: req.query?.msg_type || null,
    msg: req.query?.msg || null,
    bundle,
    links,
  });

  return res.status(200).send(template);
};
