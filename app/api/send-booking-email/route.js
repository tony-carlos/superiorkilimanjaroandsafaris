import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      tourTitle,
      fullName,
      email,
      phoneNumber,
      adults,
      youths,
      startDate,
      endDate,
      totalPrice,
      message,
    } = data;

    // Create a SMTP transporter that should work with Cloudflare
    // This uses direct SMTP connection rather than the 'gmail' service
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

    // Format dates
    const formatDate = (date) => {
      if (!date) return "Not specified";
      return new Date(date).toLocaleDateString();
    };

    // Email template for client
    const clientEmailContent = `
      Dear ${fullName},

      Thank you for booking with Superior Kilimanjaro And Safaris! We have received your booking request for the following tour:

      Tour Details:
      - Tour: ${tourTitle || "Not specified"}
      - Start Date: ${formatDate(startDate)}
      - End Date: ${formatDate(endDate)}
      - Number of Adults: ${adults || 0}
      - Number of Youths: ${youths || 0}
      - Total Price: $${totalPrice || 0}

      Your Contact Information:
      - Email: ${email}
      - Phone: ${phoneNumber}

      Additional Message:
      ${message || "No additional message"}

      Our team will review your booking and contact you shortly to confirm the details and discuss the next steps.

      Best regards,
      Superior Kilimanjaro And Safaris.
    `;

    // Email template for Kilimanjaro Explore
    const adminEmailContent = `
      New Booking Request:

      Tour Details:
      - Tour: ${tourTitle || "Not specified"}
      - Start Date: ${formatDate(startDate)}
      - End Date: ${formatDate(endDate)}
      - Number of Adults: ${adults || 0}
      - Number of Youths: ${youths || 0}
      - Total Price: $${totalPrice || 0}

      Customer Information:
      - Name: ${fullName}
      - Email: ${email}
      - Phone: ${phoneNumber}

      Customer Message:
      ${message || "No additional message"}
    `;

    try {
      // Send email to client
      await transporter.sendMail({
        from: `"Superior Kilimanjaro And Safaris" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Booking Confirmation - Superior Kilimanjaro And Safaris",
        text: clientEmailContent,
      });

      // Send email to Kilimanjaro Explore
      await transporter.sendMail({
        from: `"Superior Kilimanjaro And Safaris
Website" <${process.env.EMAIL_USER}>`,
        to: "info@superiorkilimanjaroandsafaris.com",
        subject: `New Booking Request - ${tourTitle || "Tour Booking"}`,
        text: adminEmailContent,
      });
    } catch (emailError) {
      console.error("Failed to send emails via SMTP:", emailError);

      // If direct SMTP fails, try to use a simplified approach as fallback
      // This might have better compatibility with Cloudflare
      const fallbackTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Send emails using the fallback transporter
      await fallbackTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Booking Confirmation - Superior Kilimanjaro And Safaris",
        text: clientEmailContent,
      });

      await fallbackTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: "info@superiorkilimanjaroandsafaris.com",
        subject: `New Booking Request - ${tourTitle || "Tour Booking"}`,
        text: adminEmailContent,
      });
    }

    return NextResponse.json(
      {
        message: "Emails sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.json(
      {
        error: "Failed to send emails",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
