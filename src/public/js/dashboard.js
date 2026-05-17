document.addEventListener("DOMContentLoaded", () => {
  /**
   * DASHBOARD - TABLE COPY LINK
   */
  document.querySelectorAll(".copy-slug-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      try {
        const url = button.dataset.url;

        const fullURL = `${window.location.origin}${url}`;

        await navigator.clipboard.writeText(fullURL);

        button.innerHTML = `<i class="bi bi-clipboard-check"></i>`;

        setTimeout(() => {
          button.innerHTML = `<i class="bi bi-clipboard"></i>`;
        }, 1500);
      } catch (error) {
        console.error("Failed to copy URL:", error);
      }
    });
  });

  /**
   * API - LOGOUT
   */
  const logoutButton = document.getElementById("logout-btn");

  logoutButton.addEventListener("click", async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        window.location.href = "/auth?msg_type=success&msg=Logged out";
      } else {
        window.location.href = "/auth?msg_type=error&msg=Logout failed";
      }
    } catch (error) {
      window.location.href = "/auth?msg_type=error&msg=Network error";
    }
  });
});
