import { useState } from "react";
import NameTable from "./NameTable";
import { MoimMemberType } from "@/app/type/type";
import Button from "@/app/components/Button/Button";
import { useRouter } from "next/router";

interface SelectNameProps {
  member: MoimMemberType[];
  isSelectAll: boolean;
  // onSelectMember: () => void;
  onSelectMember: (value: MoimMemberType) => void;
  onSelectAll: () => void;
  selectName: string;
}

export default function SelectName({
  member,
  isSelectAll,
  onSelectMember,
  onSelectAll,
  selectName,
}: SelectNameProps) {
  const handleClickName = (item: MoimMemberType): void => {
    onSelectMember(item);
  };

  console.log("멤버 정보", member);

  return (
    <div className="flex flex-col gap-10 items-center">
      <div className="text-center">
        {isSelectAll ? (
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
        {!isSelectAll && selectName && (
          <div className="flex items-center justify-center">
            <div className="text-[#3a8bb5] font-bold">{selectName}</div>
            님을 선택하셨습니다.
          </div>
        )}
        {isSelectAll && (
          <Button onClick={onSelectAll}>날짜 확인하러 가기</Button>
        )}
      </div>
    </div>
  );
}
