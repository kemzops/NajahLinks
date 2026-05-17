import { config } from "../config.js";
import { transporter } from "../smtp/client.js";

export async function sendVerificationEmail(email, token) {
  const verificationURL = `${config.url}/api/auth/verify/${token}`;

  return await transporter.sendMail({
    from: config.from,
    to: email,
    subject: "Verify your NajahLinks account",
    html: `
      <h2>NajahLinks Email Verification</h2>

      <p>Click the link below to verify your account:</p>

      <p>
        <a href="${verificationURL}">
          ${verificationURL}
        </a>
      </p>
    `,
  });
}
