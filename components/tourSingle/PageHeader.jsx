import React from "react";

export default function PageHeader({ tour }) {
  return (
    <div className="container">
      <div className="row justify-between py-30 mt-80">
        <div className="col-auto">
          <div className="text-14">
            Home {">"} Tours {">"} {tour?.country || "Loading..."}
          </div>
        </div>

        <div className="col-auto">
          <div className="text-14">{tour?.title || "Loading..."}</div>
        </div>
      </div>
    </div>
  );
}
