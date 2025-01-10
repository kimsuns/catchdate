"use client";

import { Suspense, useEffect, useState } from "react";
import { getMoimApi, updateMoimApi } from "../api/api";
import { useSearchParams } from "next/navigation";
import SelectDate from "./components/SelectDate";
import SelectName from "./components/SelectName";
import { MoimMemberType } from "../type/type";
import Button from "../components/Button/Button";
import { useModal } from "../hooks/useModal/useModal";
import { useRouter } from "next/navigation";

// 676d1181eb17bca63e11c0e5

// 내용 꽉 찬 예시시
// 6777f0c59fe275be55856418

// 날짜 생성
// 677df17429403c63c51d695b
// 677fb091ffadeb5ea00dd220
// 677fe1f73041b3f32072b966

export default function MoimSelectDate() {
  const [moimData, setMoimData] = useState({
    _id: "",
    title: "",
    status: "",
    members: [],
    startDate: null,
    endDate: null,
    time: "",
    pickDate: [],
    top3: [],
  });
  const [onEditDate, setOnEditDate] = useState(false);
  const [onSelectAll, setOnSelectAll] = useState(true);
  const [selectMember, setSelectMember] = useState<MoimMemberType>({
    memberId: "",
    name: "",
    dates: [],
    choose: false,
  });
  const [queryId, setQueryId] = useState<string | null>(null);
  const { Modal, openModal, closeModal } = useModal();
  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    setQueryId(id);
  }, []);

  const getMoimData = async () => {
    try {
      const res = await getMoimApi(queryId as string);
      setMoimData(res);
    } catch (error) {
      console.error("모임 데이터를 가져오지 못 했습니다.", error);
    }
  };

  useEffect(() => {
    if (!queryId) return;
    getMoimData();
  }, [queryId]);

  const onSelectMember = (value: MoimMemberType): void => {
    setSelectMember(value);
  };

  const onSelectName = () => {
    if (selectMember.name === "") {
      console.log("이름 선택해주세요");
    } else {
      setOnEditDate(true);
    }
  };

  const onSelectMemberDate = (dates: Date[]) => {
    setSelectMember((prev) => {
      const updateData = {
        ...prev,
        dates: dates,
        choose: true,
      };
      return updateData;
    });
  };

  const onUpdateMoim = async () => {
    try {
      const res = await updateMoimApi(queryId as string, selectMember);
      if (res?.status === 200) {
        getMoimData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onConfirmMemberDate = () => {
    setOnEditDate(false);
    onUpdateMoim();
    closeModal();
    setSelectMember({
      memberId: "",
      name: "",
      dates: [],
      choose: false,
    });
  };

  const handleMoveMoimTheDayPage = () => {
    console.log("날짜 확인 가즈아");
    router.push(`/moimTheday?id=${queryId}`);
  };

  return (
    <div className="relative flex flex-col items-center h-full">
      <header className="text-black font-suit text-[28px] font-semibold leading-none">
        모임 날짜 잡기
      </header>
      <main className="flex-1 overflow-y-auto flex-col  items-center p-6 justify-center self-stretch mt-6 mb-6 rounded-[2px] bg-[#F6F5F2] scrollbar-gutter-stable no-scrollbar">
        <div className="font-bold text-[18px] text-center uppercase mb-4">
          {moimData.title === "" ? (
            "모임명"
          ) : (
            <div className="">
              {/* <div className="">모임</div> */}
              <span className="text-[#3a8bb5]">{moimData.title}</span>
            </div>
          )}
        </div>

        {onEditDate ? (
          <SelectDate
            selectMember={selectMember.name}
            startDate={moimData.startDate}
            endDate={moimData.endDate}
            time={moimData.time}
            onDateSelect={onSelectMemberDate}
          />
        ) : (
          <SelectName
            member={moimData.members}
            isSelectAll={true}
            // isSelectAll={onSelectAll}
            onSelectAll={handleMoveMoimTheDayPage}
            onSelectMember={onSelectMember}
            selectName={selectMember.name}
          />
        )}
      </main>
      <Modal>
        <div className="flex flex-col gap-2">
          <div className="text-[18px] font-bold">📆 날짜 선택 완료!</div>
          <div className="flex flex-col text-[15px] gap-2">
            {selectMember.dates.length >= 1 ? (
              <div>총 {selectMember.dates.length}개의 날짜 선택 완료 🥳🥳</div>
            ) : (
              <div>
                <div>가능한 날짜가 없으신가요?😨😭</div>
                <div>아무 날짜도 선택하지 않으셨습니다.</div>
              </div>
            )}
            <div>정말 선택 완료하실건가요?</div>
            <div className="text-[11px] text-red-500">
              선택 완료시 더이상 날짜를 선택할 수 없습니다.
            </div>
          </div>
          <div className="flex gap-5">
            <button
              onClick={onConfirmMemberDate}
              className="text-[#FFF] font-[SUIT Variable] text-[17px] font-bold flex w-full h-[45px] p-4 justify-center items-center self-stretch rounded-[8px] hover:bg-[#51B1E0] bg-[#3a8bb5]"
            >
              확인
            </button>
            <button
              onClick={closeModal}
              className="text-[#FFF] font-[SUIT Variable] text-[17px] font-bold flex w-full h-[45px] p-4 justify-center items-center self-stretch rounded-[8px] hover:bg-[#51B1E0] bg-[#3a8bb5]"
            >
              취소
            </button>
          </div>
        </div>
      </Modal>

      <footer className="flex w-full">
        {onEditDate ? (
          // <Button onClick={onConfirmMemberDate}>선택 완료</Button>
          <div className="flex flex-col gap-2 w-full items-center justify-center">
            <Button onClick={openModal}>선택 완료</Button>
            <button
              onClick={() => setOnEditDate(false)}
              className="text-[12px] text-center text-gray-500 underline"
            >
              이름을 다시 선택할래요!
            </button>
          </div>
        ) : (
          <div className="flex w-full gap-5">
            <Button onClick={onSelectName}>선택하기</Button>
            <Button onClick={() => {}}>공유하기</Button>
          </div>
        )}
      </footer>
    </div>
  );
}
