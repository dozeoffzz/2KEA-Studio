import styled from "@emotion/styled";
import topImage from "../../assets/imgs/main/top-image.webp";
import { useState } from "react";

const TopContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
`;

const TopImage = styled.img`
  width: 100%;
  height: 968px;
  transform: scale(${({ isLoaded }) => (isLoaded ? 1 : 1.4)});
  transition: transform 1s ease-in-out;

  ${({ theme }) => theme.media.tablet} {
    height: 820px;
  }

  ${({ theme }) => theme.media.mobile} {
    height: 360px;
  }
`;

const FirstTitle = styled.p`
  position: absolute;
  top: 45%;
  left: 50%;
  font-size: 100px;
  font-weight: 400;
  letter-spacing: 0.5%;
  /* pointer-events: none; */
  transform: translate(-50%, -50%) translateY(${({ isLoaded }) => (isLoaded ? "-290px" : 0)});
  transition: transform 1s ease-in-out;
  z-index: 10;

  ${({ theme }) => theme.media.tablet} {
    font-size: 70px;
    transform: translate(-50%, -50%) translateY(${({ isLoaded }) => (isLoaded ? "-260px" : 0)});
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: 28px;
    transform: translate(-50%, -50%) translateY(${({ isLoaded }) => (isLoaded ? "-70px" : 0)});
  }
`;

//하단 텍스트는 내려가다 사라지게 하는 애니메이션 적용
const SecondTitle = styled(FirstTitle)`
  top: 55%;
  pointer-events: none;
  opacity: ${({ isLoaded }) => (isLoaded ? 0 : 1)};
  visibility: ${({ isLoaded }) => (isLoaded ? "hidden" : "visible")};
  transform: translate(-50%, -50%) translateY(${({ isLoaded }) => (isLoaded ? "600px" : 0)});
  transition:
    opacity 0.8s ease-in-out,
    visibility 0.8s ease-in-out,
    transform 1.8s ease-in-out;
`;

// onAnimationEnd 애니메이션 끝나면 MainPage한테 알려주기
export default function TopArea({ onAnimationEnd = () => {} }) {
  const [isLoaded, setIsLoaded] = useState(false);

  //이미지 로딩시 상태 변경하기
  const loadCompleted = () => {
    setIsLoaded(true);
    // transition끝나면 바로 알림
    setTimeout(() => {
      onAnimationEnd();
    }, 1000);
  };

  //onLoad 이벤트로 이미지 로딩시 실행됨
  return (
    <TopContainer>
      <TopImage src={topImage} onLoad={loadCompleted} $isLoaded={isLoaded} alt="Top Image" />
      <FirstTitle isLoaded={isLoaded}>2KEA</FirstTitle>
      <SecondTitle isLoaded={isLoaded}>STUDIO</SecondTitle>
    </TopContainer>
  );
}
