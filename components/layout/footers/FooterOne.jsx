"use client";

import React, { useState } from "react";
import FooterLinks from "../components/FooterLinks";
import Image from "next/image";
import Link from "next/link";
import { CircularProgress, Alert, Typography, IconButton } from "@mui/material";

import { toast } from "react-toastify";

// Common stroke color for icons
const strokeColor = "#31a046";

// Reusable SquareIcon component with rounded corners
const SquareIcon = ({ href, src, alt, size = 24, squareSize = 50 }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={alt}>
    <div
      style={{
        width: squareSize,
        height: squareSize,
        borderRadius: "10px", // Rounded corners
        border: `2px solid ${strokeColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.2s, background-color 0.2s",
        backgroundColor: "#f5f5f5", // Light background for better visibility
      }}
      className="square-icon"
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        style={{ objectFit: "contain" }}
      />
    </div>
  </Link>
);

export default function FooterOne() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Email validation regex
  const validateEmail = (email) => {
    // Simple email regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Handle Subscribe button click
  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Please enter an email address.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      // Send data to Laravel backend
      const response = await fetch(
        "https://superior.tjcarlos.tech/api/subscribe", // Updated endpoint URL
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
          credentials: "omit", // Don't include credentials
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Handle error response from server
        if (data.message.includes("has already been taken")) {
          toast.info("This email is already subscribed.");
        } else {
          throw new Error(data.message || "Failed to subscribe");
        }
      } else {
        // Success
        toast.success(data.message || "Subscribed successfully!");
        setEmail(""); // Clear the input
      }
    } catch (err) {
      console.error("Error subscribing:", err);
      toast.error("Failed to subscribe. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <footer className="footer -type-1">
        <div className="footer__main">
          {/* Background Image */}
          <div className="footer__bg">
            <Image
              width={1800}
              height={627}
              src="/img/footer/1/bg.svg"
              alt="footer background"
              priority
            />
          </div>

          <div className="container">
            {/* ====================== CENTERED SUBSCRIBE SECTION ====================== */}
            <div
              className="footer__subscribeWrapper d-flex flex-column align-items-center justify-content-center"
              style={{ marginTop: "40px", marginBottom: "40px" }}
            >
              <h4 className="text-20 fw-500 mb-10">Newsletter</h4>
              <p className="mb-20 text-center">
                Subscribe to our free newsletter and stay up to date
              </p>
              <div
                className="footer__newsletter d-flex align-items-center justify-content-center"
                style={{
                  borderRadius: "200px",
                  overflow: "hidden",
                  border: "1px solid #ccc",
                  padding: "4px",
                  maxWidth: "500px",
                  width: "100%",
                }}
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    padding: "10px",
                    flexGrow: 1,
                  }}
                  disabled={loading}
                />
                <button
                  onClick={handleSubscribe}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#31a046",
                    color: "#fff",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "140px",
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={20} style={{ color: "#fff" }} />
                  ) : (
                    "Subscribe Now"
                  )}
                </button>
              </div>
            </div>

            {/* ======================= FOOTER CONTENT ====================== */}
            <div className="footer__content">
              <div className="row y-gap-40 justify-between">
                {/* CONTACT COLUMN */}
                <div className="col-lg-3 col-md-6">
                  <h4 className="text-20 fw-500 mb-20 text-dark-1">
                    Contact Us
                  </h4>

                  <div className="contact-items-container">
                    {/* LOCATION */}
                    <div className="contact-item d-flex align-items-center mb-20">
                      <div className="contact-icon">
                        <div className="icon-circle">
                          <Image
                            src="/icons/location-pin-svgrepo-com.svg"
                            alt="Location Icon"
                            width={20}
                            height={20}
                          />
                        </div>
                      </div>
                      <div className="contact-text">
                        <span className="d-block text-15 ml-10">
                        Exeter Devon, London UK, Tanzania Africa
                        </span>
                      </div>
                    </div>

                    {/* EMAIL */}
                    <div className="contact-item d-flex align-items-center mb-20">
                      <div className="contact-icon">
                        <div className="icon-circle">
                          <Image
                            src="/icons/email-svgrepo-com.svg"
                            alt="Email Icon"
                            width={20}
                            height={20}
                          />
                        </div>
                      </div>
                      <div className="contact-text">
                        <a
                          className="d-block text-15 ml-10"
                          href="mailto:info@superiorkilimanjaroandsafaris.com"
                        >
                          info@superiorkilimanjaroandsafaris.com
                        </a>
                      </div>
                    </div>

                    {/* PHONE */}
                    <div className="contact-item d-flex align-items-start mb-20">
                      <div className="contact-icon">
                        <div className="icon-circle">
                          <Image
                            src="/icons/phone-calling-svgrepo-com.svg"
                            alt="Phone Icon"
                            width={20}
                            height={20}
                          />
                        </div>
                      </div>
                      <div className="contact-text ml-10">
                        <div className="phone-container">
                          <div className="phone-item">
                            {/* <span className="office-label">
                              Tanzania Office
                            </span> */}
                            <a
                              className="phone-number"
                              href="tel:+447772162477

"
                            >
                            +44 7772 162 477
                            </a>
                          </div>
                          {/* <div className="phone-item mt-10">
                            <span className="office-label usa">USA Office</span>
                            <a
                              className="phone-number"
                              href="https://api.whatsapp.com/send?phone=12404225402"
                            >
                              +1 (240) 422-5402
                            </a>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ====================== CONNECT WITH US SECTION ====================== */}
                  <div className="footer__connectWithUs mt-20">
                    <h4 className="text-20 fw-500 mb-10">Connect With Us</h4>
                    <div className="social-media-icons d-flex flex-wrap justify-content-start">
                      {/* Instagram */}
                      {/* <div className="social-icon">
                        <SquareIcon
                          href="https://www.instagram.com/kilimanjaroexplore/?igsh=eW9wdHR5cjV2dHlx&utm_source=qr#"
                          src="/icons/instagram-2016-5.svg"
                          alt="Instagram"
                          size={24}
                          squareSize={50}
                        />
                      </div> */}
                      {/* YouTube */}
                      <div className="social-icon">
                        <SquareIcon
                          href="https://www.facebook.com/profile.php?id=61564606604159"
                          src="/icons/facebook.svg"
                          alt="YouTube"
                          size={24}
                          squareSize={50}
                        />
                      </div>
                      {/* TikTok */}
                      <div className="social-icon">
                        <SquareIcon
                          href="https://www.tiktok.com/@superior.kilimanj?lang=en"
                          src="/icons/tiktok-icon-2.svg"
                          alt="fb"
                          size={24}
                          squareSize={50}
                        />
                      </div>
                      {/* Pinterest */}

                      <div className="social-icon">
                        <SquareIcon
                          href="https://api.whatsapp.com/send?phone=447772162477"
                          src="/icons/whatsapp.svg"
                          alt="Pinterest"
                          size={24}
                          squareSize={50}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <FooterLinks />
              </div>
            </div>
          </div>

          {/* ====================== END OF ADDITIONAL SOCIAL MEDIA SECTION ====================== */}
        </div>

        {/* ======================= FOOTER BOTTOM ====================== */}
        <div className="container">
          <div className="footer__bottom py-20">
            <div className="row y-gap-5 justify-center items-center">
              {/* Center the footer text */}
              <div className="col-auto text-center">
                <div>
                  ©Superior Kilimanjaro And Safaris {new Date().getFullYear()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================= TOAST CONTAINER ====================== */}
        {/* The ToastContainer is already included in the root layout */}
      </footer>
      {/* WhatsApp Floating Button */}
      <a
        href="https://api.whatsapp.com/send?phone=447772162477" // Corrected link
        className="floating-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/icons/whatsapp.svg"
          alt="WhatsApp"
          width={40}
          height={40}
        />
      </a>

      <style jsx>{`
        .welcome-message {
          text-align: center;
          margin: 20px 0;
        }

        .floating-whatsapp {
          position: fixed;
          right: 25px;
          bottom: 25px;
          background-color: #31a046;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
          z-index: 976;
        }

        .floating-whatsapp:hover {
          background-color: #31a046;
        }

        .footerSocials__icons a {
          margin: 0 10px;
        }

        /* Contact Section Styles */
        .contact-items-container {
          margin-bottom: 20px;
        }

        .contact-item {
          transition: transform 0.3s ease;
        }

        .contact-item:hover {
          transform: translateX(5px);
        }

        .contact-icon {
          flex-shrink: 0;
        }

        .icon-circle {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          border: 2px solid #31a046;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          transition: all 0.3s ease;
        }

        .contact-item:hover .icon-circle {
          background-color: #31a046;
        }

        .contact-text {
          flex-grow: 1;
          font-size: 15px;
        }

        .phone-container {
          display: flex;
          flex-direction: column;
        }

        .phone-item {
          display: flex;
          flex-direction: column;
        }

        .office-label {
          font-weight: 600;
          font-size: 14px;
          color: #333;
          margin-bottom: 2px;
        }

        .office-label.usa {
          font-style: italic;
        }

        .phone-number {
          font-size: 15px;
          color: #444;
          transition: color 0.3s ease;
        }

        .phone-number:hover {
          color: #31a046;
        }

        .available-links {
          list-style: none;
          padding: 0;
        }

        .available-links li {
          margin-bottom: 10px;
        }

        .available-links a {
          color: #000;
          text-decoration: none;
          transition: color 0.3s;
        }

        .available-links a:hover {
          color: #eb662b;
        }

        .icon-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: black;
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
        }

        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #eb662b;
          color: white;
          text-align: center;
          line-height: 40px;
          transition: background-color 0.3s, color 0.3s;
          margin-right: 10px;
        }

        .icon:hover {
          background-color: #eb662b;
          color: white;
        }

        .icon .icon {
          font-size: 20px;
        }

        .icon-text {
          color: black;
        }

        .footer__content .text-20 {
          color: black;
        }

        /* ====== Connect With Us Section ====== */
        .footer__connectWithUs {
          margin-top: 20px;
        }

        .footer__connectWithUs h4 {
          margin-bottom: 10px;
        }

        .social-media-icons {
          display: flex;
          gap: 15px;
        }

        .social-icon {
          width: 50px;
          height: 50px;
          background-color: #f5f5f5;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s, transform 0.3s;
        }

        .social-icon:hover {
          background-color: #e0e0e0;
          transform: translateY(-5px);
        }

        .social-icon img {
          width: 24px;
          height: 24px;
        }

        /* ====== Additional Social Media Section ====== */
        .footer__additionalSocialMedia {
          padding: 20px 0;
          border-top: 1px solid #ccc;
        }

        .footer__additionalSocialMedia h4 {
          margin-bottom: 20px;
        }

        .additional-social-media-icons {
          display: flex;
          gap: 15px;
        }

        /* ====== End of Additional Social Media Section ====== */

        /* Responsive Design */
        @media (max-width: 768px) {
          .footer__content .row {
            flex-direction: column;
            align-items: center;
          }

          .footer__connectWithUs .social-media-icons,
          .footer__additionalSocialMedia .additional-social-media-icons {
            justify-content: center;
          }

          .contact-item {
            margin-bottom: 15px;
          }
        }

        @media (max-width: 480px) {
          .social-icon {
            width: 40px;
            height: 40px;
          }

          .social-icon img {
            width: 20px;
            height: 20px;
          }

          .footer__subscribeWrapper {
            margin-top: 20px;
            margin-bottom: 20px;
          }

          .footer__newsletter {
            max-width: 300px;
          }

          .footer__connectWithUs,
          .footer__additionalSocialMedia {
            padding: 15px 0;
          }

          .icon-circle {
            width: 40px;
            height: 40px;
          }
        }
        /* ====== End of Responsive Design ====== */
      `}</style>
    </>
  );
}
