import Calendar from "@/app/components/Calendar/Calendar";

interface SelectDateProps {
  selectMember: string;
  startDate: Date | null;
  endDate: Date | null;
  time: string;
  onDateSelect: (dates: Date[]) => void;
}

export default function SelectDate({
  selectMember,
  startDate,
  endDate,
  time,
  onDateSelect,
}: SelectDateProps) {
  const handleDateSelect = (dates: Date[]) => {
    onDateSelect(dates);
  };

  return (
    <div className="flex flex-col gap-5 font-black">
      <section className="text-center">
        &apos;
        <span className="text-[#3a8bb5] font-bold">
          {startDate ? new Date(startDate).toLocaleDateString() : "시작 날짜"} ~{" "}
          {endDate ? new Date(endDate).toLocaleDateString() : "종료 날짜"}
        </span>
        <span>&apos;일 중,</span>
        <div>
          <span className="text-[#3a8bb5] font-bold">{time}</span>
          <span>에 모일 예정입니다.</span>
        </div>
      </section>

      <div className="">
        <span className="text-[#3a8bb5] font-bold">{selectMember}</span>
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
