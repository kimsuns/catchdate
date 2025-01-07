"use client";

import { useState } from "react";
import Calendar from "../components/Calendar/Calendar";

export default function Test() {
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 3);

  const [selectDates, setSelectDates] = useState([]);
  const handleDateSelect = (dates) => {
    setSelectDates(dates);
  };
  return (
    <div>
      테스트 페이지
      <div className="w-[200px]">
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
      />
    </div>
  );
}
