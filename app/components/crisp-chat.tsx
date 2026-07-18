"use client";

import { useEffect } from "react";

export function CrispChat() {
  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_CRISP_ID;
    console.log("[CrispChat] NEXT_PUBLIC_CRISP_ID:", id ? `"${id}"` : "(empty)");
    if (!id) return;
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = id;
    const script = document.createElement("script");
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;
    document.head.appendChild(script);
    console.log("[CrispChat] script injected:", script.src);
  }, []);
  return null;
}
