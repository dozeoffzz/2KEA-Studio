import styled from "@emotion/styled";
import React from "react";
import { NavLink } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

const Main = styled.div`
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 40px;
`;

export default function MainPage() {
  return (
    <Main>
      <NavLink to={"/alllist"}>아이템 리스트 페이지로 이동</NavLink>
      <NavLink to={"/login"}>로그인 페이지로 이동</NavLink>
    </Main>
  );
}
