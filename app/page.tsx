import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-full text-black">
      <header className="relative flex flex-col text-black font-suit w-full items-center justify-center h-[100px] font-semibold leading-none">
        <span className="text-[30px] font-bold">캐치데이트</span>
        <span>by. 모임 날짜 정하기</span>
      </header>
      <main className="flex-1 overflow-y-auto flex flex-col gap-5 self-stretch mt-6 mb-6 rounded-[2px] scrollbar-gutter-stable no-scrollbar">
        <img src="/images/Logo.png" alt="Logo" />
        <span className="text-center text-gray-500">
          모두가 가능한 모임 날짜 Pick 하기!
        </span>
      </main>
      {/* 클릭시 약속 생성하기 페이지로 이동 */}
      <footer className="flex w-full">
        <button className="text-[#FFF] font-[SUIT Variable] text-[17px] font-bold flex w-full h-[53px] p-4 justify-center items-center self-stretch rounded-[8px] hover:bg-[#51B1E0] bg-[#3a8bb5]">
          <Link href={"/moimCreate"}>모임 날짜 잡기</Link>
        </button>
      </footer>
    </div>
  );
}
