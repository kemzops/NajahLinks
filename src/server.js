import app from "./app.js";
import { config } from "./config.js";
import { transporter } from "./smtp/client.js";

/**
 * HTTP Server
 */
const server = app.listen(config.port, () => {
  console.log(`[NL] HTTP Server started on port ${config.port}`);
  console.log(`[NL] HTTP Server running on: ${config.url}`);
});

/**
 * SMTP Server Verification - https://nodemailer.com/smtp
 */
try {
  await transporter.verify();
  console.log("[NL] SMTP Server is ready to take messages");
} catch (error) {
  console.error("[NL] SMTP Server connection verification failed", error);
}

/**
 * Server error handling
 */
server.on("error", (error) => {
  console.error(`[NL] Server error: ${error.message}`);

  if (error.code === "EADDRINUSE") {
    process.exit(1); // PORT IN-USE (HTTP server is not running, force exit)
  } else {
    exitHandler("SERVER_ERROR", 1);
  }
});

/**
 * Graceful server shutdown
 */
function exitHandler(signal = "EXIT", exitCode = 0) {
  console.log(`[NL] Shutdown signal: ${signal}, Server closing...`);

  server.close((error) => {
    if (error) {
      console.error("[NL] Error closing server:", error);
      process.exit(1); // FORCE IF NEEDED
    }
    process.exit(exitCode); // FORCE IF NEEDED
  });
}

// Exit Signals
process.on("SIGINT", () => exitHandler("SIGINT"));
process.on("SIGTERM", () => exitHandler("SIGTERM"));
