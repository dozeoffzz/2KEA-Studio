import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { LogoAnimationContext } from "../contexts/LogoAnimationContext";
import GoTopButton from "../common/goTopButton";

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
  //헤더 로고가 보일지 말지 결정(타이밍 동기화를 위해 공통부모 관리)
  //애니메이션이 끝난 후 보여야 하니 초기 상태는 false
  const [isAnimated, setIsAnimated] = useState(false);
  const location = useLocation();

  //메인패이지 재진입시 애니메이션 진행 상태 초기화
  //초기화 안하면 새로고침 하지 않는이상 로고 애니메이션 오류남
  useEffect(() => {
    if (location.pathname === "/") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAnimated(false);
    }
  }, [location.pathname]);

  //isAmimated 상태가 바뀔 때만 하위 컴포넌트 리렌더링
  //성능 최적화 목적
  const value = useMemo(
    () => ({
      isAnimated,
      setIsAnimated,
    }),
    [isAnimated, setIsAnimated],
  );

  return (
    //생성한 컨텍스트 제공
    <LogoAnimationContext.Provider value={value}>
      <LayoutContainer>
        <Header />
        <MainContainer>
          <Outlet />
        </MainContainer>
        <Footer />
        <GoTopButton />
      </LayoutContainer>
    </LogoAnimationContext.Provider>
  );
}
