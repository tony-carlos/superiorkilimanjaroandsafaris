import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const data = await request.json();

    // Create a transporter using the credentials from .env.local
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Format the form data for email
    const formatFormData = (data) => {
      // Find the country name from the code
      const country = data.countryCode
        ? countryData.find((c) => c.code === data.countryCode)?.name ||
          data.countryCode
        : "Not specified";

      return `
        <h2>Trip Inquiry Details</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr style="background-color: #f8f9fa;">
            <th style="padding: 10px; border: 1px solid #dee2e6; text-align: left;">Field</th>
            <th style="padding: 10px; border: 1px solid #dee2e6; text-align: left;">Information</th>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #dee2e6;"><strong>Full Name</strong></td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${
              data.fullName
            }</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #dee2e6;"><strong>Email</strong></td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${
              data.email
            }</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #dee2e6;"><strong>Phone</strong></td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${
              data.phone
            }</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #dee2e6;"><strong>Country</strong></td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${country}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #dee2e6;"><strong>Trip Type</strong></td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${
              data.tripType || "Not specified"
            }</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #dee2e6;"><strong>Duration</strong></td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${
              data.duration || "Not specified"
            }</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #dee2e6;"><strong>Budget</strong></td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${
              data.budget || "Not specified"
            }</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #dee2e6;"><strong>Travel Date</strong></td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${
              data.travelDate || "Not specified"
            }</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #dee2e6;"><strong>Number of Adults</strong></td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${
              data.adults || "1"
            }</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #dee2e6;"><strong>Number of Children</strong></td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${
              data.children || "0"
            }</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #dee2e6;"><strong>Travelling With</strong></td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${
              data.travellingWith || "Not specified"
            }</td>
          </tr>
          ${
            data.safariDetails
              ? `
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #dee2e6;"><strong>Safari Details</strong></td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${data.safariDetails}</td>
          </tr>
          `
              : ""
          }
          <tr>
            <td style="padding: 10px; border: 1px solid #dee2e6;"><strong>Message</strong></td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${
              data.message
            }</td>
          </tr>
        </table>
      `;
    };

    // Email to Kilimanjaro Explore
    await transporter.sendMail({
      from: `"Trip Inquiry" <${process.env.EMAIL_USER}>`,
      to: "info@superiorkilimanjaroandsafaris.com",
      subject: `New Trip Inquiry from ${data.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto;">
          <div style="background-color: #fea709; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">New Trip Inquiry</h1>
          </div>
          
          <div style="padding: 20px; border: 1px solid #e0e0e0; background-color: #fff;">
            <p style="font-size: 16px;">You have received a new trip inquiry from ${
              data.fullName
            }.</p>
            ${formatFormData(data)}
            <p>Please respond to this inquiry as soon as possible.</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 14px; color: #555;">
            <p style="margin: 5px 0;">This message was sent automatically from your website contact form.</p>
          </div>
        </div>
      `,
    });

    // Email to customer
    await transporter.sendMail({
      from: `"Superior Kilimanjaro And Safaris" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: "Thank You for Your Trip Inquiry - Superior Kilimanjaro And Safaris",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto;">
          <div style="background-color:rgb(12, 180, 12); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Thank You for Your Inquiry</h1>
          </div>
          
          <div style="padding: 20px; border: 1px solid #e0e0e0; background-color: #fff;">
            <p style="font-size: 16px;">Dear ${data.fullName},</p>
            
            <p>Thank you for your interest in planning a trip with Kilimanjaro Explore. We have received your inquiry and are excited about the possibility of helping you plan your dream trip to Tanzania.</p>
            
            <p>Our team will review your details and get back to you shortly with a personalized proposal tailored to your preferences.</p>
            
            <p>Here's a summary of the information you provided:</p>
            
            ${formatFormData(data)}
            
            <p>If you have any questions in the meantime, please don't hesitate to contact us.</p>
            
            <p>We look forward to helping you create unforgettable memories in Tanzania!</p>
            
            <p style="margin-top: 30px;">
              Kind regards,<br>
              <strong>Superior Kilimanjaro And Safaris</strong><br>
              +447772162477<br>
              <a href="mailto:info@superiorkilimanjaroandsafaris.com">info@superiorkilimanjaroandsafaris.com</a><br>
              Exeter Devon, London UK, Tanzania Africa
            </p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 14px; color: #555;">
            <p style="margin: 5px 0;">© ${new Date().getFullYear()} Superior Kilimanjaro And Safaris. All rights reserved.</p>
            <p style="margin: 5px 0;">This email was sent in response to your trip inquiry.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}

// Include the country data in the API route for reference
const countryData = [
  { name: "Afghanistan", flag: "🇦🇫", code: "AF", dial_code: "+93" },
  { name: "Åland Islands", flag: "🇦🇽", code: "AX", dial_code: "+358" },
  // ... rest of countryData (abbreviated for brevity)
  // You can copy the full country data array from your page component
];
