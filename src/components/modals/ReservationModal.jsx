import styled from "@emotion/styled";
import React from "react";
import { createPortal } from "react-dom";
import { Theme } from "../../styles/theme";

const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  z-index: 999;
  background-color: #0c0c0c15;
`;

const ReservationModalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 500px;
  height: 400px;
  padding-top: 20px;
  background-color: ${Theme.colors.white};
`;

const ReservationModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const TextStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 32px;
`;

const Title = styled.span`
  font-size: 32px;
`;

const SecondTitle = styled.span`
  font-size: 14px;
`;

const Content = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  line-height: 1.6;
`;

const SecondContent = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  line-height: 1.6;
`;

const BottomArea = styled.div`
  width: 100%;
`;

const DotArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 22px;
  padding: 0 0 28px;
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) =>
    active ? Theme.colors.black : "#b3b3b3"};
`;

const ButtonWrap = styled.div`
  display: flex;
  width: 100%;
  border-top: 1px solid ${Theme.colors.black};
`;

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

const CloseButton = styled(TodayCloseButton)`
  background-color: ${Theme.colors.black};
  color: ${Theme.colors.white};
`;

export default function ReservationModal() {
  const targetElement = document.querySelector("#modal-root");
  if (!targetElement) return null;

  return createPortal(
    <Overlay>
      <ReservationModalContainer>
        <ReservationModalWrap>
          <TextStack>
            <Title>RESERVATION</Title>

            <SecondTitle>- 성수 쇼룸 예약자 안내 -</SecondTitle>

            <Content>
              <span>
                평일 2KEA 성수 쇼룸은 예약 또는 자유롭게 쇼룸 방문이 가능하며,
              </span>
              <span>예약자 우선으로 상담이 진행됩니다.</span>
            </Content>

            <SecondContent>
              <span>상담 예약은 평일에만 진행되며,</span>
              <span>주말에는 예약 없이 방문 가능합니다</span>
            </SecondContent>

            <SecondContent>쇼룸 방문 시, 꼭 참고 부탁드립니다.</SecondContent>

            <DotArea>
              <Dot active />
              <Dot />
              <Dot />
            </DotArea>
          </TextStack>
        </ReservationModalWrap>

        <BottomArea>
          <ButtonWrap>
            <TodayCloseButton>오늘 하루 열지 않기</TodayCloseButton>
            <CloseButton>닫기</CloseButton>
          </ButtonWrap>
        </BottomArea>
      </ReservationModalContainer>
    </Overlay>,
    targetElement,
  );
}
