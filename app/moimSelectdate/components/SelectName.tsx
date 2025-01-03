import NameTable from "./NameTable";

export default function SelectName({ member }) {
  console.log("현재 멤버", member);
  const onSelectAll = false;

  const handleClickName = (item) => {
    console.log("클릭한 이름", item);
  };

  return (
    <section className="flex flex-col  items-center p-6 justify-center  gap-12 self-stretch mt-6 mb-6 rounded-[2px] bg-[#F6F5F2]">
      <div>
        {onSelectAll
          ? "모두 선택하였습니다. 날짜를 확인하세요."
          : "이름을 선택하세요."}
      </div>
      <div>
        {member.map((item) => (
          <div key={item.id}>
            <button onClick={() => handleClickName(item)}>v{item.name}</button>
          </div>
        ))}
      </div>

      {onSelectAll ? (
        <button>날짜 확인하기</button>
      ) : (
        <div>ㅇㅇ님을 선택하셨습니다.</div>
      )}
    </section>
  );
}
