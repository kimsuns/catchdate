"use client";

import { useState } from "react";

import Calendar from "../components/Calendar/Calendar";
import { useModal } from "../hooks/useModal/useModal";

export default function Test() {
  const { Modal, openModal, closeModal } = useModal();
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 3);

  const [selectDates, setSelectDates] = useState<Date[]>([]);
  const handleDateSelect = (dates: Date[]) => {
    setSelectDates(dates);
  };
  return (
    <div className="w-full h-full">
      테스트 페이지
      <button onClick={openModal}>모달 오픈</button>
      <Modal>
        <div className="font-bold">날짜 선택 완료</div>
        <div>
          <span>선택 완료시 날짜를 변경할 수 없습니다.</span>
          <span>정말 선택 완료하실건가요?</span>
        </div>
      </Modal>
      {/* <div className="w-[200px]">
        <Calendar
          startDate={startDate}
          endDate={endDate}
          onDateSelect={handleDateSelect}
          size="S"
          range={true}
        />
      </div>
      <Calendar
        startDate={startDate}
        endDate={endDate}
        size="L"
        onDateSelect={handleDateSelect}
      /> */}
    </div>
  );
}
