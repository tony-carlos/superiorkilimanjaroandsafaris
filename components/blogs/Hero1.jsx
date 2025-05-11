import Image from "next/image";
import React from "react";

export default function Hero1({ blog }) {
  return (
    <section className="hero -type-1 -min-2">
      <div className="hero__bg">
        <Image
          width={1800}
          height={300}
          src={blog?.featured_image || "/img/hero/1.png"}
          alt={blog?.title || "hero image"}
          className="object-cover"
        />
        <Image
          style={{ height: "auto" }}
          width="1800"
          height="40"
          src="/img/hero/1/shape.svg"
          alt="image"
        />
      </div>

      <div className="container">
        <div className="row justify-center">
          <div className="col-xl-12">
            <div className="hero__content">
              <h1 className="hero__title">
                {blog?.title ? blog?.title : "Your guide to Tanzania"}
              </h1>

              <p className="hero__text">
                {blog?.seo_description
                  ? blog?.seo_description
                  : `Find inspiration, guides and stories for wherever you're going
                Select a destination`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
