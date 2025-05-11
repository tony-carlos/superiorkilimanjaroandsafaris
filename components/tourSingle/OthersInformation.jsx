import React from "react";

export default function OthersInformation({ tour }) {
  return (
    <>
      <div className="col-lg-3 col-6">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-clock"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">Duration</div>
            <div className="text-14 text-light-2 lh-16">
              {tour?.duration?.value} {tour?.duration?.unit}
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-6">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-teamwork"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">Group Type</div>
            <div className="text-14 text-light-2 lh-16">
              {tour?.group_type}
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-6">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-birthday-cake"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">Main Focus</div>
            <div className="text-14 text-light-2 lh-16">
              {tour?.main_focus}
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-6">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-translate"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">Languages</div>
            <div className="text-14 text-light-2 lh-16">All International</div>
          </div>
        </div>
      </div>
    </>
  );
}
