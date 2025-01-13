"use client";

import Button from "./Button";

export default function KakaoShareButton({ title }: { title: string }) {
  const handleShearToKakao = () => {
    const { Kakao, location } = window;

    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "캐치데이트로 모임 날짜 잡자!",
        description: `${title}모임 날짜 잡으러 가기!`,
        imageUrl: "",
        imageWidth: 100,
        imageHeight: 100,

        link: {
          mobileWebUrl: location.href,
          webUrl: location.href,
        },
      },
      buttons: [
        {
          title: "캐치데이트 바로가기",
          link: {
            mobileWebUrl: location.href,
            webUrl: location.href,
          },
        },
      ],
    });
  };

  return (
    <Button
      onClick={handleShearToKakao}
      className="bg-[#D4C200] text-white hover:bg-[#FFEB00] hover:text-black"
    >
      <img
        src="/images/kakaoIcon.png"
        alt="카카오 공유하기"
        className="w-6 h-6"
      />
      공유하기
    </Button>
  );
}
