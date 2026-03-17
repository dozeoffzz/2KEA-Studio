// 통합 메인 모달에서 사용되는 개별 모달 컴포넌트
import styled from "@emotion/styled";
import React from "react";
import { Theme } from "../../styles/theme";

// 모달 바깥 어두운 배경

// 화면 전체를 덮는 오버레이
const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(12, 12, 12, 0.12);
  transition: opacity 0.42s ease;
  opacity: ${({ animationState }) => (animationState === "exit" ? 0 : 1)};
`;

// 타이틀 모달 전체 박스
const TitleModalContainer = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 500px;
  height: 400px;
  background-color: ${Theme.colors.white};
  transition:
    transform 0.42s ease,
    opacity 0.42s ease;
  transform: ${({ animationState }) => {
    if (animationState === "enter") return "translateX(24px)";
    if (animationState === "exit") return "translateX(-24px)";
    return "translateX(0)";
  }};
  opacity: ${({ animationState }) => (animationState === "exit" ? 0 : 1)};
`;

// 텍스트 내용을 세로로 정리하는 영역
const TitleModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

// 제목, 본문, 점을 세로로 쌓는 영역
const TextStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 32px;
`;

// 메인 제목
const Title = styled.span`
  font-size: 32px;
`;

// 부제목
const SecondTitle = styled.span`
  font-size: 14px;
`;

// 두 줄 이상 본문
const Content = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  line-height: 1.6;
`;

// 추가 본문
const SecondContent = styled.span`
  font-size: 14px;
  line-height: 1.6;
`;

// 하단 버튼 영역 전체
const BottomArea = styled.div`
  width: 100%;
`;

// 점 3개 영역
const DotArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 22px;
  padding: 0 0 28px;
`;

// 각 점 스타일
const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? Theme.colors.black : "#b3b3b3")};
`;

// 버튼 위 선을 포함한 버튼 래퍼
const ButtonWrap = styled.div`
  display: flex;
  width: 100%;
  border-top: 1px solid ${Theme.colors.black};
`;

// 오늘 하루 열지 않기 버튼
const TodayCloseButton = styled.button`
  width: 50%;
  min-height: 45px;
  text-align: center;
  background-color: ${Theme.colors.white};
  color: ${Theme.colors.black};
  font-size: 14px;
  border: none;
  cursor: pointer;
`;

// 닫기 버튼
const CloseButton = styled(TodayCloseButton)`
  background-color: ${Theme.colors.black};
  color: ${Theme.colors.white};
`;

// TitleModal 컴포넌트
// activeIndex: 현재 활성화된 점 번호
// animationState: 전환 애니메이션 상태
// onClose, onTodayClose: 버튼 클릭 함수
export default function TitleModal({ activeIndex = 0, animationState = "active", onClose, onTodayClose }) {
  return (
    <Overlay animationState={animationState}>
      <TitleModalContainer animationState={animationState}>
        <TitleModalWrap>
          {/* 제목과 본문 내용 영역 */}
          <TextStack>
            <Title>TITLE</Title>
            <SecondTitle>- 신규 컬렉션 런칭 -</SecondTitle>
            <Content>
              <span>공간의 온도를 바꾸는 2KEA만의 새로운</span>
              <span>실루엣을 만나보세요</span>
            </Content>
            <SecondContent>모던한 감각으로 재해석한 2KEA의 새로운 오브제</SecondContent>
            <SecondContent>신제품 출시 기념 전 지역 무료 배송</SecondContent>

            {/* 현재 모달 순서를 보여주는 점 3개 */}
            <DotArea>
              <Dot active={activeIndex === 0} />
              <Dot active={activeIndex === 1} />
              <Dot active={activeIndex === 2} />
            </DotArea>
          </TextStack>
        </TitleModalWrap>

        <BottomArea>
          {/* 하단 버튼 영역 */}
          <ButtonWrap>
            <TodayCloseButton onClick={onTodayClose}>오늘 하루 열지 않기</TodayCloseButton>
            <CloseButton onClick={onClose}>닫기</CloseButton>
          </ButtonWrap>
        </BottomArea>
      </TitleModalContainer>
    </Overlay>
  );
}
