"use client";

import { useEffect, useState } from "react";
import { getMoimApi } from "../api/api";
import { useSearchParams } from "next/navigation";
import SelectDate from "./components/SelectDate";
import SelectName from "./components/SelectName";

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
    console.log("모임데이터", moimData);
  }, [queryId]);

  return (
    <div className="flex flex-col items-center">
      <section className="text-black font-suit text-[28px] font-semibold leading-none">
        모임 날짜 잡기
      </section>
      {onEditDate ? <SelectDate /> : <SelectName member={moimData.members} />}
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
