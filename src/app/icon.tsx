import { ImageResponse } from "next/og";

// Replace with real logo-based icons before launch.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F766E",
          color: "#fff",
          fontSize: 22,
          fontWeight: 700,
          borderRadius: 8,
        }}
      >
        N
      </div>
    ),
    size,
  );
}
