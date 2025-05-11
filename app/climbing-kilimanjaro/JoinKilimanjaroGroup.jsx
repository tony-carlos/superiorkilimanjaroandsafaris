"use client";

import React, { useState } from "react";
import Link from "next/link";

const JoinKilimanjaroGroup = ({ onClose, routeDetails }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    contactPreference: "email",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Combine form data with route details
      const submissionData = {
        ...formData,
        routeName: routeDetails?.name || "Kilimanjaro Climbing",
        packageType: routeDetails?.packageType || "Standard",
        dateRange: routeDetails?.dateRange || "Upcoming trip",
        daysCount: routeDetails?.daysCount || "7-9",
      };

      // Send data to API endpoint
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Success
      setSubmitSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError(
        error.message || "Failed to submit form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="popup-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="popup-content bg-white p-4 rounded"
        style={{
          width: "90%",
          maxWidth: "500px",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* Close button (X) */}
        <button
          onClick={onClose}
          className="btn-close"
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
          }}
          aria-label="Close"
        ></button>

        <div className="text-center mb-4">
          <h2 className="fw-bold mb-2">Planning a Trip to Tanzania?</h2>
          <p className="text-muted">Our team is always here to help</p>

          {routeDetails && (
            <div className="my-3 p-3 bg-light rounded">
              <p className="mb-1">
                <strong>{routeDetails.name}</strong>
              </p>
              <p className="mb-1">{routeDetails.packageType} Package</p>
              <p className="mb-1">{routeDetails.dateRange}</p>
              <p className="mb-0">{routeDetails.daysCount} Days</p>
            </div>
          )}
        </div>

        {submitSuccess ? (
          <div className="alert alert-success text-center">
            <i className="fas fa-check-circle me-2"></i>
            Thank you for your interest! We will contact you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {submitError && (
              <div className="alert alert-danger mb-3">{submitError}</div>
            )}

            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-Mail"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone (International format)"
                required
              />
            </div>

            <div className="mb-3">
              <textarea
                className="form-control"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Please let us know if you have any questions"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="d-block text-center mb-3 fw-medium">
                I prefer:
              </label>
              <div className="d-flex justify-content-center gap-3">
                <button
                  type="button"
                  className="btn"
                  style={{
                    backgroundColor:
                      formData.contactPreference === "whatsapp"
                        ? "#31a046"
                        : "transparent",
                    color:
                      formData.contactPreference === "whatsapp"
                        ? "white"
                        : "#31a046",
                    borderColor: "#31a046",
                    borderWidth: "1px",
                    borderStyle: "solid",
                  }}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      contactPreference: "whatsapp",
                    }))
                  }
                >
                  WhatsApp
                </button>

                <button
                  type="button"
                  className="btn"
                  style={{
                    backgroundColor:
                      formData.contactPreference === "email"
                        ? "#31a046"
                        : "transparent",
                    color:
                      formData.contactPreference === "email"
                        ? "white"
                        : "#31a046",
                    borderColor: "#31a046",
                    borderWidth: "1px",
                    borderStyle: "solid",
                  }}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      contactPreference: "email",
                    }))
                  }
                >
                  E-mail
                </button>
              </div>
            </div>

            <div className="text-center mb-3">
              <p className="small text-muted">
                By clicking 'Send', you agree to our{" "}
                <Link href="/privacy" className="text-accent-1">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn text-white py-2"
                style={{ backgroundColor: "#31a046" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    SENDING...
                  </>
                ) : (
                  <>
                    <i className="bi bi-envelope me-2"></i> SEND
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default JoinKilimanjaroGroup;
