import styled from "@emotion/styled";
import topImage from "../../assets/imgs/main/top-image.webp";
import { useEffect, useState } from "react";

const TopContainer = styled.div`
  position: relative;
  width: 100%;
  height: 968px;
`;

const TopImage = styled.img`
  width: 100%;
  height: 968px;
  transform: scale(${({ isMounted }) => (isMounted ? 1 : 1.3)});
  transition: transform 1s ease-in-out;
`;

const FirstTitle = styled.p`
  position: absolute;
  top: 45%;
  left: 50%;
  font-size: 100px;
  font-weight: 400;
  transform: translate(-50%, -50%)
    translateY(${({ isMounted }) => (isMounted ? "calc(-50vh + 100px + 50%)" : 0)});
  transition: transform 1s ease-in-out;
  z-index: 10;
`;

//푸터까지 내리는 아직 값을 못찾아서 애니메이션을 넣지 않음
const SecondTitle = styled(FirstTitle)`
  top: 55%;
  transform: translate(-50%, -50%) translateY(${({ isMounted }) => (isMounted ? 0 : 0)});
  transition: transform 1s ease-in-out;
`;

export default function TopArea() {
  const [ismounted, setIsMounted] = useState(false); // 마운트 상태 저장 함수

  useEffect(() => {
    //약간의 지연 후 실행
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 200);
    return () => clearTimeout(timer); // 클린업 함수
  }, []); //빈 의존성 배열 : 마운트시 한번만 실행

  return (
    <TopContainer>
      <TopImage src={topImage} isMounted={ismounted} alt="Top Image" />
      <FirstTitle isMounted={ismounted}>2KEA</FirstTitle>
      <SecondTitle isMounted={ismounted}>STUDIO</SecondTitle>
    </TopContainer>
  );
}
