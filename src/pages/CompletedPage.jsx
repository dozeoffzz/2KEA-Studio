import React from "react";
import CompletedIcon from "../assets/icons/completedIcon.svg";
import styled from "@emotion/styled";
import { Theme } from "../styles/theme";

const CompletedContainer = styled.div`
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

const CompletedTitle = styled.h2`
  font-size: ${Theme.fontsize.desktop.section};
  margin-bottom: 20px;
`;

const CompletedMsg = styled.p`
  font-size: ${Theme.fontsize.desktop.content};
`;
export default function CompletedPage() {
  // 현재 날짜 보여주기
  const Today = new Date();
  const TodaySort = `${Today.getFullYear()}년 ${Today.getMonth() + 1}월 ${Today.getDate()}일`;
  return (
    <CompletedContainer>
      <CompletedWrap>
        <img src={CompletedIcon} />
        <CompletedTitle>상품 주문이 완료되었습니다.</CompletedTitle>
        <CompletedMsg>감사합니다.</CompletedMsg>
        <CompletedMsg>{TodaySort}</CompletedMsg>
        <CompletedMsg>주문번호: 20-76040312</CompletedMsg>
      </CompletedWrap>
    </CompletedContainer>
  );
}
