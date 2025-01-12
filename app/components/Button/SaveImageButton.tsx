import html2canvas from "html2canvas";
import Button from "./Button";

export default function SaveImageButton() {
  const handleSaveImage = async () => {
    // 이미지 저장할 문서 영역
    const moimTheDayDocument = document.getElementById("moimTheDayDocument");

    if (!moimTheDayDocument) return;

    // 모든 콘텐츠가 보이도록 스크롤
    // moimTheDayDocument.scrollIntoView({ behavior: "auto", block: "start" });

    // 요소의 원래 크기 가져오기
    // const originalStyle = {
    //   width: moimTheDayDocument.style.width,
    //   height: moimTheDayDocument.style.height,
    // };

    // 요소를 확장하여 모든 콘텐츠 포함
    // moimTheDayDocument.style.width = `${moimTheDayDocument.scrollWidth}px`;
    // moimTheDayDocument.style.height = `${moimTheDayDocument.scrollHeight}px`;

    // 캔버스 생성
    const canvas = await html2canvas(moimTheDayDocument, {
      useCORS: true, // 외부 리소스 문제 해결 (필요시)
      scale: 2, // 고해상도로 캡처처
    });

    // 스타일 복원
    // moimTheDayDocument.style.width = originalStyle.width;
    // moimTheDayDocument.style.height = originalStyle.height;

    // 이미지 다운로드
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "catchdate-PickDay.png";
    link.click(); // 사용자가 클릭하지 않아도 다운로드 동작 실행됨
  };
  return <Button onClick={handleSaveImage}>이미지 저장</Button>;
}
