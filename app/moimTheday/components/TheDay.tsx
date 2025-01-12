import TheDayCalendar from "./TheDayCalendar";

export default function TheDay({ date, time }) {
  return (
    <div className="">
      <TheDayCalendar date={date} />
      <div>{time}</div>
    </div>
  );
}
