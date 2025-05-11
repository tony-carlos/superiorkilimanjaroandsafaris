"use client";

import { homes, pages, tours } from "@/data/menu";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Script from "next/script";

export default function Menu() {
  const pathname = usePathname();

  useEffect(() => {
    window.gtranslateSettings = {
      default_language: "en",
      languages: ["en", "fr", "it", "es", "nl", "zh-CN", "ru", "de"],
      wrapper_selector: ".gtranslate_wrapper",
    };
  }, []);

  return (
    <>
      <div className="xl:d-none ml-20">
        <div className="desktopNav">
          <div className="desktopNav__item">
            <Link href="/home">Home</Link>
          </div>
          <div className="desktopNav__item">
            <Link href="/tanzania-travel">Safari</Link>
          </div>
          <div className="desktopNav__item">
            <Link href="/climbing-kilimanjaro"> Kilimanjaro</Link>
          </div>
          <div className="desktopNav__item">
            <Link href="/destinations">Destination</Link>
          </div>
          <div className="desktopNav__item">
            <Link href="/plan-your-trip">Plan Your Trip</Link>
          </div>
          <div className="desktopNav__item">
            <Link href="/about">About Us</Link>
          </div>
          <div className="desktopNav__item">
            <Link href="/contact">Contacts</Link>
          </div>
          <div className="desktopNav__item">
            <div className="gtranslate_wrapper"></div>
            <Script
              src="https://cdn.gtranslate.net/widgets/latest/dropdown.js"
              strategy="afterInteractive"
            />
          </div>
        </div>
      </div>
    </>
  );
}
