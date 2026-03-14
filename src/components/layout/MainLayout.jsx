import React from "react";
import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import Header from "../common/Header";
import Footer from "../common/Footer";

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
`;

const MainContainer = styled.main`
  margin: 0 auto;
  flex: 1;
  width: 100%;
  max-width: 1920px;
`;

export default function MainLayout() {
  return (
    <LayoutContainer>
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <Footer />
    </LayoutContainer>
  );
}
