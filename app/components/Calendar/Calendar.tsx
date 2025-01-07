"use client";

import { useEffect, useState } from "react";

interface CalendarProps {
  startDate: Date;
  endDate: Date;
  limit?: number;
  range?: boolean;
  onDateSelect: () => void;
}

interface RangeDate {
  startRange: Date | null;
  endRange: Date | null;
}

export default function Calendar({
  startDate,
  endDate,
  range,
  onDateSelect,
}: CalendarProps) {
  const weekDays = {
    kor: ["월", "화", "수", "목", "금", "토", "일"],
    eng: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  };
  const limit = 2;
  const [currentMonth, setCurrentMonth] = useState(new Date(startDate));
  const [selectDate, setSelectDate] = useState<Date[]>([]);
  const [rangeDate, setRangeDate] = useState<RangeDate>({
    startRange: null,
    endRange: null,
  });

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

  const isRange = (date) => {
    return (
      date >= new Date(rangeDate.startRange) &&
      date <= new Date(rangeDate.endRange)
    );
  };

  const isSelectDate = (date: Date): boolean => {
    return selectDate.some(
      (item: Date) => item.toDateString() === date.toDateString()
    );
  };

  const toggleDate = (date: Date) => {
    if (!isDateInRange(date)) return;

    console.log("범위 기간", rangeDate);
    setSelectDate((prev: Date[]) => {
      const exist = isSelectDate(date);

      if (range && prev.length >= limit && !exist) {
        return prev;
      }

      setRangeDate((prev: RangeDate): RangeDate => {
        const { startRange, endRange } = prev;
        if (!range) return prev;
        if (selectDate.length >= limit) return prev;

        // 시작 없을 때때
        if (!startRange) {
          console.log("시작 없을 때 반환한다", date > new Date(endRange));
          return date > new Date(endRange)
            ? { startRange: endRange, endRange: date }
            : { ...prev, startRange: date };
        } else if (!endRange) {
          console.log("시작 있을 때 반환한다,", date < new Date(startRange));
          return date < new Date(startRange)
            ? { startRange: date, endRange: startRange }
            : { ...prev, endRange: date };
        }

        if (date.toDateString() === startRange?.toDateString()) {
          return { ...prev, startRange: null };
        } else if (date.toDateString() === endRange?.toDateString()) {
          return { ...prev, endRange: null };
        }

        return { ...prev };
      });
      // setRangeDate((prev: RangeDate): RangeDate => {
      //   const { startRange, endRange } = prev;
      //   if (!range) return prev;
      //   if (selectDate.length >= limit) return prev;

      //   if (!startRange) {
      //     console.log("시작기간 없다다");
      //     return { ...prev, startRange: date };
      //   } else {
      //     if (date <= new Date(startRange)) {
      //       console.log("시작기간 있는데 데이터가 더 작다");
      //       return { startRange: date, endRange: startRange };
      //     } else {
      //       console.log("시작기간 있는데 데이터가 더 크다다");
      //       return { ...prev, endRange: date };
      //     }
      //   }
      // });

      if (exist) {
        return prev.filter(
          (item: Date) => item.toDateString() !== date.toDateString()
        );
      } else {
        return [...prev, date];
      }
    });
  };

  useEffect(() => {
    if (range) {
      onDateSelect(rangeDate);
    } else {
      onDateSelect(selectDate);
    }
  }, [selectDate, rangeDate, onDateSelect]);

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
        isRanged: isRange(date),
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
        {weekDays.kor.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
        {calendarDays.map(({ date, isDisabled, isRanged }, index) => (
          <div
            key={index}
            className={`w-5 h-5 flex justify-center items-center border rounded  ${
              isDisabled
                ? "bg-gray-200 text-gray-400 pointer-events-none"
                : isSelectDate(date)
                ? "bg-green-500 text-white cursor-pointer"
                : "hover:bg-gray-100 cursor-pointer"
            } ${isRanged && "bg-green-500"}`}
            onClick={() => toggleDate(date)}
          >
            {date.getDate()}
          </div>
        ))}
      </section>
    </div>
  );
}
