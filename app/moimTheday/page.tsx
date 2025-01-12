"use client";

import { useEffect, useState } from "react";
import { getMoimApi } from "../api/api";
import TheDay from "./components/TheDay";
import Button from "../components/Button/Button";
// allPickDate 날짜
// 67821836b095e13967864d9b

// topDate 날짜
// 678218f4b095e13967864dd6

export default function MoimTheDay() {
  const [moimData, setMoimData] = useState({
    title: "",
    status: "ready",
    members: [],
    startDate: null,
    endDate: null,
    time: "",
    allPickDate: [],
    topDate: [],
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
      <main className="flex-1 overflow-y-auto flex-col items-center p-6 justify-center self-stretch mt-6 mb-6 rounded-[2px] bg-[#F6F5F2] scrollbar-gutter-stable no-scrollbar">
        <div className="font-bold text-[18px] text-center uppercase mb-4 text-[#3a8bb5]">
          {moimData.title}
        </div>
        <div className="w-full p-[20px] bg-white">
          {moimData.allPickDate.length >= 1 ? (
            <div>
              <TheDay
                data={moimData.allPickDate[0]}
                time={moimData.time}
                isAllPick={true}
              />
            </div>
          ) : (
            <div>
              <div>아쉽지만 모두 가능한 날짜가 없어요!</div>
              <div>
                대신 최대한 많은 멤버가 참여 가능한 날짜를 알려드릴게요!
              </div>
              {moimData.topDate.map((item) => (
                <div>
                  <div>{new Date(item.date).toLocaleDateString()}</div>
                  <div>
                    참여 가능한 멤버
                    {item.members.map((member, index) => (
                      <div key={index}>
                        {member}
                        {index !== item.members.length - 1 && ","}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <footer className="flex w-full gap-5">
        <Button>이미지 저장</Button>
        <Button>공유하기</Button>
      </footer>
    </div>
  );
}
