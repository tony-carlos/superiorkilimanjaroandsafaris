"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";

// Full JSON of countries with name/code/flag/dial_code
const countryData = [
  { name: "United States", flag: "🇺🇸", code: "US", dialCode: "+1" },
  { name: "United Kingdom", flag: "🇬🇧", code: "GB", dialCode: "+44" },
  { name: "Canada", flag: "🇨🇦", code: "CA", dialCode: "+1" },
  { name: "Australia", flag: "🇦🇺", code: "AU", dialCode: "+61" },
  { name: "Germany", flag: "🇩🇪", code: "DE", dialCode: "+49" },
  { name: "France", flag: "🇫🇷", code: "FR", dialCode: "+33" },
  { name: "Italy", flag: "🇮🇹", code: "IT", dialCode: "+39" },
  { name: "Spain", flag: "🇪🇸", code: "ES", dialCode: "+34" },
  { name: "Japan", flag: "🇯🇵", code: "JP", dialCode: "+81" },
  { name: "China", flag: "🇨🇳", code: "CN", dialCode: "+86" },
  { name: "India", flag: "🇮🇳", code: "IN", dialCode: "+91" },
  { name: "Brazil", flag: "🇧🇷", code: "BR", dialCode: "+55" },
  { name: "South Africa", flag: "🇿🇦", code: "ZA", dialCode: "+27" },
  { name: "Kenya", flag: "🇰🇪", code: "KE", dialCode: "+254" },
  { name: "Tanzania", flag: "🇹🇿", code: "TZ", dialCode: "+255" },
];

