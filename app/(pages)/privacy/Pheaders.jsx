import React from "react";

export default function Pheaders() {
  return (
    <section className="pageHeader -type-3">
      <div className="container">
        <div className="row justify-between">
          <div className="col-auto">
            <div className="breadcrumbs">
              <span className="breadcrumbs__item">
                <a href="#">Home</a>
              </span>
              <span>{">"}</span>
              <span className="breadcrumbs__item">
                <a href="#">Privacy Policy </a>
              </span>
              <span>{">"}</span>
              <span className="breadcrumbs__item">
                <a href="#">Superior Kilimanjaro And Safaris </a>
              </span>
            </div>
          </div>

          <div className="col-auto">
            <div className="pageHeader__subtitle"></div>
          </div>
        </div>

        <div className="row pt-30">
          <div className="col-auto">
            <h1 className="pageHeader__title"></h1>
          </div>
        </div>
      </div>
    </section>
  );
}
