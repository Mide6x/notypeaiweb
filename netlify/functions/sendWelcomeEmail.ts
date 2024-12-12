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
      from: '"Mide from Notype.ai" <adewoleolumide05@gmail.com>',
      to: email,
      subject: "Welcome to Notype.ai Waitlist! 🎉",
      html: `
        <h2>Hey ${email}! 👋</h2>
        <p>Thank you for joining the Notype.ai waitlist. We're excited to have you on board!</p>
        <p>We're working hard to bring you the best voice-to-text experience on the web. You'll be among the first to know when we launch.</p>
        <p>Stay tuned!</p>
        <br/>
        <p>With love 💕,</p>
        <p>Mide from Notype.ai</p>
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