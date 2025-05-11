import React from "react";

export default function Included({ tour }) {
  if (!tour) return null;

  const included = tour?.includes || [];
  const excluded = tour?.excludes || [];

  return (
    <div className="row x-gap-130 y-gap-20 pt-20">
      <div className="col-lg-6">
        <div className="y-gap-15">
          {included.length > 0 ? (
            included.map((item, i) => (
              <div key={i} className="d-flex">
                <i className="icon-check flex-center text-10 size-24 rounded-full text-green-2 bg-green-1 mr-15"></i>
                {item}
              </div>
            ))
          ) : (
            <div className="text-14 text-dark-1">No items included</div>
          )}
        </div>
      </div>

      <div className="col-lg-6">
        <div className="y-gap-15">
          {excluded.length > 0 ? (
            excluded.map((item, i) => (
              <div key={i} className="d-flex">
                <i className="icon-cross flex-center text-10 size-24 rounded-full text-red-3 bg-red-4 mr-15"></i>
                {item}
              </div>
            ))
          ) : (
            <div className="text-14 text-dark-1">No items excluded</div>
          )}
        </div>
      </div>
    </div>
  );
}
