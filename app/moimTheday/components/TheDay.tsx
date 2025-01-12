export default function TheDay({ date, member }) {
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div>
      <div>{new Date(date).toLocaleDateString()}</div>
      <div>{new Date(date).getMonth() + 1}</div>
      <div>{new Date(date).getDate()}</div>
      <div>{days[new Date(date).getDay()]}</div>
    </div>
  );
}
