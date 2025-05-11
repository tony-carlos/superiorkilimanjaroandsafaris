import React from "react";
import Reviews from "./Reviews";
import CommentBox from "./CommentBox";
import Image from "next/image";

const BlogSingle = ({ blog }) => {
  return (
    <section className="pt-40 pb-40 lg:pt-60 lg:pb-60">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="blogSingle">
            {/* Blog Content */}
            <div className="mb-30">
              {/* Category */}
              <div className="text-primary-1 text-sm font-medium uppercase tracking-wider mb-10">
                {blog.category}
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-dark-1 mb-20">
                {blog.title}
              </h1>

              {/* Date */}
              <div className="text-sm text-gray-500 mb-20">
                {new Date(blog.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              {/* Content */}
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            {/* Featured Image - Moved to after content */}
            <div className="mt-30">
              <img
                src={blog.featured_image}
                alt={blog.title}
                className="rounded-2xl w-full shadow-lg"
              />
            </div>

            {/* Keywords/Tags */}
            {blog.seo_keywords && (
              <div className="mt-30">
                <div className="flex flex-wrap gap-2">
                  {blog.seo_keywords.split(",").map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {keyword.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSingle;
