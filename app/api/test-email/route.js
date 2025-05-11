import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET(request) {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    // Test email content
    const testEmailContent = `
      This is a test email from the Superior Kilimanjaro And Safaris
booking system.
      
      Email configuration is working correctly.
      
      Environment variables:
      - EMAIL_USER: ${
        process.env.EMAIL_USER ? "Set (hidden for security)" : "Not set"
      }
      - EMAIL_PASS: ${
        process.env.EMAIL_PASS ? "Set (hidden for security)" : "Not set"
      }
      
      Time: ${new Date().toLocaleString()}
    `;

    // Send test email
    const info = await transporter.sendMail({
      from: `"Test System" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to self for testing
      subject: "Email System Test",
      text: testEmailContent,
    });

    return NextResponse.json(
      {
        message: "Test email sent successfully",
        messageId: info.messageId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending test email:", error);

    // Try fallback method if the main one fails
    try {
      const fallbackTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Send test email with fallback
      const info = await fallbackTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to self for testing
        subject: "Email System Test (Fallback)",
        text: `This is a fallback test email sent at ${new Date().toLocaleString()}`,
      });

      return NextResponse.json(
        {
          message: "Test email sent successfully using fallback method",
          messageId: info.messageId,
        },
        { status: 200 }
      );
    } catch (fallbackError) {
      return NextResponse.json(
        {
          error: "Failed to send test email with both methods",
          mainError: error.message,
          fallbackError: fallbackError.message,
        },
        { status: 500 }
      );
    }
  }
}
