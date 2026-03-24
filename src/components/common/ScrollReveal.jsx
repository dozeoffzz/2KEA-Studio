import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";

const FadeContainer = styled.div`
  padding: 0 15px;
  //구조분해 할당(isVisible 상태에 따라 투명도 전환)
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  //구조분해 할당(isVisible 상태에 따라 위치 전환)
  transform: translateY(${({ isVisible }) => (isVisible ? "0" : "30px")});
  //구조분해 할당(mouseEvent 상태에 따라 마우스 이벤트 여부 결정)
  pointer-events: ${({ mouseEvent }) => (mouseEvent ? "auto" : "none")};
  transition:
    opacity 0.6s ease-in-out,
    transform 0.6s ease-in-out;

  ${({ theme }) => theme.media.tablet} {
    padding: 0 12px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 0 2px;
  }
`;

export default function ScrollReveal({ children }) {
  const [isVisible, setIsVisible] = useState(false); // 스크롤시 요소가 보이는 초기 상태 저장
  const [mouseEvent, setMouseEvent] = useState(false); // 이미지가 완전히 나타나기 전까지 마우스 이벤트 비활성화 상태값 저장
  const domRef = useRef(); //실제 DOM 요소에 접근하기 위한 Ref 객체 생성(렌더링 영향 X)

  useEffect(() => {
    //마우스 이벤트를 활성화할 타이머 변수 생성
    let timer = null;
    //요소가 완전히 나타난 후 마우스 이벤트 활성화
    const availableMouseEvent = () => {
      timer = setTimeout(() => {
        setMouseEvent(true);
      }, 600);
    };

    //뷰포트와 요소의 교차 상태를 감시하는 관찰자 생성
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          //요소의 10% 이상이 뷰포트 내부로 들어올경우 실행(하단 threshold: 0.1 참고)
          if (entry.isIntersecting) {
            setIsVisible(true);
            availableMouseEvent();
            //한번 실행된 이후에는 감시 중단(반복 실행 방지용)
            observer.unobserve(domRef.current);
          }
        });
      },
      { threshold: 0.1 } //threshold: 0.1 : 요소가 10% 이상 보일 때 실행
    );
    //감시할 실제 DOM 요소가 존재하는지 체크
    if (domRef.current) {
      //실제 DOM 요소가 있으면 감시 시작
      observer.observe(domRef.current);
    }

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    }; //클린업 함수(언마운트 시 감시하지 않기, 타이머 정리)
  }, []);

  return (
    <FadeContainer ref={domRef} isVisible={isVisible} mouseEvent={mouseEvent}>
      {children}
    </FadeContainer>
  );
}
