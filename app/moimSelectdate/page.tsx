"use client";

import { useEffect, useState } from "react";
import { getMoimApi } from "../api/api";
import { useSearchParams } from "next/navigation";

// id : 676d1181eb17bca63e11c0e5

export default function MoimSelectDate() {
  const [moimData, setMoimData] = useState({});
  const [onEditDate, setOnEditDate] = useState(false);
  const [onSelectAll, setOnSelectAll] = useState(false);
  const searchParams = useSearchParams();
  const queryId = searchParams.get("id");
  console.log("쿼리 아이디", queryId);

  useEffect(() => {
    const getMoimData = async () => {
      const res = await getMoimApi(queryId as string);
      const data = res;
      setMoimData(res);

      console.log("현재 데이터", data);
    };

    getMoimData();
  }, [queryId]);
  return (
    <div className="flex flex-col items-center">
      <section className="text-black font-suit text-[28px] font-semibold leading-none">
        모임 날짜 잡기
      </section>
      {onEditDate ? (
        <section className="flex flex-col  items-center p-6 justify-center  gap-12 self-stretch mt-6 mb-6 rounded-[2px] bg-[#F6F5F2]">
          <div>기간 연말 모임</div>
          <div>참여자 목록</div>
          <div>ㅇㅇ님, 날짜를 선택해주세요.</div>
          <div>캘린더</div>
        </section>
      ) : (
        <section className="flex flex-col  items-center p-6 justify-center  gap-12 self-stretch mt-6 mb-6 rounded-[2px] bg-[#F6F5F2]">
          <div>
            {onSelectAll
              ? "모두 선택하였습니다. 날짜를 확인하세요."
              : "이름을 선택하세요."}
          </div>
          <div>참여자 목록</div>

          {onSelectAll ? (
            <button>날짜 확인하기</button>
          ) : (
            <div>ㅇㅇ님을 선택하셨습니다.</div>
          )}
        </section>
      )}
      <section>
        {onEditDate ? (
          <div>
            <button onClick={() => setOnEditDate(false)}>선택 완료</button>
          </div>
        ) : (
          <div>
            <button onClick={() => setOnEditDate(true)}>선택하기</button>
            <button>공유하기</button>
          </div>
        )}
      </section>
    </div>
  );
}
