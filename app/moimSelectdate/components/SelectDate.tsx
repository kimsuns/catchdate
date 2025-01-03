import { MoimMemberType } from "@/app/type/type";

export default function SelectDate({
  selectMember,
}: {
  selectMember: MoimMemberType;
}) {
  return (
    <div>
      <div>{selectMember.name}님, 날짜를 선택해주세요.</div>
      <div>캘린더</div>
    </div>
  );
}
