import { ImageResponse } from "next/server";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // Your SVG or React component for the icon
      <div
        style={{
          fontSize: 24,
          background: "#007849",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: "50%",
        }}
      >
        SN
      </div>
    ),
    { ...size }
  );
}
