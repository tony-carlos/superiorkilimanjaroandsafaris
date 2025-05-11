// src/components/WhatWeOffer.js

import React from "react";

export default function WhatWeOffer() {
  return (
    <section className="layout-pt-xl ">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto ">
            <h2 className="text-30 md:text-24">What We Offer</h2>
          </div>
        </div>

        <div className="row md:x-gap-20 pt-40 sm:pt-20">
          <div className="col-lg-4 col-sm-6">
            <div className="featureIcon -type-1 pr-40 md:pr-0">
              <div className="featureIcon__icon">
                <img
                  src="/icons/charity-match-svgrepo-com.svg"
                  alt="Charity Donations"
                  width={60}
                  height={60}
                />
              </div>

              <h3 className="featureIcon__title text-18 fw-500 mt-30">
                We Are The Only Kilimanjaro Tour Company To Give Directly To
                Charities!
              </h3>
              <p className="featureIcon__text mt-10">
                At our organisation, we are committed to making a difference by
                donating 5% of our profits to children's charities in Tanzania.
                We are empowering local communities and ensuring that as much
                support as possible stays within the area. Together, we can help
                create a brighter future for the children who need it the most.
                Join us in making a positive impact!
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-sm-6">
            <div className="featureIcon -type-1 pr-40 md:pr-0">
              <div className="featureIcon__icon">
                <img
                  src="/icons/video-call-svgrepo-com.svg"
                  alt="Video Calls"
                  width={60}
                  height={60}
                />
              </div>

              <h3 className="featureIcon__title text-18 fw-500 mt-30">
                Video Calls Available With Expert Guides Before Booking
              </h3>
              <p className="featureIcon__text mt-10">
                To ensure a seamless experience, we encourage you to arrange
                video calls with guides before making your booking. This allows
                you to ask questions, get to know your guide and feel more
                confident in your choice. We believe that open communication
                enhances your experience and helps you make the best decision.
                Don't hesitate to reach out!
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-sm-6">
            <div className="featureIcon -type-1 pr-40 md:pr-0">
              <div className="featureIcon__icon">
                <img
                  src="/icons/payment-method-mobile-bank-svgrepo-com.svg"
                  alt="Payment Options"
                  width={60}
                  height={60}
                />
              </div>

              <h3 className="featureIcon__title text-18 fw-500 mt-30">
                Payment Options, Spread The Cost Over Interest Free Payments!
              </h3>
              <p className="featureIcon__text mt-10">
                Our team is excited to offer personalised payment plans designed
                to fit your budget and needs. We believe in flexibility,
                ensuring our services are accessible and convenient for everyone
                so we offer payment by four instalments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
