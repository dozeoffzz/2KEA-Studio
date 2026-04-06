import styled from "@emotion/styled";
import topImage from "../../assets/imgs/main/top-image.webp";
import { useContext, useState } from "react";
import { Theme } from "../../styles/theme";
import { LogoAnimationContext } from "../contexts/LogoAnimationContext";

const TopContainer = styled.div`
  position: relative;
  width: 100vw;
  overflow: hidden;
`;

const TopImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  max-height: 968px;
  overflow: hidden;
  transition: 0.3s ease;

  @media (max-width: 1024px) {
    height: 820px;
    max-height: 820px;
  }

  @media (max-width: 767px) {
    height: 500px;
    max-height: 500px;
  }

  @media (max-width: 480px) {
    height: 420px;
    max-height: 420px;
  }

  @media (max-width: 360px) {
    height: 360px;
    max-height: 360px;
  }
`;

const TopImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transform: scale(${({ isLoaded }) => (isLoaded ? 1 : 1.4)});
  transition: transform 1s ease-in-out;
`;

const FirstTitle = styled.p`
  position: absolute;
  top: 45%;
  left: 50%;
  font-size: 56px;
  font-weight: 500;
  letter-spacing: 0.3rem;
  white-space: nowrap;
  pointer-events: none;
  opacity: ${({ isLoaded }) => (isLoaded ? 0 : 1)};
  transform: translate(-50%, -50%) translateY(${({ isLoaded }) => (isLoaded ? "-43vh" : "0")});
  transition:
    transform 1s ease-in-out,
    opacity 0.8s ease-in-out;
  z-index: 10;

  @media (max-width: 1024px) {
    font-size: 40px;
    letter-spacing: 0.2rem;
    transform: translate(-50%, -50%) translateY(${({ isLoaded }) => (isLoaded ? "-37vh" : "0")});
  }
  @media (max-width: 767px) {
    font-size: 32px;
    letter-spacing: 0.15rem;
    transform: translate(-50%, -50%) translateY(${({ isLoaded }) => (isLoaded ? "-30vh" : "0")});
  }
`;

const SecondTitle = styled.p`
  position: absolute;
  top: 55%;
  left: 50%;
  font-size: 56px;
  font-weight: 500;
  letter-spacing: 0.3rem;
  white-space: nowrap;
  pointer-events: none;
  opacity: ${({ isLoaded }) => (isLoaded ? 0 : 1)};
  visibility: ${({ isLoaded }) => (isLoaded ? "hidden" : "visible")};
  transform: translate(-50%, -50%) translateY(${({ isLoaded }) => (isLoaded ? "100vh" : "0")});
  transition:
    opacity 1s ease-in-out,
    visibility 1s ease-in-out,
    transform 1.8s ease-in-out;
  z-index: 10;

  @media (max-width: 1024px) {
    font-size: 40px;
    letter-spacing: 0.2rem;
  }
  @media (max-width: 767px) {
    font-size: 32px;
    letter-spacing: 0.15rem;
  }
`;

export default function TopArea() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isAnimated, setIsAnimated } = useContext(LogoAnimationContext);

  const loadCompleted = () => {
    setIsLoaded(true);
    setTimeout(() => {
      setIsAnimated(true);
    }, 1000);
  };

  return (
    <TopContainer>
      <TopImageWrapper>
        <TopImage src={topImage} onLoad={loadCompleted} isLoaded={isLoaded} alt="Top Image" />
        <FirstTitle isLoaded={isLoaded} isAnimated={isAnimated}>
          2KEA
        </FirstTitle>
        <SecondTitle isLoaded={isLoaded} isAnimated={isAnimated}>
          STUDIO
        </SecondTitle>
      </TopImageWrapper>
    </TopContainer>
  );
}
