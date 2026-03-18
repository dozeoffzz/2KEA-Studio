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

const TitleModalContainer = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 500px;
  height: 400px;
  background-color: ${Theme.colors.white};
`;

const TitleModalWrap = styled.div`
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
  font-size: 14px;
`;

const SecondContent = styled(Content)``;

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
`;

const CloseButton = styled(TodayCloseButton)`
  background-color: ${Theme.colors.black};
  color: ${Theme.colors.white};
`;

export default function TitleModal() {
  const targetElement = document.querySelector("#modal-root");

  return createPortal(
    <Overlay>
      <TitleModalContainer>
        <TitleModalWrap>
          <Title>TITLE</Title>
          <SecondTitle>- 신규 컬렉션 런칭 -</SecondTitle>
          <Content>
            공간의 온도를 바꾸는 2KEA만의 새로운{" "}
            <span>실루엣을 만나보세요</span>
          </Content>
          <SecondContent>
            모던한 감각으로 재해석한 2KEA의 새로운 오브제
          </SecondContent>
          <SecondContent>신제품 출시 기념 전 지역 무료 배송</SecondContent>
        </TitleModalWrap>

        <BottomArea>
          <DotArea>
            <Dot active />
            <Dot />
            <Dot />
          </DotArea>
          <ButtonWrap>
            <TodayCloseButton>오늘 하루 열지 않기</TodayCloseButton>
            <CloseButton>닫기</CloseButton>
          </ButtonWrap>
        </BottomArea>
      </TitleModalContainer>
    </Overlay>,
    targetElement,
  );
}
