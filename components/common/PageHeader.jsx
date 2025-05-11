"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function PageHeader() {
  return (
    <section
      className="pageHeader -type-3 relative h-[60vh] min-h-[500px] w-full"
      style={{
        backgroundImage:
          'url("https://pub-a136cf78f7204d5db42f62c03c2e4bab.r2.dev/ghjk.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* white Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="container relative z-5">
        <div className="row justify-between items-center py-30">
          <div className="col-auto">
            <div className="breadcrumbs text-white">
              <span className="breadcrumbs__item">
                <Link href="/" className="text-white-1">
                  Home
                </Link>
              </span>
              <span className="mx-2 text-white">{">"}</span>
              <span className="breadcrumbs__item">
                <Link href="/destinations" className="text-white-1">
                  Destinations
                </Link>
              </span>
              <span className="mx-2 text-white-1">{">"}</span>
              <span className="breadcrumbs__item">
                <Link href="/tanzania-travel" className="text-white-1">
                  Our Packages
                </Link>
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="col-auto">
            <div className="d-flex items-center gap-20 ">
              {/* <a
                href="https://g.co/kgs/k9QXFCF"
                target="_blank"
                rel="noopener noreferrer"
                className="size-40 flex-center rounded-full bg-white"
              >
                <Image
                  src="/img/socials/google.svg"
                  width={20}
                  height={20}
                  alt="Google"
                />
              </a> */}

              {/* <a
                href="https://www.trustpilot.com/review/kilimanjaroexplore.com"
                target="_blank"
                rel="noopener noreferrer"
                className="size-40 flex-center rounded-full bg-white"
              >
                <Image
                  src="/img/socials/trustpilot.svg"
                  width={20}
                  height={20}
                  alt="Trustpilot"
                />
              </a> */}
              <a
                href="https://api.whatsapp.com/send?phone=447496495795"
                target="_blank"
                rel="noopener noreferrer"
                className="size-40 flex-center rounded-full bg-white"
              >
                <Image
                  src="/icons/whatsapp.svg"
                  width={20}
                  height={20}
                  alt="Whatsapp"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="row pt-50">
          <div className="col-xl-10">
            <h1 className="text-40 fw-600 text-white md:text-25">
              SUPERIOR KILIMANJARO AND SAFARIS
            </h1>
            <div className="text-white mt-20">
              <p className="text-16 text-white fw-400 mb-20">
                Hike With A Safe, Successful and Experienced Company - We have
                Some Of The Most Experienced Guides And Porters That Work On The
                Mountain
              </p>
              
            </div>
          </div>
        </div>
      </div>

      {/* Wave Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-3">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative h-20 w-full"
          style={{ fill: "#fff" }}
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}
