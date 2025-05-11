// app/ClientLayout.jsx
'use client';

import GTranslateWidget from "@/components/GTranslateWidget";


export default function ClientLayout({ children }) {
  


  return (
    <>
      {/* Modal Root for Portals */}
      <div id="modal-root"></div>

      <GTranslateWidget/>
    </>
  );
}