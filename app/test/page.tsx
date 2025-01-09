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
    <div>
      테스트 페이지
      <Modal>아dkdkdkdkdkdkk아</Modal>
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
