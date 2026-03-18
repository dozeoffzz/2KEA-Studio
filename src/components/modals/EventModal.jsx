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

const EventModalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 500px;
  height: 400px;
  padding-top: 20px;
  background-color: ${Theme.colors.white};
`;

const EventModalWrap = styled.div`
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

const InfoStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
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
  font-size: 14px;
  line-height: 1.6;
`;

const EventInfo = styled.span`
  font-size: 14px;
  line-height: 1.4;
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

export default function EventModal() {
  const targetElement = document.querySelector("#modal-root");
  if (!targetElement) return null;

  return createPortal(
    <Overlay>
      <EventModalContainer>
        <EventModalWrap>
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

            <DotArea>
              <Dot active />
              <Dot />
              <Dot />
            </DotArea>
          </TextStack>
        </EventModalWrap>

        <BottomArea>
          <ButtonWrap>
            <TodayCloseButton>오늘 하루 열지 않기</TodayCloseButton>
            <CloseButton>닫기</CloseButton>
          </ButtonWrap>
        </BottomArea>
      </EventModalContainer>
    </Overlay>,
    targetElement,
  );
}
