import { Handler } from "@netlify/functions";
import * as nodemailer from "nodemailer";

declare const process: {
  env: {
    SMTP_HOST: string;
    SMTP_PORT: string;
    SMTP_USER: string;
    SMTP_PASS: string;
  }
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const handler: Handler = async (event) => {
  if (event.body === null) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing body" }),
    };
  }

  const { email } = JSON.parse(event.body);

  try {
    await transporter.sendMail({
      from: {
        name: "Mide from Notype.ai",
        address: "hello@notype.ai"
      },
      to: email,
      subject: "Welcome to Notype.ai Early Access! 🎉",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: 'Inter', sans-serif;">
          <img src="https://notypeai.netlify.app/mail.png" alt="Notype.ai Header" style="width: 100%; height: auto; margin-bottom: 24px;" />
          <h2 style="color: #2D3748; margin-bottom: 16px; font-size: 24px;">Hey ${email}! 👋</h2>
          <p style="color: #4A5568; line-height: 1.6;">Thank you for your interest in Notype.ai! We're excited to let you know that we're now in early access.</p>
          <p style="color: #4A5568; line-height: 1.6;">You can start using Notype.ai right away by installing our Chrome extension:</p>
          <p style="margin: 24px 0;">
            <a href="https://chromewebstore.google.com/detail/notypeai/jddchfnkcmclhijghgplffidgkcjkedd" 
               style="background-color: #6B46C1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Add to Chrome
            </a>
          </p>
          <p style="color: #4A5568; line-height: 1.6;">We're continuously working to improve your voice-to-text experience. Your feedback during this early access phase will be invaluable to us.</p>
          <p style="color: #4A5568; line-height: 1.6;">If you have any questions or feedback, feel free to reply to this email.</p>
          <br/>
          <div style="margin-top: 24px;">
            <p style="color: #4A5568; display: inline-block; vertical-align: middle; margin: 0;">With love 💕,<br/>Mide from Notype.ai</p>
          </div>
        </div>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Welcome email sent successfully" }),
    };
  } catch (error) {
    console.error("Email error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error sending welcome email" }),
    };
  }
};

export { handler };