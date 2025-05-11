import { fetchDestinations } from "@/utils/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetchDestinations();
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return NextResponse.json(
      { error: "Failed to fetch destinations" },
      { status: 500 }
    );
  }
}
