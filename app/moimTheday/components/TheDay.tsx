import { MoimPickDateType } from "@/app/type/type";
import TheDayCalendar from "./TheDayCalendar";
import BorderBox from "./BorderBox";

interface TheDay {
  data: MoimPickDateType;
  time: string;
  noJoin?: string[];
}
export default function TheDay({ data, time, noJoin = undefined }: TheDay) {
  console.log("불참멤버", noJoin);
  return (
    <div className=" w-full flex flex-col gap-7">
      <BorderBox title={"Pick 날짜"}>
        <TheDayCalendar date={data.date} time={time} />
      </BorderBox>

      <BorderBox
        title={!noJoin ? "참여 멤버" : `참여 멤버 (${data.members.length})`}
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

      {noJoin && (
        <BorderBox title={`불참 멤버 (${noJoin.length})`}>
          <div className="grid grid-cols-5 text-[12px]">
            {noJoin.map((item, index) => (
              <div key={index} className="">
                <span className="text-[#3a8bb5]">{item}</span>
                {index !== data.members.length - 1 && ","}
              </div>
            ))}
          </div>
        </BorderBox>
      )}

      <div className="text-[12px] text-center text-gray-500">
        {!noJoin ? (
          "전원 참석 가능! 🥳"
        ) : (
          <div className="flex flex-col">
            <span>아쉽지만 모두 가능한 날짜가 없어요! 😨😭</span>
            <span>대신 많은 멤버가 Pick한 날짜를 알려드려요!</span>
          </div>
        )}
      </div>
    </div>
  );
}
