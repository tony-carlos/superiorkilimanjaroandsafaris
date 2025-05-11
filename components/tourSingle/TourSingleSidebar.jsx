"use client";

import React, { useEffect, useState } from "react";
import Calender from "../common/dropdownSearch/Calender";
import Image from "next/image";
import { times } from "@/data/tourSingleContent";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const getCurrentSeason = () => {
  const now = new Date();
  const month = now.getMonth() + 1; // JavaScript months are 0-11
  const day = now.getDate();

  // High Season: July, August, Dec 20th - Jan 10th
  if (
    month === 7 ||
    month === 8 ||
    (month === 12 && day >= 20) ||
    (month === 1 && day <= 10)
  ) {
    return "high";
  }
  // Low Season: April 1st - May 19th
  else if ((month === 4 && day >= 1) || (month === 5 && day <= 19)) {
    return "low";
  }
  // Mid Season: Rest of the year
  else {
    return "mid";
  }
};

const formatPrice = (price) => {
  if (!price) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export default function TourSingleSidebar({ tour }) {
  const currentSeason = getCurrentSeason();
  const basePrice = tour?.pricing?.[currentSeason]?.costs?.[0]?.cost || 0;

  const [adultNumber, setAdultNumber] = useState(1);
  const [youthNumber, setYouthNumber] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingMode, setBookingMode] = useState("system"); // "system" or "whatsapp"

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calculateTotal = () => {
    const adultTotal = basePrice * adultNumber;
    const youthTotal = basePrice * 0.5 * youthNumber; // 50% off for youths
    return adultTotal + youthTotal;
  };

  const totalPrice = calculateTotal();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Valid email is required");
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (!startDate) {
      setError("Start date is required");
      return false;
    }
    setError("");
    return true;
  };

  const handleWhatsAppBooking = () => {
    if (!validateForm()) return;

    const tourTitle = tour?.title || "Tour";

    const formattedStartDate = startDate
      ? startDate.toLocaleDateString()
      : "Not specified";
    const formattedEndDate = endDate
      ? endDate.toLocaleDateString()
      : "Not specified";

    // Create WhatsApp message
    const message = encodeURIComponent(
      `*New Booking Request*\n\n` +
        `*Tour Details:*\n` +
        `- Tour: ${tourTitle}\n` +
        `- Start Date: ${formattedStartDate}\n` +
        `- End Date: ${formattedEndDate}\n` +
        `- Adults: ${adultNumber}\n` +
        `- Youths: ${youthNumber}\n` +
        `- Total Price: ${formatPrice(totalPrice)}\n\n` +
        `*Customer Information:*\n` +
        `- Name: ${formData.fullName}\n` +
        `- Email: ${formData.email}\n` +
        `- Phone: ${formData.phoneNumber}\n\n` +
        `*Message:*\n${formData.message || "No message provided"}`
    );

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/447772162477?text=${message}`, "_blank");

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      message: "",
    });
    setStartDate(null);
    setEndDate(null);
    setAdultNumber(1);
    setYouthNumber(0);
    setIsModalOpen(false);
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (bookingMode === "whatsapp") {
      handleWhatsAppBooking();
      return;
    }

    if (!validateForm()) return;

    setLoading(true);

    try {
      const bookingData = {
        tourId: tour?.id,
        tourTitle: tour?.title || "Tour Booking",
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        adults: adultNumber,
        youths: youthNumber,
        message: formData.message,
        startDate: startDate,
        endDate: endDate,
        totalPrice: parseFloat(totalPrice.toFixed(2)),
      };

      // Try primary email API first
      try {
        const emailResponse = await fetch("/api/send-booking-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        });

        if (!emailResponse.ok) {
          const errorData = await emailResponse.json();
          throw new Error(errorData.error || "Failed to send emails");
        }

        toast.success(
          "Booking successful! Please check your email for confirmation."
        );
      } catch (emailError) {
        console.error("Email sending failed, trying fallback:", emailError);

        // If email API fails, try the fallback
        const fallbackResponse = await fetch("/api/booking-fallback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        });

        if (!fallbackResponse.ok) {
          throw new Error("Failed to process booking");
        }

        toast.success("Booking received! Our team will contact you shortly.");
      }

      // Reset form regardless of which method succeeded
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
      setStartDate(null);
      setEndDate(null);
      setAdultNumber(1);
      setYouthNumber(0);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error processing booking: ", err);
      setError(
        "An error occurred while processing your booking. Please try again."
      );
      toast.error("Failed to process your booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tourSingleSidebar">
      <div className="d-flex items-center justify-between">
        <div className="text-14">Current Season</div>
        <div className="text-14 capitalize">{currentSeason} Season</div>
      </div>

      <div className="d-flex items-center mt-10">
        <div>From</div>
        <div className="text-20 fw-500 ml-10">{formatPrice(basePrice)}</div>
      </div>

      <div className="searchForm -type-1 -sidebar mt-20">
        <div className="searchForm__form">
          <div className="searchFormItem">
            <div className="searchFormItem__button">
              <div className="searchFormItem__icon size-50 rounded-12 bg-light-1 flex-center">
                <i className="text-20 icon-calendar"></i>
              </div>
              <div className="searchFormItem__content">
                <h5>Start Date</h5>
                <div>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    className="form-control"
                    placeholderText="Select start date"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="searchFormItem mt-20">
            <div className="searchFormItem__button">
              <div className="searchFormItem__icon size-50 rounded-12 bg-light-1 flex-center">
                <i className="text-20 icon-calendar"></i>
              </div>
              <div className="searchFormItem__content">
                <h5>End Date</h5>
                <div>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate || new Date()}
                    className="form-control"
                    placeholderText="Select end date"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h5 className="text-18 fw-500 mb-20 mt-20">Booking Information</h5>

      <div>
        <div className="d-flex items-center justify-between">
          <div className="text-14">
            Adult (18+ years){" "}
            <span className="fw-500">{formatPrice(basePrice)}</span>
          </div>

          <div className="d-flex items-center js-counter">
            <button
              onClick={() => setAdultNumber((pre) => (pre > 1 ? pre - 1 : pre))}
              className="button size-30 border-1 rounded-full js-down"
            >
              <i className="icon-minus text-10"></i>
            </button>

            <div className="flex-center ml-10 mr-10">
              <div className="text-14 size-20 js-count">{adultNumber}</div>
            </div>

            <button
              onClick={() => setAdultNumber((pre) => pre + 1)}
              className="button size-30 border-1 rounded-full js-up"
            >
              <i className="icon-plus text-10"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-15">
        <div className="d-flex items-center justify-between">
          <div className="text-14">
            Youth (0-17 years){" "}
            <span className="fw-500">{formatPrice(basePrice * 0.5)}</span>
          </div>

          <div className="d-flex items-center js-counter">
            <button
              onClick={() => setYouthNumber((pre) => (pre > 0 ? pre - 1 : pre))}
              className="button size-30 border-1 rounded-full js-down"
            >
              <i className="icon-minus text-10"></i>
            </button>

            <div className="flex-center ml-10 mr-10">
              <div className="text-14 size-20 js-count">{youthNumber}</div>
            </div>

            <button
              onClick={() => setYouthNumber((pre) => pre + 1)}
              className="button size-30 border-1 rounded-full js-up"
            >
              <i className="icon-plus text-10"></i>
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleBooking} className="mt-20">
        {error && (
          <div className="text-red-1 text-14 mb-10 bg-red-4 px-10 py-5 rounded-4">
            {error}
          </div>
        )}

        <div className="form-input">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            placeholder="Full Name *"
          />
        </div>

        <div className="form-input mt-15">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Email Address *"
          />
        </div>

        <div className="form-input mt-15">
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
            placeholder="Phone Number *"
          />
        </div>

        <div className="form-input mt-15">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Special Requests or Comments"
            rows="3"
          ></textarea>
        </div>

        <div className="d-flex items-center mt-20">
          <div
            className={`form-radio mr-20 cursor-pointer ${
              bookingMode === "system" ? "checked" : ""
            }`}
            onClick={() => setBookingMode("system")}
          >
            <div className="radio">
              <input
                type="radio"
                name="bookingMode"
                checked={bookingMode === "system"}
                onChange={() => setBookingMode("system")}
              />
              <div className="radio__mark">
                <div className="radio__icon"></div>
              </div>
            </div>
            <div className="text-14 lh-1 ml-10">Email Booking</div>
          </div>

          <div
            className={`form-radio cursor-pointer ${
              bookingMode === "whatsapp" ? "checked" : ""
            }`}
            onClick={() => setBookingMode("whatsapp")}
          >
            <div className="radio">
              <input
                type="radio"
                name="bookingMode"
                checked={bookingMode === "whatsapp"}
                onChange={() => setBookingMode("whatsapp")}
              />
              <div className="radio__mark">
                <div className="radio__icon"></div>
              </div>
            </div>
            <div className="text-14 lh-1 ml-10">WhatsApp Booking</div>
          </div>
        </div>

        <div className="mt-20 mb-20">
          <div className="d-flex justify-between items-center">
            <div className="text-16">Total Price:</div>
            <div className="text-22 fw-500">{formatPrice(totalPrice)}</div>
          </div>
        </div>

        <div className="d-flex items-center justify-center">
          <button
            type="submit"
            className="button -md -dark-1 bg-accent-1 text-white w-100"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : bookingMode === "whatsapp"
              ? "Book via WhatsApp"
              : "Book Now"}
            <i className="icon-arrow-right text-16 ml-10"></i>
          </button>
        </div>
      </form>
    </div>
  );
}
