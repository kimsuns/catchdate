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
  return (
    <div>
      <section>
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>
          {currentMonth.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
          })}
        </div>
        <button onClick={handleNextMonth}>&gt;</button>
      </section>
    </div>
  );
}
