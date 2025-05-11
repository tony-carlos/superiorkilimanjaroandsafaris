"use client";

import { useEffect } from "react";

export default function TawktoWidget() {
  useEffect(() => {
    //<!--StartofTawk.toScript-->
    var Tawk_API = Tawk_API || {},
      Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/67eed9520b4f1d190b96f2d2/default";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
    //<!--End of Tawk.to Script-->
  }, []);

  return null;
}
