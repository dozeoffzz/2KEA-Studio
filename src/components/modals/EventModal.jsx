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
  inset: 0;
  z-index: 999;
  background-color: rgba(12, 12, 12, 0.12);
  transition: opacity 0.42s ease;
  opacity: ${({ animationState }) => (animationState === "exit" ? 0 : 1)};
`;

// 이벤트 모달 전체 박스
const EventModalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 500px;
  height: 400px;
  padding-top: 20px;
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
  overflow: hidden;
`;

// 텍스트 내용을 세로로 정리하는 영역
const EventModalWrap = styled.div`
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

// 안내 문구 여러 줄 묶음
const InfoStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

// 메인 제목
const Title = styled.span`
  margin-bottom: 35px;
  font-size: ${Theme.fontsize.desktop.section};
`;

// 부제목
const SecondTitle = styled.span`
  margin-bottom: 35px;
  font-size: ${Theme.fontsize.desktop.small};
`;

// 두 줄 이상 본문
const Content = styled.span`
  display: flex;
  flex-direction: column;
  font-size: ${Theme.fontsize.desktop.small};
`;

// 추가 본문
const SecondContent = styled.span`
  font-size: ${Theme.fontsize.desktop.small};
  line-height: 1.6;
`;

// 이벤트 안내 문구
const EventInfo = styled.span`
  font-size: ${Theme.fontsize.desktop.small};
  line-height: 1.4;
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
  background-color: ${({ active }) =>
    active ? Theme.colors.black : "#b3b3b3"};
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
  font-size: ${Theme.fontsize.desktop.small};
  border: none;
  cursor: pointer;
  color: #0c0c0c;
  font-size: ${Theme.fontsize.desktop.small};
`;

// 닫기 버튼
const CloseButton = styled(TodayCloseButton)`
  background-color: ${Theme.colors.black};
  color: ${Theme.colors.white};
`;

// EventModal 컴포넌트
// activeIndex: 현재 활성화된 점 번호
// animationState: 전환 애니메이션 상태
// onClose, onTodayClose: 버튼 클릭 함수
export default function EventModal({
  activeIndex = 1,
  animationState = "active",
  onClose,
  onTodayClose,
}) {
  return (
    <Overlay animationState={animationState}>
      <EventModalContainer animationState={animationState}>
        <EventModalWrap>
          {/* 제목과 본문 내용 영역 */}
          <TextStack>
            <Title>EVENT</Title>

            <SecondTitle>- 성수 쇼룸 구매 이벤트 -</SecondTitle>

            <Content>
              <span>성수 쇼룸에서 소파 및 조명 구매 대상으로</span>
              <span>초이스 쿠션 증정 이벤트를 진행중 입니다.</span>
            </Content>

            <SecondContent>
              더욱더 설레는 마음으로 쇼룸에 찾아와 주세요 :)
            </SecondContent>

            <InfoStack>
              <EventInfo>
                * 초이스쿠션 종류는 재고 상황에 따라 상이합니다.
              </EventInfo>
              <EventInfo>* 3월 27일 ~ 4월 3일 단 7일동안 진행됩니다.</EventInfo>
            </InfoStack>

            {/* 현재 모달 순서를 보여주는 점 3개 */}
            <DotArea>
              <Dot active={activeIndex === 0} />
              <Dot active={activeIndex === 1} />
              <Dot active={activeIndex === 2} />
            </DotArea>
          </TextStack>
        </EventModalWrap>

        <BottomArea>
          {/* 하단 버튼 영역 */}
          <ButtonWrap>
            <TodayCloseButton onClick={onTodayClose}>
              오늘 하루 열지 않기
            </TodayCloseButton>
            <CloseButton onClick={onClose}>닫기</CloseButton>
          </ButtonWrap>
        </BottomArea>
      </EventModalContainer>
    </Overlay>
  );
}
