import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";

const FadeContainer = styled.div`
  //구조분해 할당(isVisible 상태에 따라 투명도 전환)
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  //구조분해 할당(isVisible 상태에 따라 위치 전환)
  transform: translateY(${({ isVisible }) => (isVisible ? "0" : "50px")});
  pointer-events: ${({ isVisible }) => (isVisible ? "auto" : "none")};
  transition:
    opacity 1s ease-in-out,
    transform 1s ease-in-out;
  width: 100%;
`;

export default function ScrollReveal({ children }) {
  const [isVisible, setIsVisible] = useState(false); // 스크롤시 요소가 보이는 초기 상태 저장
  const domRef = useRef(); //실제 DOM 요소에 접근하기 위한 Ref 객체 생성(렌더링 영향 X)

  useEffect(() => {
    //뷰포트와 요소의 교차 상태를 감시하는 관찰자 생성
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          //요소의 10% 이상이 뷰포트 내부로 들어올경우 실행(10% 라는 값은 하단 threshold: 0.1 참고)
          if (entry.isIntersecting) {
            setIsVisible(true);
            //한번 실행된 이후에는 감시 중단(반복 실행 방지용)
            observer.unobserve(domRef.current);
          }
        });
      },
      { threshold: 0.1 }, //threshold: 0.1 : 요소가 10% 이상 보일 때 실행
    );
    //감시할 실제 DOM 요소가 존재하는지 체크
    if (domRef.current) {
      //실제 DOM 요소가 있으면 감시 시작
      observer.observe(domRef.current);
    }

    return () => observer.disconnect(); //클린업 함수(언마운트 시 감시하지 않기)
  }, []); //빈 의존성 배열: 딱 한번만 실행

  return (
    <FadeContainer ref={domRef} isVisible={isVisible}>
      {children}
    </FadeContainer>
  );
}
