import React from "react";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import lineLight from "../../assets/imgs/lineLight.svg";
import styled from "@emotion/styled";
import { createPortal } from "react-dom";
import { Theme } from "../../styles/theme";
import { useCartStore } from "../../stores/useCartStore";

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
`;

const DeleteModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  min-width: 400px;
  min-height: 242px;
  background-color: ${Theme.colors.white};
  box-shadow: 4px 4px 10px;
`;

const DeleteModalWrap = styled.div`
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

const DeleteModalTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 34px;
  border-bottom: 1px solid ${Theme.colors.blacktext};
`;

const DeleteModalTitle = styled.p`
  font-size: ${Theme.fontsize.desktop.content};
`;

const Content = styled.p`
  text-align: center;
  font-size: ${Theme.fontsize.desktop.content};
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

const CloseButton = styled.button`
  width: 50%;
  font-size: ${Theme.fontsize.desktop.content};
  background-color: ${Theme.colors.whitetext};
  color: ${Theme.colors.blacktext};
  border-top: 1px solid ${Theme.colors.black};
`;
const Button = styled.button`
  width: 50%;
  font-size: ${Theme.fontsize.desktop.content};
  background-color: ${Theme.colors.blacktext};
  color: ${Theme.colors.whitetext};
  border-top: 1px solid ${Theme.colors.black};
`;

export default function DeleteModal({ isOpen, onClose }) {
  const targetElement = document.querySelector("#modal-root");
  const { clearCart } = useCartStore();
  if (!isOpen) return null;
  return createPortal(
    <Overlay>
      <DeleteModalContainer>
        <DeleteModalWrap>
          <LineLignt src={lineLight} />
          <DeleteModalTitleWrap>
            <DeleteModalTitle>목록 삭제</DeleteModalTitle>
            <DeleteButton onClick={onClose}>
              <img src={deleteIcon} />
            </DeleteButton>
          </DeleteModalTitleWrap>
          <div>
            <Content>모두 삭제하시겠습니까?</Content>
          </div>
        </DeleteModalWrap>
        <ButtonWrap>
          <CloseButton onClick={onClose}>취소</CloseButton>
          <Button
            onClick={() => {
              clearCart();
              onClose();
            }}
          >
            삭제
          </Button>
        </ButtonWrap>
      </DeleteModalContainer>
    </Overlay>,
    targetElement,
  );
}
