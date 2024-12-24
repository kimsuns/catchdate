export default function MoimCreate() {
  return (
    <div className="flex flex-col items-center">
      <section className="text-black font-suit text-[28px] font-semibold leading-none">
        약속 생성하기
      </section>
      <section className="flex flex-col p-6 justify-center  gap-10 self-stretch mt-6 mb-6 rounded-[2px] bg-[#F6F5F2]">
        <div>
          <span className="text-black font-suit text-[17px] font-bold leading-[29px]">
            1. 약속명을 입력하세요.
          </span>
          <input placeholder="약속 이름을 입력하세요." />
        </div>
        <div>
          <span className="text-black font-suit text-[17px] font-bold leading-[29px]">
            2. 참여자를 입력하세요. (최대 10명)
          </span>
          <input placeholder="참여자 이름을 입력하세요." />
          <button>추가</button>
          <div>
            선영이, 초딩이, 다혜이, 지훈이, 승환이, 갑호이, 현켠이, 예원이,
            친구이, 친구삼
          </div>
        </div>
        <div>
          <span className="text-black font-suit text-[17px] font-bold leading-[29px]">
            3. 기간을 설정하세요.
          </span>
          <div className="text-gray-500 text-[10px] ">
            참여자는 해당 기간 내에서 가능한 날짜를 선택하게 됩니다.
          </div>
          <button>기간 설정하기(캘린더 모달)</button>
          <div>시작날짜 ~ 끝날짜</div>
        </div>
        <div>
          <span className="text-black font-suit text-[17px] font-bold leading-[29px]">
            4. 약속 시간을 입력하세요
          </span>
          <input />
        </div>
      </section>
      <button className="text-[#FFF] font-[SUIT Variable] text-[17px] font-bold flex w-full h-[53px] p-4 justify-center items-center self-stretch rounded-[8px] hover:bg-[#51B1E0] bg-gray-300">
        약속 생성하기
      </button>
    </div>
  );
}
