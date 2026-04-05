import React from "react";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import lineLight from "../../assets/imgs/lineLight.svg";
import styled from "@emotion/styled";
import { createPortal } from "react-dom";
import { Theme } from "../../styles/theme";
import { NavLink } from "react-router-dom";

const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: ${Theme.colors.overlay};
`;

const OrderModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 400px;
  height: 242px;
  background-color: ${Theme.colors.white};
  box-shadow: 4px 4px 10px;

  ${({ theme }) => theme.media.mobile} {
    width: 250px;
    height: 180px;
  }
`;

const OrderModalWrap = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 59px;
  background-color: ${Theme.colors.white};

  ${({ theme }) => theme.media.mobile} {
    gap: 32px;
  }
`;

const LineLignt = styled.img`
  position: absolute;
  top: 0;
  left: 40px;
  opacity: 70%;
  width: 100px;
  height: 150px;
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

  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
  }
`;

const Content = styled.p`
  font-size: ${Theme.fontsize.desktop.content};
  text-align: center;

  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background-color: transparent;

  ${({ theme }) => theme.media.mobile} {
    width: 16px;
    height: 16px;

    img {
      width: 10px;
      height: 10px;
    }
  }
`;

const ButtonWrap = styled.div`
  height: 35px;
  display: flex;
  justify-content: flex-end;
  font-size: ${Theme.fontsize.desktop.content};

  ${({ theme }) => theme.media.mobile} {
    height: 28px;
  }
`;

const CloseButton = styled.button`
  width: 50%;
  font-size: ${Theme.fontsize.desktop.content};
  background-color: ${Theme.colors.whitetext};
  color: ${Theme.colors.blacktext};
  border-top: 1px solid ${Theme.colors.black};

  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
  }
`;

const Button = styled(NavLink)`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${Theme.fontsize.desktop.content};
  background-color: ${Theme.colors.blacktext};
  color: ${Theme.colors.whitetext};
  border-top: 1px solid ${Theme.colors.black};

  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
  }
`;

export default function OrderModal({ OrderIsOpen, OrderOnClose, onConfirm }) {
  const targetElement = document.querySelector("#modal-root");
  if (!OrderIsOpen) return null;

  function handleConfirm() {
    onConfirm();
    OrderOnClose();
  }

  return createPortal(
    <Overlay>
      <OrderModalContainer>
        <OrderModalWrap>
          <LineLignt src={lineLight} />
          <OrderModalTitleWrap>
            <OrderModalTitle>상품 주문</OrderModalTitle>
            <DeleteButton onClick={OrderOnClose}>
              <img src={deleteIcon} />
            </DeleteButton>
          </OrderModalTitleWrap>
          <div>
            <Content>구매하시겠습니까?</Content>
          </div>
        </OrderModalWrap>
        <ButtonWrap>
          <CloseButton onClick={OrderOnClose}>취소</CloseButton>
          <Button onClick={handleConfirm} to={"/completed"}>
            구매
          </Button>
        </ButtonWrap>
      </OrderModalContainer>
    </Overlay>,
    targetElement,
  );
}
