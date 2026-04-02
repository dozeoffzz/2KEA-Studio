import React, { useEffect } from "react";
import CompletedIcon from "../assets/icons/completedIcon.svg";
import styled from "@emotion/styled";
import { Theme } from "../styles/theme";
import { NavLink } from "react-router-dom";

const CompletedContainer = styled.div`
  margin-top: 100px;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CompletedWrap = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const CheckImg = styled.img`
  width: 112px;

  ${({ theme }) => theme.media.tablet} {
    width: 100px;
  }
  ${({ theme }) => theme.media.mobile} {
    width: 80px;
  }
`;

const CompletedTitle = styled.h2`
  font-size: ${Theme.fontsize.desktop.section};
  margin-bottom: 20px;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.section};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.section};
  }
`;

const CompletedMsg = styled.p`
  font-size: ${Theme.fontsize.desktop.content};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;
const GotoMain = styled(NavLink)`
  font-size: ${Theme.fontsize.desktop.content};
  margin-top: 20px;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;
export default function CompletedPage() {
  // 주문 완료랑 같이 구매일 저장
  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("orderData")) || {};
    localStorage.setItem(
      "orderData",
      JSON.stringify({
        ...existing,
        purchasedAt: new Date().toISOString(),
      }),
    );
  }, []);

  // 현재 날짜 보여주기
  const Today = new Date();
  const TodaySort = `${Today.getFullYear()}년 ${Today.getMonth() + 1}월 ${Today.getDate()}일`;
  return (
    <CompletedContainer>
      <CompletedWrap>
        <CheckImg src={CompletedIcon} />
        <CompletedTitle>상품 주문이 완료되었습니다.</CompletedTitle>
        <CompletedMsg>감사합니다.</CompletedMsg>
        <CompletedMsg>{TodaySort}</CompletedMsg>
        <CompletedMsg>주문번호: 20-76040312</CompletedMsg>
        <GotoMain to={"/"}>메인으로</GotoMain>
      </CompletedWrap>
    </CompletedContainer>
  );
}
