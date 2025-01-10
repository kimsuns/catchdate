"use client";

import { useEffect, useState } from "react";

export default function MoimTheDay() {
  const [queryId, setQueryId] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    setQueryId(id);
  }, []);
  return (
    <div className="flex flex-col items-center">
      <section className="text-black font-suit text-[28px] font-semibold leading-none">
        모임 날짜 확인하기
      </section>
      <section className="flex flex-col  items-center p-6 justify-center  gap-12 self-stretch mt-6 mb-6 rounded-[2px] bg-[#F6F5F2]">
        <div>기간 연말 모임</div>
        <div>참여자 목록</div>
        <div>모두 가능한 날짜</div>
      </section>
      <section>
        <button>이미지 저장</button>
        <button>공유하기</button>
      </section>
    </div>
  );
}
