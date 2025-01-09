import { useState } from "react";
import NameTable from "./NameTable";
import { MoimMemberType } from "@/app/type/type";

interface SelectNameProps {
  member: MoimMemberType[];
  onSelectAll: boolean;
  // onSelectMember: () => void;
  onSelectMember: (value: MoimMemberType) => void;
  selectName: string;
}

export default function SelectName({
  member,
  onSelectAll,
  onSelectMember,
  selectName,
}: SelectNameProps) {
  const handleClickName = (item: MoimMemberType): void => {
    onSelectMember(item);
  };

  console.log("멤버 정보", member);

  return (
    <div className="flex flex-col gap-10 items-center">
      <div className="text-center">
        {onSelectAll
          ? "모두 선택하였습니다. 날짜를 확인하세요."
          : "이름을 선택하세요."}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {Array.isArray(member) &&
          member.map((item) => (
            <div key={item.memberId} className="flex gap-[2px]">
              <button onClick={() => handleClickName(item)}>
                <div className="flex gap-1">
                  {item.choose ? (
                    <img src="check-completed.svg" alt="선택 완료된 이름" />
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
        {selectName && (
          <div className="flex items-center justify-center">
            <div className="text-[#3a8bb5]">{selectName}</div>
            님을 선택하셨습니다
          </div>
        )}
        {onSelectAll && <button>날짜 확인하기</button>}
      </div>
    </div>
  );
}
