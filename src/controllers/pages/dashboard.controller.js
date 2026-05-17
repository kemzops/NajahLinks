import { render } from "../../eta.js";
import { getBundlesByUserId } from "../../modules/bundles.db.js";
import { generateSlug } from "../../utils/helpers.js";

export default async (req, res) => {
  try {
    const user = req.user;

    // should never happen because middleware protects route BUT why not
    if (!user) {
      return res.redirect("/auth");
    }

    const bundles = await getBundlesByUserId(user.id);

    const template = render("dashboard/dashboard", {
      title: "NajahLinks | User Dashboard",
      template: "dashboard",
      user: res.locals.user,
      msg_type: req.query?.msg_type || null,
      msg: req.query?.msg || null,
      bundles,
    });

    return res.status(200).send(template);
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
