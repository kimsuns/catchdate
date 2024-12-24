"use client";

import Link from "next/link";
import { useState } from "react";
import Title from "./components/Title";

export default function MoimCreate() {
  const [data, setData] = useState({
    title: "",
    status: "",
    members: [
      {
        memberId: "",
        name: "",
        dates: "",
        choose: false,
      },
    ],
    startDate: "",
    endDate: "",
    time: "",
    pickDate: [],
    top3: [],
  });

  const [member, setMember] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);

    // 모임명 글자수 제한
    if (e.target.value.length <= 15) {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }

    console.log(data);
  };

  const handleMemberInput = (e) => {
    const name = e.target.value;
    if (name !== null && name.length <= 4) {
      setInputValue(e.target.value);
    }
  };

  const handleMemberAdd = () => {
    if (inputValue !== "") {
      setMember([...member, inputValue]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleMemberAdd();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <section className="relative flex text-black font-suit w-full items-center justify-center text-[28px] font-semibold leading-none">
        <Link href={"/"} className="absolute top-0 left-0">
          <img src="/back.svg" alt="뒤로 가기" />
        </Link>
        <span>모임 생성하기</span>
      </section>

      <section className="flex flex-col p-6 justify-center  gap-10 self-stretch mt-6 mb-6 rounded-[2px] bg-[#F6F5F2]">
        <section>
          <Title text="1. 모임명을 입력하세요." />
          <input
            name="title"
            value={data.title}
            onChange={handleInputChange}
            placeholder="모임 이름을 입력하세요."
          />
        </section>

        <section>
          <Title text="2. 참여자를 입력하세요. (최대 10명)" />
          <label>
            <input
              name="members"
              value={inputValue}
              onChange={handleMemberInput}
              onKeyDown={handleKeyDown}
              placeholder="참여자 이름을 입력하세요."
            />
            <button onClick={handleMemberAdd}>추가</button>
          </label>
          <div>
            {member.map((item) => (
              <span>{item}</span>
            ))}
          </div>
        </section>

        <section>
          <Title text="3. 기간을 설정하세요." />
          <div className="text-gray-500 text-[10px] ">
            참여자는 해당 기간 내에서 가능한 날짜를 선택하게 됩니다.
          </div>
          <button>기간 설정하기(캘린더 모달)</button>
          <div>시작날짜 ~ 끝날짜</div>
        </section>

        <section>
          <Title text="4. 모임 시간을 입력하세요." />
          <input />
        </section>
      </section>

      <button className="text-[#FFF] font-[SUIT Variable] text-[17px] font-bold flex w-full h-[53px] p-4 justify-center items-center self-stretch rounded-[8px] hover:bg-[#51B1E0] bg-gray-300">
        약속 생성하기
      </button>
    </div>
  );
}
