"use client";

import Link from "next/link";
import { useState } from "react";
import Title from "./components/Title";
import { title } from "process";
import { createMoimApi } from "../api/api";
import { MoimDataType, MoimMemberType } from "../type/type";
import { useRouter } from "next/navigation";
import Calendar from "../components/Calendar/Calendar";
import Input from "./components/Input";

export default function MoimCreate() {
  const router = useRouter();
  const [moimData, setMoimData] = useState<MoimDataType>({
    title: "",
    status: "ready",
    members: [],
    startDate: null,
    endDate: null,
    time: "",
    allPickDate: [],
    topDate: [],
  });

  const [membersArray, setMembersArray] = useState<string[]>([]);
  const [memberName, setMemberName] = useState<string>("");

  const [validData, setValidData] = useState({
    title: "",
    members: "",
    date: "",
    time: "",
  });

  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 3);

  const onCreateMoim = async (data: MoimDataType) => {
    try {
      const res = await createMoimApi(data);
      console.log("응답", res.data);
      if (res.data.id) {
        router.push(`/moimSelectdate?id=${res.data.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateMoimDate = (name: string, value: string) => {
    setMoimData({
      ...moimData,
      [name]: value,
    });
    console.log("현재 모임 데이터", moimData);
  };

  const handleDateSelect = (dates: Date[]) => {
    const firstDay = dates[0];
    const secondDay = dates[1];
    console.log("선택한 날짜", dates);
    if (dates.length <= 1) {
      setMoimData({
        ...moimData,
        startDate: firstDay,
        endDate: null,
      });
    }
    if (dates.length >= 2) {
      setMoimData((prev: MoimDataType): MoimDataType => {
        if (firstDay < secondDay) {
          return { ...prev, startDate: firstDay, endDate: secondDay };
        } else {
          return { ...prev, startDate: secondDay, endDate: firstDay };
        }
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    // 모임명 글자수 제한
    if (name === "title" && value.length <= 15) {
      onUpdateMoimDate(name, value);
    }

    // 약속 시간 글자수 제한
    if (name === "time" && value.length <= 8) {
      onUpdateMoimDate(name, value);
    }

    // 모임 참여자 이름 글자수 제한
    if (name === "members" && value !== null && value.length <= 3) {
      setMemberName(value);
    }
  };

  // 모임 참여자 추가
  const handleMemberAdd = () => {
    const existName = membersArray.some((item) => item === memberName);
    if (memberName !== "" && membersArray.length < 10 && !existName) {
      setMembersArray([...membersArray, memberName]);
      setMemberName("");
    }
  };

  // 모임 참여자 삭제
  const handleMemberDelete = (id: number) => {
    const newMember = membersArray.filter((item, index) => index !== id);
    setMembersArray(newMember);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleMemberAdd();
    }
  };

  // input 유효성 검사
  const onValidTest = () => {
    let validtest = true;
    const vaildText = {
      title: "모임명을 입력해주세요.",
      members: "참여자를 2인 이상 입력해주세요.",
      date: "기간을 설정해주세요.",
      time: "시간을 입력해주세요.",
    };

    const newValidData = {
      title: "",
      members: "",
      date: "",
      time: "",
    };

    // 모임명 미입력시
    if (moimData.title === "") {
      newValidData.title = vaildText.title;
      validtest = false;
    }

    // 참여자 2인 이하일시
    if (membersArray.length < 2) {
      newValidData.members = vaildText.members;
      validtest = false;
    }

    // 기간 미입력시
    if (moimData.startDate === null || moimData.endDate === null) {
      newValidData.date = vaildText.date;
      validtest = false;
    }

    // 시간 미입력시
    if (moimData.time === "") {
      newValidData.time = vaildText.time;
      validtest = false;
    }

    setValidData({ ...newValidData });

    return validtest;
  };

  const handleSubmit = async () => {
    const validtest = await onValidTest();

    if (validtest) {
      const fixMember: MoimMemberType[] = membersArray.map((item, index) => ({
        memberId: String(index + 1),
        name: item,
        dates: [],
        choose: false,
      }));

      const updateData = {
        ...moimData,
        members: fixMember,
      };

      setMoimData(updateData);

      onCreateMoim(updateData);

      console.log("api 보내자", moimData);
    }
  };

  return (
    <div className="flex flex-col items-center h-full text-black">
      <header className="relative flex text-black font-suit w-full items-center justify-center text-[28px] font-semibold leading-none">
        <Link href={"/"} className="absolute top-0 left-0">
          <img src="/back.svg" alt="뒤로 가기" />
        </Link>
        <span>모임 생성하기</span>
      </header>

      <main className="flex-1 overflow-y-auto flex flex-col p-6 gap-5 self-stretch mt-6 mb-6 rounded-[2px] bg-[#F6F5F2] scrollbar-gutter-stable no-scrollbar">
        <section>
          <Title text="1. 모임명을 입력하세요." />
          <Input
            name="title"
            value={moimData.title}
            onChange={handleInputChange}
            placeholder="모임 이름을 입력하세요."
          />
          <div className="text-[12px] text-red-500">{validData.title}</div>
        </section>

        <section>
          <Title text="2. 참여자를 입력하세요. (최대 10명)" />
          <label>
            <div className="flex w-full gap-2 mb-2">
              <Input
                name="members"
                value={memberName}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="참여자 이름을 입력하세요."
              />
              <button
                className={
                  "bg-gray-300 text-gray-700 text-sm px-2 py-1 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 w-[100px]"
                }
                onClick={handleMemberAdd}
              >
                추가
              </button>
            </div>
          </label>
          <div className="text-[12px] text-red-500">{validData.members}</div>
          <div className="grid grid-cols-2 gap-2 place-items-center text-black">
            {membersArray.map((item, index) => (
              <div key={index} className="flex gap-[2px]">
                {item}
                <button onClick={() => handleMemberDelete(index)}>
                  <img
                    src="/images/minus.png"
                    alt="참여자 이름 제거"
                    className="w-[13px]"
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <Title text="3. 기간을 설정하세요." />
          <div className="text-gray-500 text-[10px] ">
            참여자는 해당 기간 내에서 가능한 날짜를 선택하게 됩니다.
          </div>
          <Calendar
            startDate={startDate}
            endDate={endDate}
            onDateSelect={handleDateSelect}
            size="S"
            range={true}
          />
          <div className="text-[12px] text-red-500">{validData.date}</div>
          <div className="text-center">
            {moimData.startDate
              ? moimData.startDate.toLocaleDateString()
              : "시작 날짜"}{" "}
            ~{" "}
            {moimData.endDate
              ? moimData.endDate.toLocaleDateString()
              : "종료 날짜"}
          </div>
        </section>
        <section>
          <Title text="4. 모임 시간을 입력하세요." />
          <Input
            name="time"
            value={moimData.time}
            onChange={handleInputChange}
            placeholder="모임 시간을 입력하세요."
          />

          <div className="text-[12px] text-red-500">{validData.time}</div>
        </section>
      </main>
      <footer className="flex w-full">
        <button
          onClick={handleSubmit}
          className="text-[#FFF] font-[SUIT Variable] text-[17px] font-bold flex w-full h-[53px] p-4 justify-center items-center self-stretch rounded-[8px] hover:bg-[#51B1E0] bg-[#3a8bb5]"
        >
          모임 생성하기
        </button>
      </footer>
    </div>
  );
}
