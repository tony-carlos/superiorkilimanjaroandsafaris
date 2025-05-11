import { blogs, categories, recantBlogs, tags } from "@/data/blogs";
import React from "react";
import Pagination from "../common/Pagination";
import Image from "next/image";
import Link from "next/link";

const BlogList3 = ({ blogs }) => {
  return (
    <section className="layout-pt-md layout-pb-lg">
      <div className="container">
        <div className="row y-gap-30">
          {blogs?.map((blog) => (
            <div className="col-lg-4 col-sm-6" key={blog.id}>
              <Link
                href={`/blog-single/${blog.slug}`}
                className="blogCard -type-1 d-block"
              >
                <div className="blogCard__image">
                  <div className="ratio ratio-4:3 rounded-4 overflow-hidden">
                    <img
                      src={blog.featured_image}
                      alt={blog.title}
                      className="img-ratio"
                    />
                  </div>
                </div>

                <div className="mt-20">
                  <div className="blogCard__category text-primary-1">
                    {blog.category}
                  </div>
                  <h4 className="text-dark-1 text-18 fw-500 mt-5">
                    {blog.title}
                  </h4>
                  <div className="text-dark-1 text-15 lh-14 mt-5">
                    {new Date(blog.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>

                  <div className="text-dark-1 mt-10">
                    {blog.seo_description?.substring(0, 120)}...
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination if needed */}
        {blogs?.length > 12 && (
          <div className="border-top-light mt-30 pt-30">
            <div className="row justify-center">
              <div className="col-auto">
                <button className="button -blue-1 size-40 rounded-full border-light">
                  <i className="icon-chevron-left text-12" />
                </button>
              </div>
              <div className="col-auto">
                <div className="flex -space-x-1">
                  <button className="button size-40 rounded-full active">
                    1
                  </button>
                  <button className="button size-40 rounded-full">2</button>
                  <button className="button size-40 rounded-full">3</button>
                  <button className="button size-40 rounded-full">4</button>
                  <button className="button size-40 rounded-full">5</button>
                </div>
              </div>
              <div className="col-auto">
                <button className="button -blue-1 size-40 rounded-full border-light">
                  <i className="icon-chevron-right text-12" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogList3;