export default function PlanTripForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDialCode, setSelectedDialCode] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      adults: 1,
      children: 0,
      countryCode: "",
      phone: "",
    },
  });

  // Watch the country code to update dial code
  const countryCode = watch("countryCode");

  // Update dial code when country changes
  const handleCountryChange = (e) => {
    const code = e.target.value;
    const country = countryData.find((c) => c.code === code);
    if (country) {
      setSelectedDialCode(country.dialCode);
      // Set phone value to start with the dial code if it's not already there
      const currentPhone = watch("phone");
      if (!currentPhone || !currentPhone.startsWith(country.dialCode)) {
        setValue("phone", country.dialCode + " ");
      }
    }
  };

  const tripTypeOptions = [
    "Safari",
    "Beach holiday",
    "Climbing Kilimanjaro",
    "Safari + Beach holiday",
    "Safari + Climbing Kilimanjaro",
    "Safari + Beach holiday + Climbing Kilimanjaro",
    "Beach holiday + Climbing Kilimanjaro",
  ];

  const durationOptions = [
    "1-3 days",
    "4-6 days",
    "6-10 days",
    "2 weeks",
    "3 weeks",
  ];

  const travellingWithOptions = [
    "Honeymoon",
    "Family",
    "Solo",
    "Couple",
    "Group of friends",
    "Other",
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/plan-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(
          "Your trip inquiry has been sent successfully! We will contact you soon.",
          {
            duration: 5000,
            style: {
              background: "#fea709",
              color: "#fff",
            },
          }
        );
        reset();
        setSelectedDialCode("");
      } else {
        const result = await response.json();
        toast.error(
          result.message || "Something went wrong. Please try again.",
          {
            duration: 5000,
          }
        );
      }
    } catch (error) {
      toast.error(
        "An error occurred while sending your inquiry. Please try again later.",
        {
          duration: 5000,
        }
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#fea709",
            color: "#fff",
            borderRadius: "8px",
            padding: "16px",
          },
          success: {
            iconTheme: {
              primary: "#fff",
              secondary: "#fea709",
            },
          },
          error: {
            iconTheme: {
              primary: "#fff",
              secondary: "#dc3545",
            },
          },
        }}
      />

      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <h1 className="display-4 text-center mb-4">Plan Your Trip</h1>
          <p className="text-center mb-5 text-muted">
            Fill out the form below and we'll help you plan your perfect
            Tanzanian adventure
          </p>

          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row g-4">
                  {/* Full Name */}
                  <div className="col-md-6">
                    <label htmlFor="fullName" className="form-label">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      className={`form-control ${
                        errors.fullName ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your full name"
                      {...register("fullName", {
                        required: "Full name is required",
                      })}
                    />
                    {errors.fullName && (
                      <div className="invalid-feedback">
                        {errors.fullName.message}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your email address"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email.message}
                      </div>
                    )}
                  </div>

                  {/* Country */}
                  <div className="col-md-6">
                    <label htmlFor="countryCode" className="form-label">
                      Country <span className="text-danger">*</span>
                    </label>
                    <select
                      id="countryCode"
                      className={`form-select ${
                        errors.countryCode ? "is-invalid" : ""
                      }`}
                      {...register("countryCode", {
                        required: "Country is required",
                        onChange: handleCountryChange,
                      })}
                    >
                      <option value="">Select your country</option>
                      {countryData.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.name}
                        </option>
                      ))}
                    </select>
                    {errors.countryCode && (
                      <div className="invalid-feedback">
                        {errors.countryCode.message}
                      </div>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">
                      Phone <span className="text-danger">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className={`form-control ${
                        errors.phone ? "is-invalid" : ""
                      }`}
                      placeholder={
                        selectedDialCode
                          ? `${selectedDialCode} Phone number`
                          : "Select country first"
                      }
                      {...register("phone", {
                        required: "Phone number is required",
                      })}
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">
                        {errors.phone.message}
                      </div>
                    )}
                  </div>

                  {/* Trip Type */}
                  <div className="col-md-6">
                    <label htmlFor="tripType" className="form-label">
                      Trip Type <span className="text-danger">*</span>
                    </label>
                    <select
                      id="tripType"
                      className={`form-select ${
                        errors.tripType ? "is-invalid" : ""
                      }`}
                      {...register("tripType", {
                        required: "Trip type is required",
                      })}
                    >
                      <option value="">Select trip type</option>
                      {tripTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.tripType && (
                      <div className="invalid-feedback">
                        {errors.tripType.message}
                      </div>
                    )}
                  </div>

                  {/* Duration */}
                  <div className="col-md-6">
                    <label htmlFor="duration" className="form-label">
                      Duration <span className="text-danger">*</span>
                    </label>
                    <select
                      id="duration"
                      className={`form-select ${
                        errors.duration ? "is-invalid" : ""
                      }`}
                      {...register("duration", {
                        required: "Duration is required",
                      })}
                    >
                      <option value="">Select duration</option>
                      {durationOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.duration && (
                      <div className="invalid-feedback">
                        {errors.duration.message}
                      </div>
                    )}
                  </div>

                  {/* Budget */}
                  <div className="col-md-6">
                    <label htmlFor="budget" className="form-label">
                      Your Budget <span className="text-danger">*</span>
                    </label>
                    <input
                      id="budget"
                      type="text"
                      className={`form-control ${
                        errors.budget ? "is-invalid" : ""
                      }`}
                      placeholder="e.g., $1000-$2000"
                      {...register("budget", {
                        required: "Budget is required",
                      })}
                    />
                    {errors.budget && (
                      <div className="invalid-feedback">
                        {errors.budget.message}
                      </div>
                    )}
                  </div>

                  {/* Travel Date */}
                  <div className="col-md-6">
                    <label htmlFor="travelDate" className="form-label">
                      Travel Date <span className="text-danger">*</span>
                    </label>
                    <input
                      id="travelDate"
                      type="date"
                      className={`form-control ${
                        errors.travelDate ? "is-invalid" : ""
                      }`}
                      {...register("travelDate", {
                        required: "Travel date is required",
                      })}
                    />
                    {errors.travelDate && (
                      <div className="invalid-feedback">
                        {errors.travelDate.message}
                      </div>
                    )}
                  </div>

                  {/* Adults */}
                  <div className="col-md-6">
                    <label htmlFor="adults" className="form-label">
                      Adults
                    </label>
                    <input
                      id="adults"
                      type="number"
                      min="1"
                      className="form-control"
                      {...register("adults", { min: 1 })}
                    />
                  </div>

                  {/* Children */}
                  <div className="col-md-6">
                    <label htmlFor="children" className="form-label">
                      Children
                    </label>
                    <input
                      id="children"
                      type="number"
                      min="0"
                      className="form-control"
                      {...register("children")}
                    />
                  </div>

                  {/* Travelling With */}
                  <div className="col-md-12">
                    <label htmlFor="travellingWith" className="form-label">
                      Who are you travelling with?{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <select
                      id="travellingWith"
                      className={`form-select ${
                        errors.travellingWith ? "is-invalid" : ""
                      }`}
                      {...register("travellingWith", {
                        required: "This field is required",
                      })}
                    >
                      <option value="">Select option</option>
                      {travellingWithOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.travellingWith && (
                      <div className="invalid-feedback">
                        {errors.travellingWith.message}
                      </div>
                    )}
                  </div>

                  {/* Safari Details */}
                  <div className="col-md-12">
                    <label htmlFor="safariDetails" className="form-label">
                      Safari Details
                    </label>
                    <textarea
                      id="safariDetails"
                      rows="3"
                      className="form-control"
                      {...register("safariDetails")}
                    ></textarea>
                  </div>

                  {/* Message */}
                  <div className="col-md-12">
                    <label htmlFor="message" className="form-label">
                      Your Message <span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows="5"
                      className={`form-control ${
                        errors.message ? "is-invalid" : ""
                      }`}
                      {...register("message", {
                        required: "Message is required",
                      })}
                    ></textarea>
                    {errors.message && (
                      <div className="invalid-feedback">
                        {errors.message.message}
                      </div>
                    )}
                  </div>

                  {/* Permission Checkbox */}
                  <div className="col-md-12 mt-2">
                    <div
                      className="form-check"
                      style={{ padding: "10px 0 10px 30px" }}
                    >
                      <input
                        id="permission"
                        type="checkbox"
                        className="form-check-input"
                        style={{
                          width: "22px",
                          height: "22px",
                          marginLeft: "-30px",
                          backgroundColor: "#fff",
                          borderColor: "#000000",
                          borderWidth: "2px",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                        {...register("permission")}
                      />
                      <label
                        htmlFor="permission"
                        className="form-check-label"
                        style={{ paddingLeft: "8px", cursor: "pointer" }}
                      >
                        I hereby give permission to receive a travel proposal
                        for a safari and/or beach vacation, as well as any other
                        relevant news regarding my holiday.
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn w-100"
                      style={{
                        backgroundColor: "#fea709",
                        color: "white",
                        padding: "12px 20px",
                        borderRadius: "8px",
                        transition: "all 0.3s ease",
                        border: "none",
                      }}
                      onMouseOver={(e) => {
                        if (!isSubmitting) {
                          e.target.style.backgroundColor = "#2f3729";
                          e.target.style.transform = "translateY(-2px)";
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!isSubmitting) {
                          e.target.style.backgroundColor = "#fea709";
                          e.target.style.transform = "translateY(0)";
                        }
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Sending...
                        </>
                      ) : (
                        "Submit Inquiry"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .form-control,
        .form-select {
          border-radius: 8px;
          padding: 12px;
          border: 1px solid #dee2e6;
          transition: all 0.3s ease;
        }

        .form-control:focus,
        .form-select:focus {
          border-color: #fea709;
          box-shadow: 0 0 0 0.25rem rgba(65, 75, 56, 0.15);
        }

        .form-label {
          font-weight: 500;
          margin-bottom: 8px;
        }

        .form-check-input:checked {
          background-color: #fea709;
          border-color: #fea709;
        }

        .form-check-input:focus {
          border-color: #fea709;
          box-shadow: 0 0 0 0.25rem rgba(65, 75, 56, 0.25);
        }

        .form-check-input[type="checkbox"] {
          border-radius: 6px;
          transition: all 0.2s ease-in-out;
        }

        .form-check-input[type="checkbox"]:hover {
          border-color: #fea709;
          box-shadow: 0 0 0 2px rgba(65, 75, 56, 0.1);
        }

        .form-check-input.is-invalid {
          border-color: #dc3545 !important;
        }

        #permission {
          border-radius: 6px !important;
        }

        .invalid-feedback {
          font-size: 0.875rem;
          margin-top: 4px;
        }

        @media (max-width: 768px) {
          .card-body {
            padding: 1.5rem !important;
          }

          .form-control,
          .form-select {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
}
