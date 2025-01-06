"use client";

import { useState } from "react";

export default function Calendar() {
  const startDate = new Date();
  const endDate = new Date(2025 - 3 - 15);
  const [currentMonth, setCurrentMonth] = useState(new Date(startDate));

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
    );
  };

  const handleCalendar = () => {
    const firstDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );

    const lastDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );

    const daysInMonth = lastDay.getDate(); // 이번달 총 날짜 수
    const firstWeekday = firstDay.getDay(); // 이번달 첫 번째 날의 요일

    const calendarDays = [];

    // 이전 달 날짜 계산
    for (let i = 0; i < firstWeekday; i++) {
      calendarDays.push({
        date: new Date(firstDay.setDate(firstDay.getDate() - 1)),
        isDisabled: true, // 클릭 불가능
      });
    }

    // 이번 달 날짜 계산
    for (let i = 0; i < daysInMonth; i++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        i
      );
      calendarDays.push({
        date,
        isDisabled: false,
      });
    }

    // 다음 달 날짜 계산
    const remainingDays = 42 - calendarDays.length; // 총 6주(42칸)을 채우기 위한 나머지 날짜
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({
        date: new Date(lastDay.setDate(lastDay.getDate() + 1)),
        isDisabled: true,
      });
    }

    return calendarDays;
  };
  const calendarDays = handleCalendar();

  return (
    <div className="p-4 w-full max-w-md mx-auto">
      <section className="flex justify-between items-center mb-4">
        <button
          className="text-gray-600 hover:text-black"
          onClick={handlePrevMonth}
        >
          &lt;
        </button>
        <div className="text-lg font-bold">
          {currentMonth.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
          })}
        </div>
        <button
          className="text-gray-600 hover:text-black"
          onClick={handleNextMonth}
        >
          &gt;
        </button>
      </section>
      <section className="grid grid-cols-7 gap-2">
        {calendarDays.map(({ date, isDisabled }, index) => (
          <div
            key={index}
            className={`w-5 h-5 flex justify-center items-center border rounded  ${
              isDisabled
                ? "bg-gray-200 text-gray-400 pointer-events-none"
                : "hover:bg-gray-100"
            }`}
          >
            {date.getDate()}
          </div>
        ))}
      </section>
    </div>
  );
}
