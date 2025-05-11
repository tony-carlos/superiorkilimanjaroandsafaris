import Image from "next/image";
import React from "react";

export default function HeroBlogs({ blog }) {
  return (
    <section className="hero -type-1 -min-2">
      <div className="hero__bg">
        <Image
          width={1800}
          height={300}
          src={"/img/hero/bg.png"}
          alt={"hero image"}
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
              <h1 className="text-black text-4xl font-bold">
                {blog?.title ? blog?.title : "Your guide to Tanzania"}
              </h1>

              <p className="text-black text-xl">
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
