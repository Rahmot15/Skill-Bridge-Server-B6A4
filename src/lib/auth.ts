import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
      },
    },
  },
  trustedOrigins: [process.env.APP_URL!],

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;

        const info = await transporter.sendMail({
          from: `"SkillBridge" <${process.env.APP_USER}>`,
          to: user.email,
          subject: "Verify Your Email - SkillBridge",
          html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your Email - SkillBridge</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #fbfbfe;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(47, 39, 206, 0.08);
    }
    .header {
      background: linear-gradient(135deg, #2f27ce 0%, #443dff 100%);
      color: #ffffff;
      padding: 32px 24px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 900;
      letter-spacing: -0.5px;
    }
    .content {
      padding: 40px 32px;
      color: #040316;
      line-height: 1.6;
    }
    .content h2 {
      margin-top: 0;
      font-size: 24px;
      font-weight: 700;
      color: #040316;
      margin-bottom: 16px;
    }
    .content p {
      margin: 0 0 16px 0;
      color: #040316;
      opacity: 0.75;
      font-size: 16px;
    }
    .button-wrapper {
      text-align: center;
      margin: 32px 0;
    }
    .verify-button {
      background: linear-gradient(135deg, #2f27ce 0%, #443dff 100%);
      color: #ffffff !important;
      padding: 16px 48px;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      border-radius: 12px;
      display: inline-block;
      box-shadow: 0 4px 12px rgba(47, 39, 206, 0.3);
    }
    .verify-button:hover {
      opacity: 0.9;
    }
    .divider {
      margin: 32px 0;
      border: none;
      border-top: 1px solid #dddbff;
    }
    .link-section {
      background-color: #f5f3ff;
      border: 2px dashed #dddbff;
      border-radius: 12px;
      padding: 16px;
      margin: 24px 0;
    }
    .link-section p {
      margin: 0 0 8px 0;
      font-size: 13px;
      color: #040316;
      opacity: 0.6;
    }
    .link {
      word-break: break-all;
      font-size: 13px;
      color: #2f27ce;
      font-family: 'Courier New', monospace;
    }
    .warning {
      background-color: #fff8ed;
      border-left: 4px solid #ff9500;
      padding: 16px;
      margin: 24px 0;
      border-radius: 8px;
    }
    .warning p {
      margin: 0;
      font-size: 14px;
      color: #040316;
      opacity: 0.7;
    }
    .footer {
      background-color: #fbfbfe;
      padding: 24px 32px;
      text-align: center;
      border-top: 1px solid #dddbff;
    }
    .footer p {
      margin: 4px 0;
      font-size: 13px;
      color: #040316;
      opacity: 0.5;
    }
    .footer-links {
      margin-top: 12px;
    }
    .footer-link {
      color: #2f27ce;
      text-decoration: none;
      font-size: 13px;
      margin: 0 8px;
    }
    @media only screen and (max-width: 600px) {
      .content {
        padding: 30px 20px;
      }
      .content h2 {
        font-size: 20px;
      }
      .verify-button {
        padding: 14px 32px;
        font-size: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>SkillBridge</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <h2>Verify Your Email Address</h2>
      <p>
        Hello <strong>${user.name}</strong>,
      </p>
      <p>
        Welcome to <strong>SkillBridge</strong>! We're excited to have you join our community of learners and expert tutors.
      </p>
      <p>
        To complete your registration and start connecting with tutors, please verify your email address by clicking the button below:
      </p>

      <!-- Verify Button -->
      <div class="button-wrapper">
        <a href="${verificationUrl}" class="verify-button">
          Verify Email Address
        </a>
      </div>

      <hr class="divider" />

      <!-- Alternative Link -->
      <div class="link-section">
        <p><strong>Button not working?</strong> Copy and paste this link into your browser:</p>
        <p class="link">${url}</p>
      </div>

      <!-- Warning -->
      <div class="warning">
        <p>
          <strong>⚠️ Security Note:</strong> This verification link will expire soon for security reasons.
          If you did not create an account with SkillBridge, please ignore this email.
        </p>
      </div>

      <p style="margin-top: 32px;">
        Once verified, you'll be able to:
      </p>
      <ul style="margin: 12px 0; padding-left: 20px; color: #040316; opacity: 0.75;">
        <li>Browse thousands of expert tutors</li>
        <li>Book learning sessions instantly</li>
        <li>Track your progress and achievements</li>
      </ul>

      <p style="margin-top: 24px;">
        Best regards,<br />
        <strong>The SkillBridge Team</strong>
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>© ${new Date().getFullYear()} SkillBridge. All rights reserved.</p>
      <p>Connect with expert tutors and master new skills.</p>
      <div class="footer-links">
        <a href="${process.env.APP_URL}/help" class="footer-link">Help Center</a>
        <a href="${process.env.APP_URL}/privacy" class="footer-link">Privacy</a>
        <a href="${process.env.APP_URL}/terms" class="footer-link">Terms</a>
      </div>
    </div>
  </div>
</body>
</html>
`,
        });

        console.log("Verification email sent:", info.messageId);
      } catch (err) {
        console.error("Error sending verification email:", err);
        throw err;
      }
    },
  },

  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
