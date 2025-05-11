import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();

    // Log the booking data
    console.log("Booking request received:", JSON.stringify(data, null, 2));

    // In a production environment, you would store this data in a database
    // This is a fallback for when email sending doesn't work

    return NextResponse.json(
      {
        message: "Booking request received. Our team will contact you shortly.",
        fallback: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling booking fallback:", error);
    return NextResponse.json(
      {
        error: "Failed to process booking",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
