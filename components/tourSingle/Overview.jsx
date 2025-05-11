import React from "react";
import Included from "./Included";

export default function Overview({ tour }) {
  return (
    <>
      <h2 className="text-30">Tour Overview</h2>
      <div
        className="mt-20 text-justify ck-content"
        dangerouslySetInnerHTML={{
          __html: tour?.description || "<p>No description available</p>",
        }}
      />
    </>
  );
}
