"use client";

import Link from "next/link";
import { useState } from "react";
import Title from "./components/Title";
import { title } from "process";

export default function MoimCreate() {
  const [moimData, setMoimData] = useState({
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

  const [members, setMembers] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [validData, setValidData] = useState({
    title: "",
    members: "",
    date: "",
    time: "",
  });

  const onUpdateMoimDate = (name, value) => {
    setMoimData({
      ...moimData,
      [name]: value,
    });
    console.log("현재 모임 데이터", moimData);
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // 모임명 글자수 제한
    if (name === "title" && e.target.value.length <= 15) {
      onUpdateMoimDate(name, value);
    }

    // 약속 시간 글자수 제한
    if (name === "time" && e.target.value.length <= 5) {
      onUpdateMoimDate(name, value);
    }
  };

  const handleMemberInput = (e) => {
    const name = e.target.value;
    if (name !== null && name.length <= 4) {
      setInputValue(e.target.value);
    }
  };

  const handleMemberAdd = () => {
    if (inputValue !== "" && members.length < 10) {
      setMembers([...members, inputValue]);
      setInputValue("");
    }
  };

  const handleMemberDelete = (i) => {
    const newMember = members.filter((item, index) => index !== i);
    setMembers(newMember);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleMemberAdd();
    }
  };

  // const onValidData = (name: string) => {
  //   if (moimData[name] === "") {
  //     setValidData({
  //       ...validData,
  //       [name]: vaildText[name],
  //     });
  //   } else {
  //     setValidData({
  //       ...validData,
  //       [name]: "",
  //     });
  //   }
  // };

  const handleSubmit = () => {
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

    // 모임명 미입력시시
    if (moimData.title === "") {
      newValidData.title = vaildText.title;
    }

    // 참여자 2인 이하일시시
    if (members.length < 2) {
      newValidData.members = vaildText.members;
    }

    // 기간 미입력시
    if (moimData.startDate === "" || moimData.endDate === "") {
      newValidData.date = vaildText.date;
    }

    // 시간 미입력시
    if (moimData.time === "") {
      newValidData.time = vaildText.time;
    }

    setValidData({ ...newValidData });
    // // 모임명 미입력시시
    // if (moimData.title === "") {
    //   setValidData({
    //     ...validData,
    //     title: vaildText.title,
    //   });
    // } else {
    //   setValidData({
    //     ...validData,
    //     title: "",
    //   });
    //   console.log("타이틀 유효성 검사 실행 안 함");
    // }

    // // 참여자 2인 이하일시시
    // if (moimData.members.length < 2) {
    //   setValidData({
    //     ...validData,
    //     members: vaildText.members,
    //   });
    // } else {
    //   setValidData({
    //     ...validData,
    //     members: "",
    //   });
    // }

    // // 기간 미입력시
    // if (moimData.startDate === "" || moimData.endDate === "") {
    //   setValidData({
    //     ...validData,
    //     date: vaildText.date,
    //   });
    // } else {
    //   setValidData({
    //     ...validData,
    //     date: "",
    //   });
    // }

    // // 시간 미입력시
    // if (moimData.time === "") {
    //   setValidData({
    //     ...validData,
    //     time: vaildText.time,
    //   });
    // } else {
    //   setValidData({
    //     ...validData,
    //     time: "",
    //   });
    // }

    console.log("유효성 데이터", validData);
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
            value={moimData.title}
            onChange={handleInputChange}
            placeholder="모임 이름을 입력하세요."
          />
          <div className="text-[12px] text-red-500">{validData.title}</div>
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
          <div className="text-[12px] text-red-500">{validData.members}</div>
          <div>
            {members.map((item, index) => (
              <div key={index}>
                {item}
                <button onClick={() => handleMemberDelete(index)}>-</button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <Title text="3. 기간을 설정하세요." />
          <div className="text-gray-500 text-[10px] ">
            참여자는 해당 기간 내에서 가능한 날짜를 선택하게 됩니다.
          </div>
          <button>기간 설정하기(캘린더 모달)</button>
          <div className="text-[12px] text-red-500">{validData.date}</div>
          <div>시작날짜 ~ 끝날짜</div>
        </section>

        <section>
          <Title text="4. 모임 시간을 입력하세요." />
          <input
            name="time"
            value={moimData.time}
            onChange={handleInputChange}
            placeholder="모임 시간을 입력하세요."
          />
          <div className="text-[12px] text-red-500">{validData.time}</div>
        </section>
      </section>

      <button
        onClick={handleSubmit}
        className="text-[#FFF] font-[SUIT Variable] text-[17px] font-bold flex w-full h-[53px] p-4 justify-center items-center self-stretch rounded-[8px] hover:bg-[#51B1E0] bg-[#3a8bb5]"
      >
        약속 생성하기
      </button>
    </div>
  );
}
