import Button from "./Button";
import { toPng } from "html-to-image";

export default function SaveImageButton() {
  const handleSaveImage = async () => {
    const element = document.getElementById(
      "moimTheDayDocument"
    ) as HTMLElement;

    if (!element) return;

    // 스크롤 위치를 최상단으로 설정
    element.scrollTop = 0;

    // 요소 전체 크기를 계산
    const width = element.scrollWidth;
    const height = element.scrollHeight;

    try {
      // PNG 이미지 생성
      const dataUrl = await toPng(element, {
        width,
        height,
        style: {
          transform: "none",
          transformOrigin: "top left",
          overflow: "visible",
        },
        cacheBust: true, //캐시 무효화
      });

      // 이미지 다운로드
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "CatchDate-PickDay.png";
      link.click();
    } catch (error) {
      console.error("이미지 저장에 실패했습니다.", error);
    }
  };
  return <Button onClick={handleSaveImage}>이미지 저장</Button>;
}
