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

  return (
    <div className="flex flex-col gap-2">
      <div className="text-center">
        {onSelectAll
          ? "모두 선택하였습니다. 날짜를 확인하세요."
          : "이름을 선택하세요."}
      </div>
      <div className="grid grid-cols-2 gap-2 place-items-center">
        {Array.isArray(member) &&
          member.map((item) => (
            <div key={item.memberId} className="flex gap-[2px]">
              <button onClick={() => handleClickName(item)}>
                v{item.name}
              </button>
            </div>
          ))}
      </div>
      <div>
        {selectName && `${selectName}님을 선택하셨습니다.`}
        {onSelectAll && <button>날짜 확인하기</button>}
      </div>
    </div>
  );
}
