import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[30px] font-bold">캐치데이트</span>
      <span>by. 모임 날짜 정하기</span>
      <section className="flex flex-col items-center">
        <img src="/images/Logo.png" alt="Logo" />
        <span className="text-gray-500">
          모임 인원이 가능한 날짜 한 번에 고르기!
        </span>
      </section>
      {/* 클릭시 약속 생성하기 페이지로 이동 */}
      <section className="flex  mt-[24px] w-full">
        <button className="text-[#FFF] font-[SUIT Variable] text-[17px] font-bold flex w-full h-[53px] p-4 justify-center items-center self-stretch rounded-[8px] hover:bg-[#51B1E0] bg-[#3a8bb5]">
          <Link href={"/moimCreate"}>모임 날짜 잡기</Link>
        </button>
      </section>
    </div>
  );
}
