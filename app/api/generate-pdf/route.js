import { NextResponse } from "next/server";
import { jsPDF } from "jspdf";
import {
  fetchTourPackageBySlug,
  fetchTourPackages,
} from "@/utils/tourPackages";

// Using jsPDF which works better in Next.js API routes

// Specify that this is a dynamic route
export const runtime = "edge";

export async function GET(request) {
  try {
    // Get the query params
    const { searchParams } = new URL(request.url);
    const tourId = searchParams.get("tourId");
    const tourSlug = searchParams.get("slug");

    if (!tourId && !tourSlug) {
      return NextResponse.json(
        { error: "Either Tour ID or Slug is required" },
        { status: 400 }
      );
    }

    console.log(
      `Fetching tour data for ${tourId ? "ID" : "Slug"}: ${tourId || tourSlug}`
    );

    let tour;

    if (tourSlug) {
      // Fetch by slug
      const response = await fetchTourPackageBySlug(tourSlug);
      if (!response || !response.success) {
        return NextResponse.json(
          { error: `Tour with slug ${tourSlug} not found` },
          { status: 404 }
        );
      }
      tour = response.data;
    } else {
      // Fetch by ID
      const response = await fetchTourPackages();
      if (!response || !response.data) {
        return NextResponse.json(
          { error: `Tour with ID ${tourId} not found` },
          { status: 404 }
        );
      }
      tour = response.data.find((t) => t.id === parseInt(tourId));
      if (!tour) {
        return NextResponse.json(
          { error: `Tour with ID ${tourId} not found` },
          { status: 404 }
        );
      }
    }

    console.log("Tour data fetched successfully, generating PDF...");

    // Create a new jsPDF instance
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Generate the PDF content
    await generatePdfContent(doc, tour);

    // Convert the PDF to a buffer
    const pdfBytes = doc.output();
    const buffer = Buffer.from(pdfBytes);

    // Return the PDF
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="tour-itinerary-${
          tour.slug || tour.id
        }.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error in PDF generation:", error);
    return NextResponse.json(
      {
        error: "Failed to generate PDF",
        details: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

async function generatePdfContent(doc, tour) {
  let y = 20; // Starting Y position
  const margin = 20;
  const pageWidth = 210; // A4 width in mm
  const contentWidth = pageWidth - 2 * margin;
  const footerHeight = 25; // Height reserved for footer

  // Helper function to remove HTML tags and clean special characters
  const cleanText = (text) => {
    if (!text) return "";
    return text
      .replace(/<[^>]*>/g, "") // Remove HTML tags
      .replace(/Â/g, "") // Remove Â character
      .replace(/\u00A0/g, " ") // Replace non-breaking space with regular space
      .replace(/Â©/g, "©") // Replace Â© with ©
      .trim();
  };

  // Function to add footer to current page
  const addFooter = () => {
    const footerY = 280;
    doc.setFontSize(8);
    doc.text(
      cleanText("© Kilimanjaro Explore - All rights reserved"),
      pageWidth / 2,
      footerY,
      {
        align: "center",
      }
    );
    doc.text("www.serengetinexus.com", pageWidth / 2, footerY + 5, {
      align: "center",
    });
  };

  // Set title
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Tour Itinerary", pageWidth / 2, y, { align: "center" });
  y += 15;

  // Tour title
  doc.setFontSize(16);
  doc.text(tour.title, pageWidth / 2, y, { align: "center" });
  y += 15;

  // Basic tour information
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Duration: ${tour.duration.value} ${tour.duration.unit} | Country: ${tour.country} | Group Type: ${tour.group_type} | Main Focus: ${tour.main_focus}`,
    pageWidth / 2,
    y,
    { align: "center" }
  );
  y += 15;

  // Description
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Description", margin, y);
  y += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const cleanDescription = cleanText(tour.description);
  const descLines = doc.splitTextToSize(cleanDescription, contentWidth);
  doc.text(descLines, margin, y);
  y += 5 * descLines.length + 10;

  // Map section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Tour Route Map", margin, y);
  y += 8;

  // Get all coordinates from itinerary
  const coordinates = [];

  // Add starting point if available
  if (tour.coordinates && tour.coordinates.from) {
    coordinates.push({
      lat: parseFloat(tour.coordinates.from.latitude),
      lon: parseFloat(tour.coordinates.from.longitude),
      label: "Start",
    });
  }

  // Add all destinations and accommodations from itinerary
  tour.itinerary.forEach((day, index) => {
    if (day.destination && day.destination.coordinates) {
      coordinates.push({
        lat: parseFloat(day.destination.coordinates.latitude),
        lon: parseFloat(day.destination.coordinates.longitude),
        label: `Day ${index + 1}`,
      });
    }
    if (day.accommodation && day.accommodation.coordinates) {
      coordinates.push({
        lat: parseFloat(day.accommodation.coordinates.latitude),
        lon: parseFloat(day.accommodation.coordinates.longitude),
        label: `Accommodation ${index + 1}`,
      });
    }
  });

  // Add end point if available
  if (tour.coordinates && tour.coordinates.end) {
    coordinates.push({
      lat: parseFloat(tour.coordinates.end.latitude),
      lon: parseFloat(tour.coordinates.end.longitude),
      label: "End",
    });
  }

  if (coordinates.length > 0) {
    // Calculate bounds for the map
    const bounds = coordinates.reduce(
      (acc, coord) => {
        acc.minLat = Math.min(acc.minLat, coord.lat);
        acc.maxLat = Math.max(acc.maxLat, coord.lat);
        acc.minLon = Math.min(acc.minLon, coord.lon);
        acc.maxLon = Math.max(acc.maxLon, coord.lon);
        return acc;
      },
      {
        minLat: coordinates[0].lat,
        maxLat: coordinates[0].lat,
        minLon: coordinates[0].lon,
        maxLon: coordinates[0].lon,
      }
    );

    // Add some padding to the bounds
    const latPadding = (bounds.maxLat - bounds.minLat) * 0.2;
    const lonPadding = (bounds.maxLon - bounds.minLon) * 0.2;
    bounds.minLat -= latPadding;
    bounds.maxLat += latPadding;
    bounds.minLon -= lonPadding;
    bounds.maxLon += lonPadding;

    // Create the static map URL using MapBox
    const mapWidth = 800;
    const mapHeight = 400;
    const accessToken = process.env.MAPBOX_ACCESS_TOKEN;

    // Create a GeoJSON feature collection for the route
    const geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: coordinates.map((coord) => [coord.lon, coord.lat]),
          },
        },
        ...coordinates.map((coord, i) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [coord.lon, coord.lat],
          },
          properties: {
            title: coord.label,
            "marker-color":
              i === 0
                ? "#00ff00"
                : i === coordinates.length - 1
                ? "#ff0000"
                : "#0000ff",
          },
        })),
      ],
    };

    // Create the static map URL
    const center = [
      (bounds.minLon + bounds.maxLon) / 2,
      (bounds.minLat + bounds.maxLat) / 2,
    ];
    const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(${encodeURIComponent(
      JSON.stringify(geojson)
    )})/${center[0]},${
      center[1]
    },7/${mapWidth}x${mapHeight}?access_token=${accessToken}`;

    // Add the map image to the PDF
    try {
      // Fetch the map image
      const response = await fetch(mapUrl);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Add the image to the PDF
      doc.addImage(buffer, "PNG", margin, y, contentWidth, contentWidth * 0.5);
      y += contentWidth * 0.5 + 10;
    } catch (error) {
      console.error("Error adding map to PDF:", error);
      doc.text("Map could not be generated", margin, y);
      y += 10;
    }
  } else {
    doc.text("No coordinates available for map generation", margin, y);
    y += 10;
  }

  // Itinerary section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(41, 128, 185); // Blue color for section header
  doc.text("Itinerary", margin, y);
  y += 8;

  // Itinerary details
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  tour.itinerary.forEach((day, index) => {
    // Check if we need a new page
    if (y > 270 - footerHeight) {
      addFooter();
      doc.addPage();
      y = 20;
    }

    // Day header with background
    doc.setFillColor(236, 240, 241); // Light gray background
    doc.rect(margin, y, contentWidth, 8, "F");
    doc.setTextColor(44, 62, 80); // Dark blue for day header
    doc.setFont("helvetica", "bold");
    doc.text(`Day ${index + 1}: ${day.title}`, margin + 5, y + 6);
    y += 10;

    // Time and distance if available
    if (day.time || day.distance) {
      doc.setTextColor(52, 152, 219); // Light blue for details
      doc.setFont("helvetica", "italic");
      let details = [];
      if (day.time) details.push(`Time: ${day.time}`);
      if (day.distance) details.push(`Distance: ${day.distance}`);
      doc.text(details.join(" | "), margin + 5, y);
      y += 5;
    }

    // Meals if available
    if (day.meals && day.meals.length > 0) {
      doc.setTextColor(46, 204, 113); // Green for meals
      doc.setFont("helvetica", "italic");
      doc.text(`Meals: ${day.meals.join(", ")}`, margin + 5, y);
      y += 5;
    }

    // Day description
    doc.setTextColor(44, 62, 80); // Dark blue for description
    doc.setFont("helvetica", "normal");
    const cleanDayDescription = cleanText(day.description);
    const descLines = doc.splitTextToSize(cleanDayDescription, contentWidth);
    doc.text(descLines, margin + 5, y);
    y += 5 * descLines.length + 5;

    // Destination information
    if (day.destination && day.destination.name) {
      doc.setFillColor(236, 240, 241); // Light gray background
      doc.rect(margin, y, contentWidth, 8, "F");
      doc.setTextColor(155, 89, 182); // Purple for destination header
      doc.setFont("helvetica", "bold");
      doc.text("Destination:", margin + 5, y + 6);
      y += 10;

      doc.setTextColor(44, 62, 80); // Dark blue for destination details
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${day.destination.name}`, margin + 5, y);
      y += 5;
      if (day.destination.coordinates) {
        doc.setTextColor(52, 152, 219); // Light blue for coordinates
        doc.text(
          `Coordinates: ${day.destination.coordinates.latitude}, ${day.destination.coordinates.longitude}`,
          margin + 5,
          y
        );
        y += 5;
      }
    }

    // Accommodation information
    if (day.accommodation && day.accommodation.name) {
      doc.setFillColor(236, 240, 241); // Light gray background
      doc.rect(margin, y, contentWidth, 8, "F");
      doc.setTextColor(230, 126, 34); // Orange for accommodation header
      doc.setFont("helvetica", "bold");
      doc.text("Overstay at:", margin + 5, y + 6);
      y += 10;

      doc.setTextColor(44, 62, 80); // Dark blue for accommodation details
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${day.accommodation.name}`, margin + 5, y);
      y += 5;
      if (day.accommodation.type) {
        doc.setTextColor(52, 152, 219); // Light blue for type
        doc.text(`Type: ${day.accommodation.type}`, margin + 5, y);
        y += 5;
      }
      if (day.accommodation.description) {
        const cleanAccDescription = cleanText(day.accommodation.description);
        const accDescLines = doc.splitTextToSize(
          cleanAccDescription,
          contentWidth
        );
        doc.setTextColor(44, 62, 80); // Dark blue for description
        doc.text(accDescLines, margin + 5, y);
        y += 5 * accDescLines.length + 5;
      }
    } else {
      doc.setFillColor(236, 240, 241); // Light gray background
      doc.rect(margin, y, contentWidth, 8, "F");
      doc.setTextColor(230, 126, 34); // Orange for accommodation header
      doc.setFont("helvetica", "bold");
      doc.text("Overstay at:", margin + 5, y + 6);
      y += 10;

      doc.setTextColor(44, 62, 80); // Dark blue for text
      doc.setFont("helvetica", "normal");
      doc.text("No Accommodation", margin + 5, y);
      y += 10;
    }

    // Add a separator line between days
    doc.setDrawColor(236, 240, 241); // Light gray for separator
    doc.line(margin, y, margin + contentWidth, y);
    y += 10;
  });

  // Check if we need a new page for inclusions
  if (y > 270 - footerHeight) {
    addFooter();
    doc.addPage();
    y = 20;
  }

  // Inclusions
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Inclusions", margin, y);
  y += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  tour.includes.forEach((item) => {
    const cleanItem = cleanText(item);
    doc.text(`• ${cleanItem}`, margin, y);
    y += 5;
  });

  // Check if we need a new page for exclusions
  if (y > 270 - footerHeight) {
    addFooter();
    doc.addPage();
    y = 20;
  }

  // Exclusions
  y += 5;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Exclusions", margin, y);
  y += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  tour.excludes.forEach((item) => {
    const cleanItem = cleanText(item);
    doc.text(`• ${cleanItem}`, margin, y);
    y += 5;
  });

  // Check if we need a new page for pricing
  if (y > 270 - footerHeight) {
    addFooter();
    doc.addPage();
    y = 20;
  }

  // Pricing table
  y += 10;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Pricing", margin, y);
  y += 8;

  const pricing = tour.pricing;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  // High season pricing
  doc.text("High Season:", margin, y);
  y += 5;
  doc.text(`1 person: $${pricing.high.costs[0].cost}`, margin + 5, y);
  y += 5;
  doc.text(
    `2 persons: $${Math.round(pricing.high.costs[0].cost * 0.93)}`,
    margin + 5,
    y
  );
  y += 5;
  doc.text(
    `4 persons: $${Math.round(pricing.high.costs[0].cost * 0.89)}`,
    margin + 5,
    y
  );
  y += 5;
  doc.text(
    `6+ persons: $${Math.round(pricing.high.costs[0].cost * 0.85)}`,
    margin + 5,
    y
  );
  y += 10;

  // Mid season pricing
  doc.text("Mid Season:", margin, y);
  y += 5;
  doc.text(`1 person: $${pricing.mid.costs[0].cost}`, margin + 5, y);
  y += 5;
  doc.text(
    `2 persons: $${Math.round(pricing.mid.costs[0].cost * 0.93)}`,
    margin + 5,
    y
  );
  y += 5;
  doc.text(
    `4 persons: $${Math.round(pricing.mid.costs[0].cost * 0.89)}`,
    margin + 5,
    y
  );
  y += 5;
  doc.text(
    `6+ persons: $${Math.round(pricing.mid.costs[0].cost * 0.85)}`,
    margin + 5,
    y
  );
  y += 10;

  // Low season pricing
  doc.text("Low Season:", margin, y);
  y += 5;
  doc.text(`1 person: $${pricing.low.costs[0].cost}`, margin + 5, y);
  y += 5;
  doc.text(
    `2 persons: $${Math.round(pricing.low.costs[0].cost * 0.93)}`,
    margin + 5,
    y
  );
  y += 5;
  doc.text(
    `4 persons: $${Math.round(pricing.low.costs[0].cost * 0.89)}`,
    margin + 5,
    y
  );
  y += 5;
  doc.text(
    `6+ persons: $${Math.round(pricing.low.costs[0].cost * 0.85)}`,
    margin + 5,
    y
  );

  // Add footer to the last page
  addFooter();
}
