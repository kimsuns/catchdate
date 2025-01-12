import { MoimPickDateType } from "@/app/type/type";
import TheDayCalendar from "./TheDayCalendar";
import BorderBox from "./BorderBox";

interface TheDay {
  data: MoimPickDateType;
  time: string;
  isAllPick: boolean;
}
export default function TheDay({ data, time, isAllPick }: TheDay) {
  return (
    <div className=" w-full h-full flex flex-col gap-7">
      <BorderBox title={"Pick 날짜"}>
        <TheDayCalendar date={data.date} time={time} />
        {/* <div className="text-center text-[#3a8bb5] font-bold mt-2">{time}</div> */}
      </BorderBox>

      <BorderBox
        title={isAllPick ? "참여 멤버" : `참여 멤버 (${data.members.length})`}
      >
        <div className="grid grid-cols-5 text-[12px]">
          {data.members.map((item, index) => (
            <div key={index} className="">
              <span className="text-[#3a8bb5]">{item}</span>
              {index !== data.members.length - 1 && ","}
            </div>
          ))}
        </div>
      </BorderBox>

      {!isAllPick && <BorderBox title="불참 멤버">아아</BorderBox>}

      <div className="text-[12px] text-center text-gray-500">
        {isAllPick ? "전원 참석 가능! 🥳" : "전원 참석 가능 날짜 다시 잡기"}
      </div>
    </div>
  );
}
