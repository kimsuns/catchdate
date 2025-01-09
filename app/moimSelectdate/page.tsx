"use client";

import { useEffect, useState } from "react";
import { getMoimApi, updateMoimApi } from "../api/api";
import { useSearchParams } from "next/navigation";
import SelectDate from "./components/SelectDate";
import SelectName from "./components/SelectName";
import { MoimMemberType } from "../type/type";
import Button from "../components/Button/Button";

// 676d1181eb17bca63e11c0e5

// 내용 꽉 찬 예시시
// 6777f0c59fe275be55856418

// 날짜 생성
//677df17429403c63c51d695b

export default function MoimSelectDate() {
  const [moimData, setMoimData] = useState({
    _id: "",
    title: "",
    status: "",
    members: [],
    startDate: null,
    endDate: null,
    time: "",
    pickDate: [],
    top3: [],
  });
  const [onEditDate, setOnEditDate] = useState(false);
  const [onSelectAll, setOnSelectAll] = useState(false);
  const [selectMember, setSelectMember] = useState<MoimMemberType>({
    memberId: "",
    name: "",
    dates: [],
    choose: false,
  });
  const searchParams = useSearchParams();
  const queryId = searchParams.get("id");

  useEffect(() => {
    const getMoimData = async () => {
      const res = await getMoimApi(queryId as string);
      const data = res;
      setMoimData(res);
    };
    getMoimData();
  }, [queryId]);

  const onSelectMember = (value: MoimMemberType): void => {
    console.log("선택한 멤버", value);
    setSelectMember(value);
  };

  const onSelectMemberDate = (dates: Date[]) => {
    console.log("선택한 데이터", dates);
    setSelectMember((prev) => {
      const updateData = {
        ...prev,
        dates: dates,
      };
      return updateData;
    });
  };

  const onUpdateMoim = async () => {
    console.log("선택한 날짜 보낸다");
    try {
      const res = await updateMoimApi(queryId as string, selectMember);
      console.log("응답", res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onConfirmMemberDate = () => {
    console.log("뭐지?");
    setOnEditDate(false);
    onUpdateMoim();
  };

  return (
    <div className="flex flex-col items-center h-full">
      <header className="text-black font-suit text-[28px] font-semibold leading-none">
        모임 날짜 잡기
      </header>
      <main className="flex-1 overflow-y-auto flex-col  items-center p-6 justify-center self-stretch mt-6 mb-6 rounded-[2px] bg-[#F6F5F2] scrollbar-gutter-stable no-scrollbar">
        <div className="font-bold text-[20px] text-center uppercase mb-4">
          {moimData.title === "" ? "모임명" : `'${moimData.title}' 모임`}
        </div>
        {onEditDate ? (
          <SelectDate
            selectMember={selectMember.name}
            startDate={moimData.startDate}
            endDate={moimData.endDate}
            time={moimData.time}
            onDateSelect={onSelectMemberDate}
          />
        ) : (
          <SelectName
            member={moimData.members}
            onSelectAll={onSelectAll}
            onSelectMember={onSelectMember}
            selectName={selectMember.name}
          />
        )}
      </main>
      <footer className="flex w-full">
        {onEditDate ? (
          <Button onClick={onConfirmMemberDate}>선택 완료</Button>
        ) : (
          <div className="flex w-full gap-5">
            <Button onClick={() => setOnEditDate(true)}>선택하기</Button>
            <Button onClick={() => {}}>공유하기</Button>
          </div>
        )}
      </footer>
    </div>
  );
}
