"use client";

import { useEffect, useState } from "react";
import { getMoimApi } from "../api/api";
import TheDay from "./components/TheDay";
import Button from "../components/Button/Button";
import { MoimDataType } from "../type/type";
import { useRouter } from "next/navigation";
import SaveImageButton from "../components/Button/SaveImageButton";
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
  const [unableMember, setUnableMember] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    setQueryId(id);
  }, []);

  const getMoimData = async () => {
    try {
      const res = await getMoimApi(queryId as string);
      setMoimData(res);
      handleUnableMember(res);
    } catch (error) {
      console.error("모임 데이터를 가져오지 못 했습니다.", error);
    }
  };

  const handleUnableMember = (data: MoimDataType) => {
    if (data.allPickDate.length >= 1) {
      return;
    }

    const noexistMember = data.members
      .filter((member) => !data.topDate[0].members.includes(member.name))
      .map((member) => member.name);

    setUnableMember(noexistMember);
  };

  useEffect(() => {
    if (!queryId) return;
    getMoimData();
  }, [queryId]);

  return (
    <div className="flex flex-col items-center h-full">
      <header className="text-black font-suit text-[28px] font-semibold leading-none">
        캐치데이트 날짜 확인
      </header>
      <main
        id="moimTheDayDocument"
        className="flex-1 overflow-y-auto flex-col items-center p-6 justify-center self-stretch mt-6 mb-6 rounded-[2px] bg-[#F6F5F2] scrollbar-gutter-stable no-scrollbar"
      >
        <div className="font-bold text-[18px] text-center uppercase mb-4 text-[#3a8bb5]">
          {moimData.title}
        </div>
        <div className="w-full p-[20px] bg-white">
          {moimData.allPickDate.length >= 1 ? (
            <TheDay data={moimData.allPickDate[0]} time={moimData.time} />
          ) : (
            <div className="">
              {moimData.topDate.length >= 1 && (
                <TheDay
                  data={moimData.topDate[0]}
                  time={moimData.time}
                  noJoin={unableMember}
                />
              )}
            </div>
          )}
        </div>
      </main>
      <footer className="flex flex-col w-full gap-2">
        <div className="flex w-full gap-5">
          <SaveImageButton />
          <Button onClick={() => {}}>공유하기</Button>
        </div>
        <button
          onClick={() => router.push("/")}
          className="text-[12px] text-center text-gray-500 underline"
        >
          새로운 모임 날짜 잡으러 가기
        </button>
      </footer>
    </div>
  );
}
