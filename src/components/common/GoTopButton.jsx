import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const TopButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 20;
  width: 44px;
  height: 44px;
  opacity: ${({ showButton }) => (showButton ? 1 : 0)};
  pointer-events: ${({ showButton }) => (showButton ? "auto" : "none")};
  transform: translateY(${({ showButton }) => (showButton ? "0" : "20px")});
  transition:
    opacity 0.6s ease-in-out,
    transform 0.6s ease-in-out;

  ${({ theme }) => theme.media.tablet} {
    bottom: 16px;
    right: 16px;
  }
  ${({ theme }) => theme.media.mobile} {
    bottom: 12px;
    right: 12px;
  }
`;

export default function GoTopButton() {
  const [showButton, setShowButton] = useState(false); // 버튼이 보이는 상태값

  //일정량 스크롤 내릴시 버튼이 보이기
  useEffect(() => {
    const handleShowButton = () => {
      //페이지의 전체 높이
      const scrollHeight = document.documentElement.scrollHeight;
      //현재 화면의 높이
      const innerHeight = window.innerHeight;
      //실제 스크롤이 가능한 최대 거리
      //스크롤을 끝까지 내리면 페이지 맨 윗부분은 현재 화면 높이에서 멈춤
      //따라서 현재 화면의 높이만큼 빼준게 최대 스크롤 가능 거리
      const maxScroll = scrollHeight - innerHeight;

      //스크롤 위치 % 계산
      const scrollPercent = (window.scrollY / maxScroll) * 100;

      //스크롤을 50% 이상 밑으로 하면 버튼 보이기
      if (scrollPercent > 50) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleShowButton);
    return () => window.removeEventListener("scroll", handleShowButton);
  }, []);

  //버튼 클릭시 최상단으로 이동
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <TopButton type="button" showButton={showButton} onClick={scrollToTop}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#222020"
        strokeWidth="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-chevrons-up-icon lucide-chevrons-up"
      >
        <path d="m17 11-5-5-5 5" />
        <path d="m17 18-5-5-5 5" />
      </svg>
    </TopButton>
  );
}
