import Calendar from "@/app/components/Calendar/Calendar";
import { MoimMemberType } from "@/app/type/type";
import { useEffect, useState } from "react";

interface SelectDateProps {
  selectMember: MoimMemberType;
  startDate: Date | null;
  endDate: Date | null;
}

export default function SelectDate({
  selectMember,
  startDate,
  endDate,
}: SelectDateProps) {
  const [member, setMember] = useState<MoimMemberType>(selectMember);
  console.log("선택한 멤버", selectMember);

  const handleDateSelect = (dates: Date[]) => {
    setMember((prev: MoimMemberType): MoimMemberType => {
      const updateData = {
        ...prev,
        dates: dates,
      };
      return updateData;
    });
  };
  console.log("현재 멤버 상태", member);
  console.log("시작 날짜짜", typeof startDate);
  console.log("끝 날짜짜", endDate);

  return (
    <div className="flex flex-col gap-5">
      <section className="text-center">
        '
        <span className="text-[#3a8bb5] font-bold">
          {startDate ? new Date(startDate).toLocaleDateString() : "시작 날짜"} ~{" "}
          {endDate ? new Date(endDate).toLocaleDateString() : "종료 날짜"}
        </span>
        <span>' 중 하루</span>
      </section>

      <div className="">
        <span className="text-[#3a8bb5] font-bold">{member.name}</span>
        <span className="">
          님, 위 기간 중 참여 가능한 날짜를 모두 선택해주세요.
        </span>
      </div>

      <div>
        <Calendar
          startDate={startDate}
          endDate={endDate}
          onDateSelect={handleDateSelect}
          size="L"
        />
      </div>
    </div>
  );
}
