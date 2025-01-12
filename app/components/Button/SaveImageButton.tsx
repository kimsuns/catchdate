import Button from "./Button";
import { toPng } from "html-to-image";

export default function SaveImageButton() {
  const handleSaveImage = async () => {
    const element = document.getElementById(
      "moimTheDayDocument"
    ) as HTMLElement;

    if (!element) return;

    const width = element.scrollWidth;
    const height = element.scrollHeight;

    try {
      // 요소 전체 크기를 계산

      // PNG 이미지 생성
      const dataUrl = await toPng(element, {
        width,
        height,
        style: {
          transform: "scale(1)", // 요소 크기를 조정하지 않음
          transformOrigin: "top left",
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

    // // 이미지 저장할 문서 영역
    // const moimTheDayDocument = document.getElementById("moimTheDayDocument");

    // if (!moimTheDayDocument) return;

    // // 모든 콘텐츠가 보이도록 스크롤
    // // moimTheDayDocument.scrollIntoView({ behavior: "auto", block: "start" });

    // // 요소의 원래 크기 가져오기
    // // const originalStyle = {
    // //   width: moimTheDayDocument.style.width,
    // //   height: moimTheDayDocument.style.height,
    // // };

    // // 요소를 확장하여 모든 콘텐츠 포함
    // // moimTheDayDocument.style.width = `${moimTheDayDocument.scrollWidth}px`;
    // // moimTheDayDocument.style.height = `${moimTheDayDocument.scrollHeight}px`;

    // // 캔버스 생성
    // const canvas = await html2canvas(moimTheDayDocument, {
    //   useCORS: true, // 외부 리소스 문제 해결 (필요시)
    //   scale: 2, // 고해상도로 캡처처
    // });

    // // 스타일 복원
    // // moimTheDayDocument.style.width = originalStyle.width;
    // // moimTheDayDocument.style.height = originalStyle.height;

    // // 이미지 다운로드
    // const link = document.createElement("a");
    // link.href = canvas.toDataURL("image/png");
    // link.download = "catchdate-PickDay.png";
    // link.click(); // 사용자가 클릭하지 않아도 다운로드 동작 실행됨
  };
  return <Button onClick={handleSaveImage}>이미지 저장</Button>;
}
