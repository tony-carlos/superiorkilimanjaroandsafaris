"use client";
import { useState, useEffect } from "react";

export default function ContactForm() {
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  // State for form submission status
  const [status, setStatus] = useState({
    submitted: false,
    error: false,
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitted: false, error: false, message: "Sending..." });

    try {
      const response = await fetch("https://superior.tjcarlos.tech/api/contact-public", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "omit", // Don't include credentials
      });

      // Parse response
      let data;
      try {
        data = await response.json();
      } catch (error) {
        data = { message: "Invalid response from server" };
      }

      if (response.ok) {
        setStatus({
          submitted: true,
          error: false,
          message: "Message sent successfully!",
        });
        // Reset form
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        setStatus({
          submitted: false,
          error: true,
          message: data.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus({
        submitted: false,
        error: true,
        message:
          "Network error. Please check your connection and ensure the backend server is running.",
      });
    }
  };

  return (
    <section className="layout-pt-lg layout-pb-lg">
      <div className="container">
        <div className="row justify-center">
          <div className="col-lg-8">
            <h2 className="text-30 fw-700 text-center mb-30">
              Leave us your info
            </h2>

            <div className="contactForm">
              {status.message && (
                <div
                  className={`alert ${
                    status.error ? "alert-danger" : "alert-success"
                  } mb-30`}
                  style={{
                    padding: "15px",
                    marginBottom: "20px",
                    borderRadius: "4px",
                    backgroundColor: status.error ? "#f8d7da" : "#d4edda",
                    color: status.error ? "#721c24" : "#155724",
                  }}
                >
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="row y-gap-30">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows="6"
                    required
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="button -md -dark-1 bg-accent-1 text-white col-12"
                    disabled={status.submitted}
                  >
                    {status.submitted ? "Message Sent" : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
