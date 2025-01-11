"use client";

import { useEffect, useState } from "react";
import { getMoimApi } from "../api/api";

export default function MoimTheDay() {
  const [moimData, setMoimData] = useState({
    title: "",
    status: "ready",
    members: [],
    startDate: null,
    endDate: null,
    time: "",
    pickDate: [],
    top3: [],
  });
  const [queryId, setQueryId] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    setQueryId(id);
  }, []);

  const getMoimData = async () => {
    try {
      const res = await getMoimApi(queryId as string);
      setMoimData(res);
    } catch (error) {
      console.error("모임 데이터를 가져오지 못 했습니다.", error);
    }
  };

  useEffect(() => {
    if (!queryId) return;
    getMoimData();
  }, [queryId]);

  return (
    <div className="flex flex-col items-center h-full">
      <header className="text-black font-suit text-[28px] font-semibold leading-none">
        모임 날짜 확인하기
      </header>
      <main className="flex-1 overflow-y-auto flex-col  items-center p-6 justify-center self-stretch mt-6 mb-6 rounded-[2px] bg-[#F6F5F2] scrollbar-gutter-stable no-scrollbar">
        <div className="font-bold text-[18px] text-center uppercase mb-4">
          {moimData.title && (
            <span className="text-[#3a8bb5]">{moimData.title}</span>
          )}
        </div>
        <div className="flex gap-2">
          모임 참여자 :
          {moimData.members.map((item) => (
            <div>{item.name}</div>
          ))}
        </div>
        <div>
          모두 가능한 날짜
          {moimData.pickDate.map((item) => (
            <div>{new Date(item.date).toLocaleDateString()}</div>
          ))}
        </div>
      </main>
      <footer>
        <button>이미지 저장</button>
        <button>공유하기</button>
      </footer>
    </div>
  );
}
