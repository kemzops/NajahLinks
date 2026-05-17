import { render } from "../../eta.js";

export default (req, res) => {
  const template = render("auth", {
    title: "NajahLinks | Authentication Portal",
    template: "auth",
    user: res.locals?.user, // keeping it for now
    msg_type: req.query?.msg_type || null,
    msg: req.query?.msg || null,
  });

  return res.status(200).send(template);
};
