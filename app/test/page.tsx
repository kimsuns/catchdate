import Calendar from "../components/Calendar/Calendar";

export default function Test() {
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 3);
  return (
    <div>
      테스트 페이지
      <Calendar startDate={startDate} endDate={endDate} />
    </div>
  );
}
