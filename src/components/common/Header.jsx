import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

// 상단 헤더 영역
const HeaderWrap = styled.header`
  position: relative;
  width: 100%;
  height: 100px;
  flex-shrink: 0;
  background-color: transparent;
  z-index: 10;
`;

// 1920 기준 헤더 내부 정렬용 박스
const HeaderInner = styled.div`
  position: relative;
  width: 100%;
  max-width: 1920px;
  height: 100%;
  margin: 0 auto;

  @media (max-width: 1279px) {
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
`;

// 공통 아이콘 버튼 스타일
const IconButtonBase = `
  position: absolute;
  border: 0;
  background: transparent;
  color: #0c0c0c;
  cursor: pointer;
  padding: 0;
`;

// 왼쪽 상단 + 버튼
const PlusButton = styled.button`
  ${IconButtonBase}
  top: 23px;
  left: 24px;
  width: 30px;
  height: 30px;
  font-size: 54px;
  font-weight: 300;
  line-height: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 가운데 브랜드 로고 텍스트
const Brand = styled(NavLink)`
  position: absolute;
  top: 3px;
  left: 835px;
  width: 262px;
  font-size: 34px;
  line-height: 1.05;
  text-align: center;
  letter-spacing: 0;
  color: #0c0c0c;
  text-decoration: none;

  @media (max-width: 1279px) {
    position: static;
    width: auto;
    min-width: 180px;
    max-width: 262px;
    padding-top: 3px;
    font-size: clamp(24px, 4vw, 34px);
  }

  @media (max-width: 768px) {
    min-width: 140px;
    font-size: 24px;
    line-height: 1;
  }
`;

// 오른쪽 상단 햄버거 버튼
const MenuButton = styled.button`
  ${IconButtonBase}
  top: 29px;
  right: 30px;
  width: 24px;
  height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1px 0;

  span {
    display: block;
    width: 24px;
    height: 3px;
    background: #0c0c0c;
  }
`;

export default function Header() {
  return (
    <HeaderWrap>
      <HeaderInner>
        {/* 왼쪽 + 아이콘 */}
        <PlusButton type="button" aria-label="Open menu">
          +
        </PlusButton>

        {/* 가운데 브랜드 로고 */}
        <Brand to="/">
          2KEA
          <br />
          STUDIO
        </Brand>

        {/* 오른쪽 햄버거 메뉴 */}
        <MenuButton type="button" aria-label="Menu">
          <span />
          <span />
          <span />
        </MenuButton>
      </HeaderInner>
    </HeaderWrap>
  );
}
