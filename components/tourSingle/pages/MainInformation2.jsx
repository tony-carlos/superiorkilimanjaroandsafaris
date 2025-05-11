import Stars from "@/components/common/Stars";
import React, { useState, useEffect } from "react";

export default function MainInformation2({ tour }) {
  const showBestseller = tour?.categories?.bestseller;
  const showCancellation = tour?.categories?.free_cancellation;
  const [copied, setCopied] = useState(false);

  // Reset the copied state after 2 seconds
  useEffect(() => {
    let timeout;
    if (copied) {
      timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [copied]);

  // Function to copy current URL to clipboard
  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setCopied(true);
      })
      .catch((err) => {
        console.error("Could not copy URL: ", err);
      });
  };

  // Function to share via WhatsApp
  const handleWhatsAppShare = () => {
    const currentUrl = window.location.href;
    const tourTitle = tour?.title || "Check out this amazing tour!";
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      `${tourTitle} ${currentUrl}`
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="">
      <div className="row x-gap-10 y-gap-10 items-center">
        {showBestseller && (
          <div className="col-auto">
            <button className="button -accent-1 text-14 py-5 px-15 bg-accent-1-05 text-accent-1 rounded-200">
              Bestseller
            </button>
          </div>
        )}
        {showCancellation && (
          <div className="col-auto">
            <button className="button -accent-1 text-14 py-5 px-15 bg-light-1 rounded-200">
              Free cancellation
            </button>
          </div>
        )}
      </div>

      <h2 className="text-40 sm:text-30 lh-14 mt-20">
        {tour?.title || "Loading..."}
      </h2>

      <div className="row y-gap-20 justify-between pt-20">
        <div className="col-auto">
          <div className="row x-gap-20 y-gap-20 items-center">
            <div className="col-auto">
              <div className="d-flex items-center">
                <i className="icon-pin text-16 mr-5"></i>
                {tour?.country || "Loading..."}
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex items-center">
                <i className="icon-clock text-16 mr-5"></i>
                {tour?.duration?.value} {tour?.duration?.unit}
              </div>
            </div>
          </div>
        </div>

        <div className="col-auto">
          <div className="col-auto">
            <div className="d-flex x-gap-30 y-gap-10">
              <button
                className="d-flex items-center"
                onClick={handleShare}
                title="Copy link to clipboard"
              >
                <i className="icon-share flex-center text-16 mr-10"></i>
                {copied ? "Copied!" : "Share"}
              </button>

              <button
                className="d-flex items-center"
                onClick={handleWhatsAppShare}
                title="Share via WhatsApp"
              >
                <i className="icon-whatsapp flex-center text-16 mr-10"></i>
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
