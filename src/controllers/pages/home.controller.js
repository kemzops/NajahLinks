import { render } from "../../eta.js";

export default (req, res) => {
  const template = render("home", {
    title: "NajahLinks | Home Page",
    template: "home",
    user: res.locals.user,
  });

  return res.status(200).send(template);
};
