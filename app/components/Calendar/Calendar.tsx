"use client";

import { useEffect, useState } from "react";

interface CalendarProps {
  startDate: Date;
  endDate: Date;
  limit?: number;
  range?: boolean;
  size?: "S" | "M" | "L";
  onDateSelect: (selectDate: Date[]) => void;
}

interface RangeDate {
  startRange: Date | null;
  endRange: Date | null;
}

export default function Calendar({
  startDate,
  endDate,
  range,
  size = "M",
  onDateSelect,
}: CalendarProps) {
  const weekDays = {
    kor: ["월", "화", "수", "목", "금", "토", "일"],
    eng: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  };
  const limit = 2;
  const sizeStyles = {
    S: {
      container: "w-[150px] max-w-[150px] p-1",
      fontSize: "text-xs mb-1",
      daySize: "w-4 h-4 text-xs",
    },
    M: {
      container: "w-[200px] p-4",
      fontSize: "text-base mb-4",
      daySize: "w-5 h-5 text-sm",
    },
    L: {
      container: "w-full p-4",
      fontSize: "text-lg mb-4",
      daySize: "w-6 h-6 text-base",
    },
  };

  const style = sizeStyles[size];
  const [currentMonth, setCurrentMonth] = useState(new Date(startDate));
  const [selectDate, setSelectDate] = useState<Date[]>([]);
  const [rangeDate, setRangeDate] = useState<RangeDate>({
    startRange: null,
    endRange: null,
  });

  const handlePrevMonth = () => {
    if (currentMonth.getMonth() > startDate.getMonth()) {
      setCurrentMonth(
        new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
      );
    }
  };

  const handleNextMonth = () => {
    if (currentMonth.getMonth() < endDate.getMonth()) {
      setCurrentMonth(
        new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
      );
    }
  };

  const isDateInRange = (date: Date): boolean => {
    return date >= new Date(startDate) && date <= new Date(endDate);
  };

  const isRange = (date: Date): boolean => {
    const { startRange, endRange } = rangeDate;
    if (!startRange || !endRange) {
      return false;
    }
    return date >= new Date(startRange) && date <= new Date(endRange);
  };

  const isSelectDate = (date: Date): boolean => {
    return selectDate.some(
      (item: Date) => item.toDateString() === date.toDateString()
    );
  };

  const handleRange = (date: Date) => {
    setRangeDate((prev: RangeDate): RangeDate => {
      const { startRange, endRange } = prev;
      // if (!range) return prev;
      // if (selectDate.length >= limit) return prev;
      console.log("기간 캘린더다", rangeDate);

      if (!startRange && !endRange) {
        // 시작 x, 끝 x
        return { ...prev, startRange: date };
      } else if (!startRange && endRange) {
        // 시작 x, 끝 o
        if (date.toDateString() !== endRange.toDateString()) {
          // 데이터 !== 끝 데이터
          if (date < new Date(endRange)) {
            return { ...prev, startRange: date };
          } else {
            return { startRange: endRange, endRange: date };
          }
        } else {
          // 데이터 === 끝 데이터
          return { ...prev, endRange: null };
        }
      } else if (startRange && !endRange) {
        // 시작 o , 끝 x
        if (date.toDateString() !== startRange.toDateString()) {
          // 데이터 !== 시작 데이터
          if (date > new Date(startRange)) {
            return { ...prev, endRange: date };
          } else {
            return { endRange: startRange, startRange: date };
          }
        } else {
          // 데이터 === 시작 데이터
          return { ...prev, startRange: null };
        }
      } else if (startRange && endRange) {
        // 시작 o, 끝 o
        if (date.toDateString() === startRange.toDateString()) {
          // 데이터 === 시작 데이터
          return { ...prev, startRange: null };
        } else if (date.toDateString() === endRange.toDateString()) {
          // 데이터 === 끝 데이터
          return { ...prev, endRange: null };
        } else {
          //  데이터 !== 시작, 끝
        }
      }
      return { ...prev };
    });
  };

  const toggleDate = (date: Date) => {
    if (!isDateInRange(date)) return;

    setSelectDate((prev: Date[]) => {
      const exist = isSelectDate(date);

      if (range && prev.length >= limit && !exist) {
        return prev;
      }

      if (range) {
        handleRange(date);
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

  useEffect(() => {
    onDateSelect(selectDate);
  }, [selectDate]);

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
    <div className={`max-w-md mx-auto ${style.container}`}>
      <section
        className={`flex justify-between items-center ${style.fontSize}`}
      >
        <button
          className="text-gray-600 hover:text-black"
          onClick={handlePrevMonth}
        >
          &lt;
        </button>
        <div className="font-bold">
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

      <section
        className={`grid grid-cols-7 gap-x-2 gap-y-1 w-full h-full ${style.daySize}`}
      >
        {weekDays.kor.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
        {calendarDays.map(({ date, isDisabled, isRanged }, index) => (
          <div
            key={index}
            className={`flex justify-center items-center border rounded ${
              style.daySize
            }  ${
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
