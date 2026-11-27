"use client";

import React, { useEffect } from "react";

export default function TourShellPage() {
  useEffect(() => {
    // Dynamically inject the tour shell script so it initializes the dual iframe viewport and service worker
    const script = document.createElement("script");
    script.src = "/tour/shell.js?v=" + Date.now();
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Changa:wght@400;500;600;700;800&family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;1,800&family=Inter:wght@400;500;600;700&display=swap" />
      <link rel="stylesheet" href="/tour/shell.css" />
      <div id="root" className="min-h-screen bg-background text-white"></div>
    </>
  );
}
