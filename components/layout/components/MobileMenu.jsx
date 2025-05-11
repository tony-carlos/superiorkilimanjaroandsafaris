"use client";

import { menuData } from "@/data/mobileMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
const socialMediaLinks = [
  {
    id: 1,
    class: "icon-facebook",
    href: "https://www.facebook.com/share/164btgFcNh/?mibextid=wwXIfr",
  },
  {
    id: 3,
    class: "icon-instagram",
    href: "https://www.instagram.com/kilimanjaroexplore?igsh=eW9wdHR5cjV2dHlx&utm_source=qr",
  },
];
export default function MobileMenu({ mobileMenuOpen, setMobileMenuOpen }) {
  useEffect(() => {
    window.gtranslateSettings = {
      default_language: "en",
      languages: ["en", "fr", "it", "es", "nl", "zh-CN", "ru", "de"],
      wrapper_selector: ".gtranslate_wrapper",
    };
  }, []);

  const [activeSub, setActiveSub] = useState("");
  const pathname = usePathname();
  return (
    <div
      data-aos="fade"
      data-aos-delay=""
      className={`menu js-menu ${mobileMenuOpen ? "-is-active" : ""} `}
      style={
        mobileMenuOpen
          ? { opacity: "1", visibility: "visible" }
          : { pointerEvents: "none", visibility: "hidden" }
      }
    >
      <div
        onClick={() => setMobileMenuOpen(false)}
        className="menu__overlay js-menu-button"
      ></div>

      <div className="menu__container">
        <div className="menu__header">
          <h5>Menu</h5>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="js-menu-button"
          >
            <i className="icon-cross text-10"></i>
          </button>
        </div>

        <div className="menu__content">
          <ul
            className="menuNav js-navList -is-active"
            style={{ maxHeight: "calc(100vh - 262px)", overflowY: "auto" }}
          >
            <li className="menuNav__item">
              <Link href="/home">Home</Link>
            </li>
            <li className="menuNav__item">
              <Link href="/tanzania-travel">Safari</Link>
            </li>
            <li className="menuNav__item">
              <Link href="/climbing-kilimanjaro">Kilimanjaro</Link>
            </li>
            <li className="menuNav__item">
              <Link href="/destinations">Destinations</Link>
            </li>

            <li className="menuNav__item">
              <Link href="/plan-your-trip">Plan Your Trip</Link>
            </li>
            <li className="menuNav__item">
              <Link href="/about">About Us</Link>
            </li>
            <li className="menuNav__item">
              <Link href="/blog">Blogs</Link>
            </li>
            <li className="menuNav__item">
              <Link href="/contact">Contact</Link>
            </li>
            <li className="menuNav__item">
              <div className="gtranslate_wrapper"></div>
            </li>
          </ul>
        </div>

        <div className="menu__footer">
          <div className="text-20 lh-12 fw-500 mt-20">
            <div>Contact Us</div>
            <div className="text-accent-1">+44 7772 162 477</div>
          </div>

          <div className="d-flex items-center x-gap-10 pt-30">
            {socialMediaLinks.map((elm, i) => (
              <div key={i}>
                <a href={elm.href} className="d-block">
                  <i className={elm.class}></i>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
