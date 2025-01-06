"use client";

import { useState } from "react";

interface CalendarProps {
  startDate: Date;
  endDate: Date;
  limit?: number;
}

export default function Calendar({ startDate, endDate, limit }: CalendarProps) {
  const weekDays = {
    kor: ["월", "화", "수", "목", "금", "토", "일"],
    eng: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  };
  const [currentMonth, setCurrentMonth] = useState(new Date(startDate));
  const [selectDate, setSelectDate] = useState<Date[]>([]);

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

  const isDateInRange = (date: Date): boolean => {
    return date >= new Date(startDate) && date <= new Date(endDate);
  };

  const isSelectDate = (date: Date): boolean => {
    return selectDate.some(
      (item: Date) => item.toDateString() === date.toDateString()
    );
  };

  const toggleDate = (date: Date) => {
    if (!isDateInRange(date)) return;

    setSelectDate((prev: Date[]) => {
      const exist = isSelectDate(date);
      if (limit && prev.length >= limit && !exist) {
        return prev;
      }

      if (exist) {
        return prev.filter(
          (item: Date) => item.toDateString() !== date.toDateString()
        );
      } else {
        return [...prev, date];
      }
    });
  };

  const baseCalendar = () => {
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
        isDisabled: !isDateInRange(date),
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
  const calendarDays = baseCalendar();

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
                : isSelectDate(date)
                ? "bg-green-500 text-white"
                : "hover:bg-gray-100"
            }`}
            onClick={() => toggleDate(date)}
          >
            {date.getDate()}
          </div>
        ))}
      </section>
    </div>
  );
}
