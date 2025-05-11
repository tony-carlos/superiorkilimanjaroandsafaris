"use client";
import { useState } from "react";

export default function ShareModal({ isOpen, onClose, tourTitle, tourUrl }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(tourUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      tourTitle + " " + tourUrl
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleEmailShare = () => {
    const emailUrl = `mailto:?subject=${encodeURIComponent(
      tourTitle
    )}&body=${encodeURIComponent("Check out this tour: " + tourUrl)}`;
    window.open(emailUrl, "_blank");
  };

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
        style={{ maxWidth: "400px", width: "90%" }}
      >
        <div className="card-header bg-white d-flex justify-content-between align-items-center border-0 py-3">
          <h4 className="m-0" style={{ color: "#fea709" }}>
            Share Tour
          </h4>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>
        <div className="card-body p-4">
          <div className="d-flex flex-column gap-3">
            <button
              onClick={handleCopyLink}
              className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2"
            >
              <i className="icon-copy text-16"></i>
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <button
              onClick={handleWhatsAppShare}
              className="btn btn-success d-flex align-items-center justify-content-center gap-2"
            >
              <i className="icon-whatsapp text-16"></i>
              Share on WhatsApp
            </button>
            <button
              onClick={handleEmailShare}
              className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
            >
              <i className="icon-email text-16"></i>
              Share via Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
