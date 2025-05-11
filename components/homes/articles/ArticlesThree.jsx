"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { fetchBlogs } from "@/utils/api";

export default function ArticlesThree() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBlogs() {
      try {
        setLoading(true);
        console.log("Fetching blogs...");
        console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

        const response = await fetchBlogs();
        console.log("API response:", response);

        // Check if response has the expected structure
        if (response.success && response.data && response.data.data) {
          setBlogs(response.data.data);
          console.log("Blogs loaded successfully:", response.data.data);
        } else {
          console.error("Unexpected API response format:", response);
          throw new Error("Invalid response format");
        }

        setError(null);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        // More detailed error message based on the error type
        if (error.message === "Failed to fetch" || error.name === "TypeError") {
          setError(
            "Network error: Please check your connection and try again."
          );
        } else if (error.message === "Invalid response format") {
          setError("Data format error: The API returned unexpected data.");
        } else {
          setError(`Failed to load blogs: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    }

    loadBlogs();
  }, []);

  return (
    <section className="layout-pt-xl">
      <div className="container">
        <div className="row justify-between items-end y-gap-10">
          <div className="col-auto">
            <h2
              data-aos="fade-up"
              data-aos-delay=""
              className="text-30 md:text-24 "
            >
              Travel Articles
            </h2>
          </div>

          <div className="col-auto">
            <Link
              href={"/blog"}
              data-aos="fade-right"
              data-aos-delay=""
              className="buttonArrow d-flex items-center  "
            >
              <span>See all</span>
              <i className="icon-arrow-top-right text-16 ml-10"></i>
            </Link>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay=""
          className="row y-gap-30 pt-40 sm:pt-20"
        >
          {loading ? (
            <div className="col-12 text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="col-12 text-center">
              <p className="text-danger">{error}</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="col-12 text-center">
              <p>No articles found.</p>
            </div>
          ) : (
            blogs.slice(0, 3).map((blog, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <Link href={`/blog-single/${blog.slug}`} className="blogCard ">
                  <div className="blogCard__image ratio ratio-41:30">
                    <Image
                      width={616}
                      height={451}
                      src={blog.featured_image}
                      alt={blog.title}
                      className="img-ratio rounded-12"
                    />

                    <div className="blogCard__badge">{blog.category}</div>
                  </div>

                  <div className="blogCard__content mt-30">
                    <div className="blogCard__info text-14">
                      <div className="lh-13">
                        {new Date(blog.created_at).toLocaleDateString()}
                      </div>
                      <div className="blogCard__line"></div>
                      <div className="lh-13">By Admin</div>
                    </div>

                    <h3 className="blogCard__title text-18 fw-500 mt-10">
                      {blog.title}
                    </h3>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
