const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");
if (savedTheme) root.setAttribute("data-theme", savedTheme);

document.addEventListener("DOMContentLoaded", () => {
  /**
   * THEME STUFF
   */
  const toggle = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");

  const updateIcon = (theme) => {
    icon.className =
      theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
  };

  const currentTheme = root.getAttribute("data-theme") || "light";

  updateIcon(currentTheme);

  toggle.addEventListener("click", () => {
    const current =
      root.getAttribute("data-theme") === "dark" ? "dark" : "light";

    const next = current === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);

    updateIcon(next);
  });

  /**
   * CLEAR THE URL QUERY (JUST FOR THE WAY IT LOOKS, I DONT USING LIKE USING QUERY, BUT ITS MVP AND NO TIME :)
   */
  /**
   * GENERAL - REMOVE URL QUERY (FOR THE MVP :)
   */
  const url = new URL(window.location.href);
  const paramsToRemove = ["msg", "msg_type"];
  let changed = false;
  for (const key of paramsToRemove) {
    if (url.searchParams.has(key)) {
      url.searchParams.delete(key);
      changed = true;
    }
  }
  if (changed) {
    const newUrl =
      url.pathname +
      (url.searchParams.toString() ? `?${url.searchParams}` : "");

    window.history.replaceState({}, document.title, newUrl);
  }
});
