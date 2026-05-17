import { render } from "../../eta.js";
import {
  findBundleBySlug,
  getLinksByBundleId,
  //incrementBundleViews,
} from "../../modules/bundles.db.js";

export default async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(404).redirect("/");
    }

    const bundle = await findBundleBySlug(slug);

    if (!bundle) {
      return res.status(404).redirect("/");
    }

    const links = await getLinksByBundleId(bundle.id);

    const template = render("bundle", {
      title: `NajahLinks | ${bundle.title}`,
      template: "bundle",
      user: res.locals.user || null,
      bundle,
      links,
    });

    // NOT NEEDED IN THE MVP
    // incrementBundleViews(bundle.id).catch(() => {});

    return res.status(200).send(template);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};
