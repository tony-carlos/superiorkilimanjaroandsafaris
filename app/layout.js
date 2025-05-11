import ScrollToTop from "@/components/common/ScrollToTop";
import "bootstrap/dist/css/bootstrap.min.css";
import "../public/css/style.css";

import { DM_Sans, Inter, Merriweather } from "next/font/google";
import ScrollTopBehaviour from "@/components/common/ScrollTopBehavier";
import Wrapper from "@/components/layout/Wrapper";
import { ToastContainer } from "react-toastify";
import PromotionalPopup from "./components/PromotionalPopup";
import TawktoWidget from "./components/TawktoWidget";

const merriweather = Merriweather({
  weight: ["400", "300", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({ subsets: ["latin"] });

if (typeof window !== "undefined") {
  import("bootstrap");
}

export const metadata = {
  metadataBase: new URL("https://kilimanjaroexplore.com"),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Superior Kilimanjaro And Safaris",
              url: "https://www.superiorkilimanjaroandsafaris.com",
              logo: "https://pub-52b9ad9500f64d9bbe7b895b30666182.r2.dev/bgmain.png",
              description:
                "Tailor-made Tanzania vacation ✓ Best safari, beach and climbing itineraries ✓ 100% Tanzania Specialist ✓ Private Trips ✓ Free Quote",
              telephone: "+447772162477",
              address: {
                "@type": "PostalAddress",
                addressCountry: "Tanzania",
              },
              sameAs: [
                "https://www.facebook.com/profile.php?id=61564606604159",
                "https://www.tiktok.com/@superior.kilimanj?lang=en",
              ],
            }),
          }}
        />
      </head>
      <body className={merriweather.className}>
        <Wrapper>{children}</Wrapper>
        <ToastContainer />
        {/* <PromotionalPopup />
        <TawktoWidget /> */}
      </body>
    </html>
  );
}
