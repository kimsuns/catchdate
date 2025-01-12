export default function TheDayCalendar({ date }) {
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-full">
        <img
          src="/images/Logo.png"
          alt="calendar background"
          className="w-full h-auto"
        />
      </div>
      <div className="absolute top-[135px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[150px] flex flex-col gap-3">
        <div className="text-lg font-semibold text-white bg-black bg-opacity-50 rounded-lg px-2 py-1 mb-2">
          {new Date(date).getMonth() + 1}월
        </div>
        <div className="w-full bg-white h-[100px] flex flex-col items-center justify-center">
          <div className="text-3xl font-bold text-black">
            {new Date(date).getDate()}
          </div>
          <div className="text-lg text-black mt-1">
            {days[new Date(date).getDay()]}
          </div>
        </div>
      </div>
    </div>
  );
}
