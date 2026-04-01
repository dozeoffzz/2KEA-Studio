import styled from "@emotion/styled";
import topImage from "../../assets/imgs/main/top-image.webp";
import { useContext, useState } from "react";
import { Theme } from "../../styles/theme";
import { LogoAnimationContext } from "../contexts/LogoAnimationContext";

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
  font-size: ${Theme.fontsize.desktop.main.animationTitle};
  font-weight: 500;
  letter-spacing: 0.3rem;
  display: ${({ isAnimated }) => (isAnimated ? "inline-block" : "inline-block")};
  pointer-events: none;
  transform: translate(-50%, -50%) translateY(${({ isLoaded }) => (isLoaded ? "-362px" : 0)});
  transition: transform 1s ease-in-out;
  z-index: 10;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.main.animationTitle};
    transform: translate(-50%, -50%) translateY(${({ isLoaded }) => (isLoaded ? "-297px" : 0)});
    letter-spacing: 0.2rem;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.main.animationTitle};
    transform: translate(-50%, -50%) translateY(${({ isLoaded }) => (isLoaded ? "-90px" : 0)});
    letter-spacing: 0.1rem;
  }
`;

//하단 텍스트는 내려가다 사라지게 하는 애니메이션 적용
const SecondTitle = styled(FirstTitle)`
  top: 55%;
  pointer-events: none;
  opacity: ${({ isLoaded }) => (isLoaded ? 0 : 1)};
  visibility: ${({ isLoaded }) => (isLoaded ? "hidden" : "visible")};
  transform: translate(-50%, -50%) translateY(${({ isLoaded }) => (isLoaded ? "800px" : 0)});
  transition:
    opacity 1s ease-in-out,
    visibility 1s ease-in-out,
    transform 1.8s ease-in-out;

  ${({ theme }) => theme.media.tablet} {
    transform: translate(-50%, -50%) translateY(${({ isLoaded }) => (isLoaded ? "600px" : 0)});
  }

  ${({ theme }) => theme.media.mobile} {
    transform: translate(-50%, -50%) translateY(${({ isLoaded }) => (isLoaded ? "180px" : 0)});
  }
`;

export default function TopArea() {
  const [isLoaded, setIsLoaded] = useState(false);
  //제공받은 Context 사용
  const { isAnimated, setIsAnimated } = useContext(LogoAnimationContext);

  //이미지 로딩시 상태 변경하기
  const loadCompleted = () => {
    setIsLoaded(true);
    //설정해둔 애니메이션 시간(1초)이 끝나면 애니메이션 완료 상태 전달
    //애니메이션을 시작하는데 딜레이를 주는게 아닌, 애니메이션이 완료되었다는 상태를 전달하는 것에 딜레이를 주는 로직
    setTimeout(() => {
      setIsAnimated(true);
    }, 1000);
  };

  //onLoad 이벤트로 이미지 로딩시 실행 및 애니메이션 진행됨
  return (
    <TopContainer>
      <TopImage src={topImage} onLoad={loadCompleted} isLoaded={isLoaded} alt="Top Image" />
      <FirstTitle isLoaded={isLoaded} isAnimated={isAnimated}>
        2KEA
      </FirstTitle>
      <SecondTitle isLoaded={isLoaded} isAnimated={isAnimated}>
        STUDIO
      </SecondTitle>
    </TopContainer>
  );
}
