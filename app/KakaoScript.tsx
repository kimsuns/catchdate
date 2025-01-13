"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function KakaoScript() {
  useEffect(() => {
    const id = "kakao-sdk";
    if (document.getElementById(id) == null) {
      const script = document.createElement("script");
      script.id = id;
      script.src = "https://developers.kakao.com/sdk/js/kakao.js";
      script.onload = () => {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
        window.Kakao.isInitialized();
      };
      document.head.append(script);
    }
  }, []);
  return (
    <Script
      defer
      crossOrigin="anonymous"
      src="https://developers.kakao.com/sdk/js/kakao.js"
    />
  );
}
