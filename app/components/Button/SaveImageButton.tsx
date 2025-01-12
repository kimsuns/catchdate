import html2canvas from "html2canvas";
import Button from "./Button";

export default function SaveImageButton() {
  const handleSaveImage = async () => {
    // 이미지 저장할 문서 영역
    const moimTheDayDocument = document.getElementById("moimTheDayDocument");

    if (!moimTheDayDocument) return;

    const canvas = await html2canvas(moimTheDayDocument); // 캔버스로 변환
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "catchdate-PickDay.png";
    link.click(); // 사용자가 클릭하지 않아도 다운로드 동작 실행됨
  };
  return <Button onClick={handleSaveImage}>이미지 저장하기</Button>;
}
