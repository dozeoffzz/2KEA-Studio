import React from "react";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import lineLight from "../../assets/imgs/lineLight.svg";
import styled from "@emotion/styled";
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
  background-color: ${Theme.colors.overlay};
  backdrop-filter: blur(2px);
`;

const SignUpModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  min-width: 400px;
  min-height: 242px;
  background-color: ${Theme.colors.white};
  box-shadow: 4px 4px 10px;
`;

const SignUpModalWrap = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 59px;
  background-color: ${Theme.colors.white};
`;

const LineLignt = styled.img`
  position: absolute;
  top: 0;
  left: 40px;
  opacity: 70%;
  width: 100px;
  height: 150px;
`;

const SignUpModalTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 34px;
  border-bottom: 1px solid ${Theme.colors.black};
`;

const SignUpModalTitle = styled.p`
  font-size: ${Theme.fontsize.desktop.content};
`;

const Content = styled.p`
  font-size: ${Theme.fontsize.desktop.content};
  text-align: center;
`;

const DeleteButton = styled.button`
  width: 24px;
  height: 24px;
  background-color: transparent;
`;

const ButtonWrap = styled.div`
  height: 35px;
  display: flex;
  justify-content: flex-end;
  font-size: ${Theme.fontsize.desktop.content};
`;

const Button = styled.button`
  width: 100%;
  font-size: ${Theme.fontsize.desktop.content};
  background-color: ${Theme.colors.black};
  color: ${Theme.colors.whitetext};
  border-top: 1px solid ${Theme.colors.black};
`;

export default function SignUpModal({ isOpen, onClose }) {
  const targetElement = document.querySelector("#modal-root");
  if (!isOpen) return null;

  return createPortal(
    <Overlay>
      <SignUpModalContainer>
        <SignUpModalWrap>
          <LineLignt src={lineLight} />
          <SignUpModalTitleWrap>
            <SignUpModalTitle>회원 가입</SignUpModalTitle>
            <DeleteButton onClick={onClose}>
              <img src={deleteIcon} />
            </DeleteButton>
          </SignUpModalTitleWrap>
          <div>
            <Content>회원가입이 완료되었습니다.</Content>
          </div>
        </SignUpModalWrap>
        <ButtonWrap>
          <Button onClick={onClose}>확인</Button>
        </ButtonWrap>
      </SignUpModalContainer>
    </Overlay>,
    targetElement,
  );
}
