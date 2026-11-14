"use client";

import React, { useEffect } from "react";
import "./coachpr1.css";
import "./coachpr2.css";

// Import raw HTML string transformed from original site
import rawHtml from "./rawContent";

export default function HomePage() {
  useEffect(() => {
    // Wall chips expand/collapse buttons
    const moreButtons = document.querySelectorAll(".wg__more");
    moreButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("aria-controls");
        if (!targetId) return;
        const list = document.getElementById(targetId);
        if (list) {
          const isExpanded = btn.getAttribute("aria-expanded") === "true";
          btn.setAttribute("aria-expanded", String(!isExpanded));
          list.classList.toggle("is-expanded");
          btn.textContent = isExpanded ? "عرض المزيد" : "عرض أقل";
        }
      });
    });

    // Mobile burger menu
    const burger = document.querySelector(".burger");
    const sheet = document.getElementById("sheet");
    if (burger && sheet) {
      burger.addEventListener("click", () => {
        const isOpen = burger.getAttribute("aria-expanded") === "true";
        burger.setAttribute("aria-expanded", String(!isOpen));
        if (!isOpen) {
          sheet.removeAttribute("inert");
          sheet.classList.add("is-open");
        } else {
          sheet.setAttribute("inert", "");
          sheet.classList.remove("is-open");
        }
      });

      // Close sheet when clicking any link inside
      const sheetLinks = sheet.querySelectorAll("a");
      sheetLinks.forEach((l) => {
        l.addEventListener("click", () => {
          burger.setAttribute("aria-expanded", "false");
          sheet.setAttribute("inert", "");
          sheet.classList.remove("is-open");
        });
      });
    }
  }, []);

  return (
    <div
      className="changa_4c9d147c-module__hpPt_W__variable barlow_condensed_1cab9ff4-module__V-zrxq__variable inter_8a594245-module__h1XLeG__variable"
      dangerouslySetInnerHTML={{ __html: rawHtml }}
    />
  );
}
