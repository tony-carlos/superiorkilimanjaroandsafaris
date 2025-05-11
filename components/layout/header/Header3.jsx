"use client";

import React, { useEffect, useState, useRef } from "react";
import Menu from "../components/Menu";
import Currency from "../components/Currency";
import MobileMenu from "../components/MobileMenu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function Header3() {
  const router = useRouter();
  const pageNavigate = (pageName) => {
    router.push(pageName);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addClass, setAddClass] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("EN");
  const [showLanguages, setShowLanguages] = useState(false);
  const languageRef = useRef(null);

  // Add a class to the element when scrolled 50px
  const handleScroll = () => {
    if (window.scrollY >= 50) {
      setAddClass(true);
    } else {
      setAddClass(false);
    }
  };

  // Create our own simple language switcher using direct translation method
  const switchLanguage = (lang, langCode) => {
    if (typeof window !== "undefined") {
      const langPair = `en|${langCode}`;

      // Set cookie for Google Translate
      document.cookie = `googtrans=/auto/${langCode}`;
      document.cookie = `googtrans=/auto/${langCode};domain=.${window.location.host}`;

      // Reload page to apply translation
      window.location.reload();

      setCurrentLanguage(lang);
      setShowLanguages(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setShowLanguages(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [languageRef]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Initialize Google Translate Element
    const addScript = () => {
      window.googleTranslateElementInit = function () {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
            includedLanguages: "en,fr,it,es,nl,zh-CN,ru,de",
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      };

      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    // Check if translation is active from cookie
    const detectLanguage = () => {
      const match = document.cookie.match(/googtrans=\/auto\/([^;]+)/);
      if (match && match[1]) {
        const langMap = {
          en: "EN",
          fr: "FR",
          es: "ES",
          de: "DE",
          it: "IT",
          nl: "NL",
          "zh-CN": "中文",
          ru: "РУ",
        };

        setCurrentLanguage(langMap[match[1]] || "EN");
      }
    };

    addScript();
    detectLanguage();

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`header -type-3 js-header ${addClass ? "-is-sticky" : ""}`}
      >
        <div className="header__container container">
          <div className="headerMobile__left">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="header__menuBtn js-menu-button"
            >
              <i className="icon-main-menu"></i>
            </button>
          </div>

          <div className="header__logo">
            <Link href="/" className="header__logo">
              <Image
                width="167"
                height="32"
                src="/img/logo.png"
                alt="logo icon"
                priority
              />
            </Link>

            <Menu />
          </div>

          <div className="headerMobile__right">
            <div
              ref={languageRef}
              className="d-flex"
              style={{ position: "relative" }}
            >
              <span
                onClick={() => setShowLanguages(!showLanguages)}
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: "#66B5C8",
                }}
              >
                {currentLanguage}
              </span>

              {showLanguages && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    background: "white",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    borderRadius: "4px",
                    padding: "5px 0",
                    zIndex: 1000,
                    marginTop: "5px",
                  }}
                >
                  <div
                    onClick={() => switchLanguage("EN", "en")}
                    style={{
                      padding: "5px 15px",
                      cursor: "pointer",
                      fontSize: "14px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    English
                  </div>
                  <div
                    onClick={() => switchLanguage("FR", "fr")}
                    style={{
                      padding: "5px 15px",
                      cursor: "pointer",
                      fontSize: "14px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Français
                  </div>
                  <div
                    onClick={() => switchLanguage("ES", "es")}
                    style={{
                      padding: "5px 15px",
                      cursor: "pointer",
                      fontSize: "14px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Español
                  </div>
                  <div
                    onClick={() => switchLanguage("DE", "de")}
                    style={{
                      padding: "5px 15px",
                      cursor: "pointer",
                      fontSize: "14px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Deutsch
                  </div>
                  <div
                    onClick={() => switchLanguage("IT", "it")}
                    style={{
                      padding: "5px 15px",
                      cursor: "pointer",
                      fontSize: "14px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Italiano
                  </div>
                  <div
                    onClick={() => switchLanguage("NL", "nl")}
                    style={{
                      padding: "5px 15px",
                      cursor: "pointer",
                      fontSize: "14px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Nederlands
                  </div>
                  <div
                    onClick={() => switchLanguage("中文", "zh-CN")}
                    style={{
                      padding: "5px 15px",
                      cursor: "pointer",
                      fontSize: "14px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    中文
                  </div>
                  <div
                    onClick={() => switchLanguage("РУ", "ru")}
                    style={{
                      padding: "5px 15px",
                      cursor: "pointer",
                      fontSize: "14px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Русский
                  </div>
                </div>
              )}

              {/* Hidden Google Translate element */}
              <div
                style={{
                  position: "absolute",
                  top: "-1000px",
                  left: "-1000px",
                }}
              >
                <div id="google_translate_element"></div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />
    </>
  );
}
