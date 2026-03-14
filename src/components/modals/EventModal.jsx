import styled from "@emotion/styled";
import React from "react";
import { createPortal } from "react-dom";

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
  background-color: #cfcfcf;
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

const SecondContent = styled(Content)`
  margin-bottom: 25px;
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

export default function EventModal() {
  const targetElement = document.querySelector("#modal-root");

  return createPortal(
    <Overlay>
      <EventModalContainer>
        <EventModalWrap>
          <Title>EVENT</Title>
          <SecondTitle>- 성수 쇼룸 구매 이벤트 -</SecondTitle>
          <Content>
            성수 쇼룸에서 소파 및 조명 구매 대상으로 <span>초이스 쿠션 증정 이벤트를 진행중 입니다.</span>
          </Content>
          <SecondContent>더욱더 설레는 마음으로 쇼룸에 찾아와 주세요 :&#41;</SecondContent>
          <EventInfo>* 초이스쿠션 종류는 재고 상황에 따라 상이합니다.</EventInfo>
          <EventInfo>* 3월 27일 ~ 4월 3일 단 7일동안 진행됩니다.</EventInfo>
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
