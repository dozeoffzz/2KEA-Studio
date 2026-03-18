import styled from "@emotion/styled";
import React from "react";
import { createPortal } from "react-dom";
import { Theme } from "../../styles/theme";

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
  background-color: #0c0c0c15;
`;

const EventModalContainer = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 500px;
  height: 400px;
  background-color: ${Theme.colors.white};
`;

const EventModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Title = styled.span`
  margin-bottom: 35px;
  font-size: 32px;
`;

const SecondTitle = styled.span`
  margin-bottom: 35px;
  font-size: 14px;
`;

const Content = styled.span`
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;
const SecondContentWrap = styled.div`
  margin-bottom: 25px;
`;
const SecondContent = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

const EventInfo = styled.span`
  font-size: 14px;
`;

const ButtonWrap = styled.div`
  display: flex;
  width: 100%;
`;

const TodayCloseButton = styled.button`
  width: 50%;
  min-height: 45px;
  text-align: center;
  background-color: #fafafa;
  color: #0c0c0c;
  font-size: 14px;
`;

const CloseButton = styled(TodayCloseButton)`
  background-color: #fafafa;
  color: #0c0c0c;
  background-color: #0c0c0c;
  color: #fafafa;
`;

export default function ReservationModal() {
  const targetElement = document.querySelector("#modal-root");

  return createPortal(
    <Overlay>
      <EventModalContainer>
        <EventModalWrap>
          <Title>RESERVATION</Title>
          <SecondTitle>- 성수 쇼룸 예약자 안내 -</SecondTitle>
          <Content>
            평일 2KEA 성수 쇼룸은 예약 또는 자유롭게 쇼룸 방문이 가능하며,
            <span>예약자 우선으로 상담이 진행됩니다.</span>
          </Content>
          <SecondContentWrap>
            <SecondContent>상담 예약은 평일에만 진행되며,</SecondContent>
            <SecondContent>주말에는 예약 없이 방문 가능합니다</SecondContent>
          </SecondContentWrap>
          <EventInfo>쇼룸 방문 시, 꼭 참고 부탁드립니다.</EventInfo>
        </EventModalWrap>
        <ButtonWrap>
          <TodayCloseButton>오늘 하루 열지 않기</TodayCloseButton>
          <CloseButton>닫기</CloseButton>
        </ButtonWrap>
      </EventModalContainer>
    </Overlay>,
    targetElement,
  );
}
