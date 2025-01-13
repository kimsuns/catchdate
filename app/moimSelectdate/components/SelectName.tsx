import { useState } from "react";
import NameTable from "./NameTable";
import { MoimMemberType } from "@/app/type/type";
import Button from "@/app/components/Button/Button";
import { useRouter } from "next/router";

interface SelectNameProps {
  member: MoimMemberType[];
  status: "ready" | "completed";
  onSelectMember: (value: MoimMemberType) => void;
  onSelectAll: () => void;
  selectName: string;
}

export default function SelectName({
  member,
  status,
  onSelectMember,
  onSelectAll,
  selectName,
}: SelectNameProps) {
  const handleClickName = (item: MoimMemberType): void => {
    onSelectMember(item);
  };

  console.log("멤버 정보", member);
  console.log("상태 정보", status);

  return (
    <div className="flex flex-col gap-10 items-center font-black">
      <div className="text-center">
        {status === "completed" ? (
          <div className="flex flex-col">
            <span>모두 선택하였습니다.</span>
            <span>날짜를 확인하세요.</span>
          </div>
        ) : (
          "이름을 선택하세요."
        )}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {Array.isArray(member) &&
          member.map((item) => (
            <div key={item.memberId} className="flex gap-[2px]">
              <button
                onClick={() => handleClickName(item)}
                disabled={item.choose}
              >
                <div className="flex gap-1">
                  {item.choose ? (
                    <img
                      src="check-completed.svg"
                      alt="선택 완료된 이름"
                      className="w-[20px] h-[20px] "
                    />
                  ) : (
                    <img
                      src={
                        item.name === selectName
                          ? "check.svg"
                          : "/images/check-before.png"
                      }
                      alt={`${item.name}이름 선택`}
                      className="w-[20px] h-[20px]"
                    />
                  )}
                  {item.name}
                </div>
              </button>
            </div>
          ))}
      </div>
      <div className="text-center">
        {status === "ready" && selectName && (
          <div className="flex items-center justify-center">
            <div className="text-[#3a8bb5] font-bold">{selectName}</div>
            님을 선택하셨습니다.
          </div>
        )}
        {status === "completed" && (
          <Button onClick={onSelectAll}>날짜 확인하러 가기</Button>
        )}
      </div>
    </div>
  );
}
