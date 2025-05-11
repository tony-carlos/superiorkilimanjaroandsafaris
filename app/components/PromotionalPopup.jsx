"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function PromotionalPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if this popup has been shown before
    const hasSeenPopup = localStorage.getItem("hasSeenPromoPopup");

    if (!hasSeenPopup) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    // Set a flag in localStorage so we don't show the popup again in this session
    localStorage.setItem("hasSeenPromoPopup", "true");
  };

  if (!isVisible) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 9999,
      }}
    >
      <div
        className="card border-0"
        style={{
          maxWidth: "600px",
          maxHeight: "90vh",
          overflow: "auto",
          backgroundImage:
            "url('https://pub-52b9ad9500f64d9bbe7b895b30666182.r2.dev/bgmain.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="card-header bg-white bg-opacity-90 d-flex justify-content-between align-items-center border-0 py-3">
          <h4 className="m-0" style={{ color: "#fea709" }}>
            Special Offer!
          </h4>
          <button
            type="button"
            className="btn-close"
            onClick={closePopup}
            aria-label="Close"
          ></button>
        </div>
        <div className="card-body p-4 bg-white bg-opacity-90">
          <h5 className="card-title mb-3" style={{ color: "#fea709" }}>
            Kilimanjaro Explore
          </h5>
          <p className="card-text">
            We're offering everybody who pays for a trek or safari in full at
            least a month before departure - one <strong>FREE tour day</strong>{" "}
            of the fabulous city of Arusha (next to Kilimanjaro National Park)
            at the end of your adventure.
          </p>
          <p className="card-text">
            This day will take approx 3-5 hours and you will have a choice of
            EITHER going to the famous Masai Market where you can see and buy
            all kinds of local crafts, hand-made and carved items, clothing,
            souvenirs etc.. OR take a trip to the nearby coffee farm where you
            can experience local coffee production and buy visitor souvenirs.
          </p>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <button onClick={closePopup} className="btn btn-outline-secondary">
              Maybe Later
            </button>
            <Link
              href="/tanzania-travel"
              className="btn"
              style={{ backgroundColor: "#fea709", color: "white" }}
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
