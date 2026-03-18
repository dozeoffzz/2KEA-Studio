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
  background-color: ${Theme.colors.white};
`;

const OrderModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  min-width: 400px;
  min-height: 242px;
  background-color: #cfcfcf;
  box-shadow: 4px 4px 10px;
`;

const OrderModalWrap = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 59px;
  background-color: #cfcfcf;
`;

const LineLignt = styled.img`
  position: absolute;
  top: 0;
  left: 40px;
  opacity: 70%;
`;

const OrderModalTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 34px;
  border-bottom: 1px solid ${Theme.colors.blacktext};
`;

const OrderModalTitle = styled.p`
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
const CloseButton = styled.button`
  width: 50%;
  font-size: ${Theme.fontsize.desktop.content};
  background-color: ${Theme.colors.whitetext};
  color: ${Theme.colors.blacktext};
`;
const Button = styled.button`
  width: 50%;
  font-size: ${Theme.fontsize.desktop.content};
  background-color: ${Theme.colors.blacktext};
  color: ${Theme.colors.whitetext};
`;

export default function OrderModal({ isOpen, onClose }) {
  const targetElement = document.querySelector("#modal-root");
  if (!isOpen) return null;

  return createPortal(
    <Overlay>
      <OrderModalContainer>
        <OrderModalWrap>
          <LineLignt src={lineLight} />
          <OrderModalTitleWrap>
            <OrderModalTitle>상품 주문</OrderModalTitle>
            <DeleteButton onClick={onClose}>
              <img src={deleteIcon} />
            </DeleteButton>
          </OrderModalTitleWrap>
          <div>
            <Content>구매하시겠습니까?</Content>
          </div>
        </OrderModalWrap>
        <ButtonWrap>
          <CloseButton onClick={onClose}>취소</CloseButton>
          <Button>구매</Button>
        </ButtonWrap>
      </OrderModalContainer>
    </Overlay>,
    targetElement,
  );
}
