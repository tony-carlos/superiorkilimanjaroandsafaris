import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      message,
      contactPreference,
      routeName,
      packageType,
      dateRange,
      daysCount,
    } = body;

    // Create a transporter using Gmail service
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare email to company
    const companyEmailHtml = `
      <h2>New Kilimanjaro Trip Booking Request</h2>
      <p><strong>Route:</strong> ${routeName}</p>
      <p><strong>Package:</strong> ${packageType}</p>
      <p><strong>Date:</strong> ${dateRange}</p>
      <p><strong>Duration:</strong> ${daysCount} days</p>
      <hr />
      <h3>Customer Details:</h3>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Contact Preference:</strong> ${contactPreference}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    // Email to company
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "info@superiorkilimanjaroandsafaris.com",
      subject: `New Kilimanjaro Booking - ${packageType} Package for ${routeName}`,
      html: companyEmailHtml,
    });

    // Prepare email to customer
    const customerEmailHtml = `
      <h2>Thank You for Your Kilimanjaro Trip Interest!</h2>
      <p>Dear ${firstName},</p>
      <p>Thank you for your interest in climbing Mount Kilimanjaro with us. We have received your booking request for:</p>
      <ul>
        <li><strong>Route:</strong> ${routeName}</li>
        <li><strong>Package Type:</strong> ${packageType}</li>
        <li><strong>Date Range:</strong> ${dateRange}</li>
        <li><strong>Duration:</strong> ${daysCount} days</li>
      </ul>
      <p>Our team will review your request and contact you shortly via your preferred method (${contactPreference}).</p>
      <p>If you have any immediate questions, please don't hesitate to reach out to us at info@superiorkilimanjaroandsafaris.com or call +255 759 964 985.</p>
      <p>We're excited to help you conquer Africa's highest peak!</p>
      <p>Best regards,<br />The Superior Kilimanjaro And Safaris
Team</p>
    `;

    // Email to customer
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Kilimanjaro Climbing Inquiry - Kilimanjaro Explore",
      html: customerEmailHtml,
    });

    return NextResponse.json({
      success: true,
      message: "Emails sent successfully",
    });
  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
