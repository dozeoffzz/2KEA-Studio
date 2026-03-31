import { createContext } from "react";

//로고 애니메이션 타이밍 동기화를 위한 컨텍스트 생성
export const LogoAnimationContext = createContext({
  isAnimated: false, //초기 상태: 애니메이션 진행 안됨
  setIsAnimated: () => {}, // 구조를 맞추기 위한 더미 함수
});
