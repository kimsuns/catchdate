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
    <div className="w-full h-full flex flex-col gap-7">
      <BorderBox title={"모든 멤버가 pick한 날짜"}>
        <TheDayCalendar date={data.date} />
        <div className="text-center text-[#3a8bb5] font-bold mt-2">{time}</div>
      </BorderBox>
      <div className="relative p-4 border border-gray-300 rounded-lg bg-white shadow-md">
        <div className="absolute -top-3 left-20 transform -translate-x-1/2 bg-white px-2 text-[12px] font-semibold text-gray-700">
          {isAllPick ? "모든 멤버가 Pick한 날짜" : "많은 멤버가 Pick한 날짜"}
        </div>
        <TheDayCalendar date={data.date} />
        <div className="text-center text-[#3a8bb5] font-bold mt-2">{time}</div>
      </div>
      <div className="relative p-4 border border-gray-300 rounded-lg bg-white shadow-md">
        <div className="absolute -top-3 left-1/4 transform -translate-x-1/2 bg-white px-2 text-sm font-semibold text-gray-700">
          참여 멤버
        </div>
        <div className="flex gap-2 font-bold">
          {data.members.map((item, index) => (
            <div key={index} className="">
              <span className="text-[#3a8bb5]">{item}</span>
              {index !== data.members.length - 1 && ","}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
