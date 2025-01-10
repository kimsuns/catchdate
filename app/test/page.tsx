"use client";

import { useState } from "react";

import Calendar from "../components/Calendar/Calendar";
import { useModal } from "../hooks/useModal/useModal";
import { getMoimApi, testApi, updateMoimStatusApi } from "../api/api";

export default function Test() {
  const { Modal, openModal, closeModal } = useModal();
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 3);

  const [selectDates, setSelectDates] = useState<Date[]>([]);
  const handleDateSelect = (dates: Date[]) => {
    setSelectDates(dates);
  };

  const handleApi = async () => {
    try {
      // const res = await getMoimApi("6780ee62bf56c026c1d91944");
      const res = await updateMoimStatusApi("678126c9d1f6eae9c04662a4");
      // const res = await testApi();
      console.log("응답", res);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full h-full">
      테스트 페이지
      <button onClick={handleApi}>테스트api</button>
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
