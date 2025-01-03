"use client";

import { useEffect, useState } from "react";
import { getMoimApi } from "../api/api";
import { useSearchParams } from "next/navigation";
import SelectDate from "./components/SelectDate";
import SelectName from "./components/SelectName";

// 676d1181eb17bca63e11c0e5

// 내용 꽉 찬 예시시
// 6777f0c59fe275be55856418

export default function MoimSelectDate() {
  const [moimData, setMoimData] = useState({
    _id: "",
    title: "",
    status: "",
    members: [],
    startDate: "",
    endDate: "",
    time: "",
    pickDate: [],
    top3: [],
  });
  const [onEditDate, setOnEditDate] = useState(false);
  const [onSelectAll, setOnSelectAll] = useState(false);
  const [selectMember, setSelectMember] = useState({
    memberId: "",
    name: "",
    dates: [],
    choose: "",
  });
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

  const onSelectMember = (value) => {
    console.log("선택한 멤버", value);
    setSelectMember(value);
  };

  return (
    <div className="flex flex-col items-center">
      <section className="text-black font-suit text-[28px] font-semibold leading-none">
        모임 날짜 잡기
      </section>
      <section className="flex flex-col  items-center p-6 justify-center self-stretch mt-6 mb-6 rounded-[2px] bg-[#F6F5F2]">
        <div className="font-bold text-1xl text-center uppercase mb-4">
          {moimData.title === "" ? "모임명" : moimData.title}
        </div>
        {onEditDate ? (
          <SelectDate />
        ) : (
          <SelectName
            member={moimData.members}
            onSelectAll={onSelectAll}
            onSelectMember={onSelectMember}
            selectName={selectMember.name}
          />
        )}
      </section>
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
