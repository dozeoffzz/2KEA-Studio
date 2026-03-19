import styled from "@emotion/styled";
import { NavLink, useNavigate } from "react-router-dom";
import { Theme } from "../../styles/theme";
import plusIcon from "../../assets/icons/plusIcon.svg";
import menuIcon from "../../assets/icons/menuIcon.svg";
import { useState } from "react";
import { useAuthStore } from "../../stores/useAuthStore";

const HeaderContainer = styled.header`
  padding: 0px 30px;
  position: fixed;
  top: 0;
  width: 100%;
  height: ${(props) => (props.isOpen ? "330px" : "100px")};
  flex-shrink: 0;
  background-color: transparent;
  z-index: 10;

  background: linear-gradient(
    to bottom,
    rgba(250, 250, 250, ${(props) => (props.isOpen ? 1 : 0)}) 0%,
    rgba(250, 250, 250, 0) 100%
  );
  transition: all 0.4s ease;
`;
// 상단 헤더 영역
const HeaderWrap = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: flex-start;
`;

// 왼쪽 상단 + 버튼
const PlusButton = styled.button`
  margin-top: 30px;
  width: 32px;
`;

// 가운데 브랜드 로고 텍스트
const Brand = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${Theme.fontsize.desktop.section};
  text-align: center;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.section};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.phone.section};
  }
`;

// 오른쪽 상단 햄버거 버튼
const MenuButton = styled.button`
  margin-top: 30px;
  width: 32px;
`;

const MenuWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  /* isOpen이 true면 투명도를 없앤다 */
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  /* 숨겨져 있을때 클릭 방지 */
  pointer-events: ${(props) => (props.isOpen ? "auto" : "none")};
  transition: all 0.4s ease;
`;

const LeftMenu = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  text-align: left;
`;
const RightMenu = styled(LeftMenu)`
  text-align: right;
`;

const Font = styled(NavLink)`
  font-size: ${Theme.fontsize.desktop.small};

  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.small};
  }

  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.phone.small};
  }
`;

const Products = styled.p`
  font-size: ${Theme.fontsize.desktop.content};

  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.phone.content};
  }
`;

const LogOut = styled.button`
  font-size: ${Theme.fontsize.desktop.small};

  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.small};
  }

  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.phone.small};
  }
`;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLogin, logout } = useAuthStore();
  const navigate = useNavigate();
  return (
    // useState로 값변경하기 위해 프롭스 전달
    <HeaderContainer isOpen={isOpen} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <HeaderWrap>
        <PlusButton>
          <img src={plusIcon} />
        </PlusButton>
        <Brand to={"/"}>
          <h1>
            2KEA <br /> STUDIO
          </h1>
        </Brand>
        <MenuButton>
          <img src={menuIcon} />
        </MenuButton>
      </HeaderWrap>
      {/* // useState로 값변경하기 위해 프롭스 전달 */}
      <MenuWrap isOpen={isOpen} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
        {/* 왼쪽메뉴 */}
        <LeftMenu>
          <Products>Products</Products>
          <Font to={"/products"}>All</Font>
          <Font to={"/products/seating"}>Seating</Font>
          <Font to={"/products/tables"}>Tables</Font>
          <Font to={"/products/lighting"}>Lighting</Font>
        </LeftMenu>
        <RightMenu>
          {isLogin ? null : <Font to={"/signup"}>Sign Up</Font>}
          {isLogin ? (
            <LogOut
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              LogOut
            </LogOut>
          ) : (
            <Font to={"/login"}>Login</Font>
          )}
          <Font to={"/cart"}>Cart</Font>
        </RightMenu>
      </MenuWrap>
    </HeaderContainer>
  );
}
