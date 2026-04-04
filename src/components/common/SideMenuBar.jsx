import React, { useState } from "react";
import { Theme } from "../../styles/theme";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import WithdrawModal from "../modals/WithdrawModal";

const SideMenu = styled.div`
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  width: 100%;
  z-index: 1;
  background: ${Theme.colors.white};
  height: 180px;

  ${({ theme }) => theme.media.tablet} {
    position: fixed;
    margin-bottom: 80px;
    font-size: ${Theme.fontsize.tablet.medium};
    flex-direction: row;
    justify-content: space-around;
    top: 0px;
    right: 0;
    left: 0;
    width: 100%;
    height: 180px;
  }

  ${({ theme }) => theme.media.mobile} {
    position: fixed;
    font-size: ${Theme.fontsize.mobile.mini};
    margin-bottom: 80px;
    font-size: ${Theme.fontsize.tablet.medium};
    flex-direction: row;
    justify-content: space-around;
    top: 0px;
    right: 0;
    left: 0;
    width: 100%;
    height: 120px;
  }
`;

const SideMenuMyPage = styled.div`
  padding: 10px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-end;

  ${({ theme }) => theme.media.tablet} {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    border: none;
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 0;
    font-size: ${Theme.fontsize.mobile.mini};
    display: flex;
    justify-content: center;
    align-items: flex-end;
    border: none;
  }
`;

const SideMenuOrder = styled.div`
  padding: 10px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-end;

  ${({ theme }) => theme.media.tablet} {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    border: none;
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 0;
    font-size: ${Theme.fontsize.mobile.mini};
    display: flex;
    justify-content: center;
    align-items: flex-end;
    border: none;
  }
`;
const SideMenuReivew = styled.div`
  padding: 10px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-end;

  ${({ theme }) => theme.media.tablet} {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    border: none;
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 0;
    font-size: ${Theme.fontsize.mobile.mini};
    display: flex;
    justify-content: center;
    align-items: flex-end;
    border: none;
  }
`;

const SideMenuInsta = styled.a`
  padding: 10px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-end;

  ${({ theme }) => theme.media.tablet} {
    border: none;
    justify-content: center;
    align-items: flex-end;
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 0;
    font-size: ${Theme.fontsize.mobile.mini};
    border: none;
    justify-content: center;
    align-items: flex-end;
  }
`;

const SideMenuOut = styled.button`
  padding: 10px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-end;
  color: ${Theme.colors.black};
  background: transparent;
  border: none;
  cursor: pointer;

  ${({ theme }) => theme.media.tablet} {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    border: none;
    color: ${Theme.colors.black};
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 0;
    font-size: ${Theme.fontsize.mobile.mini};
    display: flex;
    justify-content: center;
    align-items: flex-end;
    border: none;
    color: ${Theme.colors.black};
  }
`;

const NavLinkTo = styled(NavLink)`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  &.active p {
    border-bottom: 2px solid ${Theme.colors.black};
    padding-bottom: 4px;
  }

  ${({ theme }) => theme.media.tablet} {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
  }
`;

export default function SideMenuBar() {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const handleOpenWithdrawModal = () => {
    setIsWithdrawModalOpen(true);
  };

  const handleCloseWithdrawModal = () => {
    setIsWithdrawModalOpen(false);
  };

  const handleConfirmWithdraw = () => {
    setIsWithdrawModalOpen(false);
  };

  return (
    <>
      <SideMenu>
        <SideMenuMyPage>
          <NavLinkTo to={"/auth/me"} end>
            <p>마이페이지</p>
          </NavLinkTo>
        </SideMenuMyPage>

        <SideMenuOrder>
          <NavLinkTo to={"/auth/me/order"}>
            <p>주문내역</p>
          </NavLinkTo>
        </SideMenuOrder>

        <SideMenuReivew>
          <NavLinkTo to={"/auth/me/review"}>
            <p>리뷰</p>
          </NavLinkTo>
        </SideMenuReivew>

        <SideMenuInsta href="https://www.instagram.com/2kea_studio/" target="_blank" rel="noopener noreferrer">
          <p>인스타그램</p>
        </SideMenuInsta>

        <SideMenuOut type="button" onClick={handleOpenWithdrawModal}>
          <p>회원탈퇴</p>
        </SideMenuOut>
      </SideMenu>

      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={handleCloseWithdrawModal}
        onWithdraw={handleConfirmWithdraw}
      />
    </>
  );
}
