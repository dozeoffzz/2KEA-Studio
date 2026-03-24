import styled from "@emotion/styled";
import { NavLink, useNavigate } from "react-router-dom";
import { Theme } from "../../styles/theme";
import plusIcon from "../../assets/icons/plusIcon.svg";
import menuIcon from "../../assets/icons/menuIcon.svg";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../stores/useAuthStore";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${Theme.colors.overlay};
  backdrop-filter: blur(3px);
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  pointer-events: none;

  transition: opacity 0.3s ease;
  z-index: 5;
`;
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
    rgba(250, 250, 250, ${(props) => (props.isOpen || props.isScroll ? 1 : 0)}) 0%,
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

  ${({ theme }) => theme.media.mobile} {
    width: 15px;
  }
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
    font-size: ${Theme.fontsize.mobile.section};
  }
`;

// 오른쪽 상단 햄버거 버튼
const MenuButton = styled.button`
  margin-top: 30px;
  width: 32px;

  ${({ theme }) => theme.media.mobile} {
    width: 15px;
  }
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
  font-size: ${Theme.fontsize.desktop.content};

  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

const Products = styled.p`
  font-size: ${Theme.fontsize.desktop.content};

  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.content};
  }
`;

const LogOut = styled.button`
  font-size: ${Theme.fontsize.desktop.small};

  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.small};
  }

  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const { isLogin, logout } = useAuthStore();

  // 스크롤할때 헤더 불투명하게 하기위해 y축 스크롤이 0보다 크면 트루
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // 유즈이펙트 클린업 함수
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navigate = useNavigate();

  const ClickOpenMenu = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <Overlay isOpen={isOpen} />
      {/* // useState로 호버, 스크롤 값변경하기 위해 프롭스 전달 */}
      <HeaderContainer
        isScroll={isScroll}
        isOpen={isOpen}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <HeaderWrap>
          <PlusButton onClick={ClickOpenMenu}>
            <img src={plusIcon} />
          </PlusButton>
          <Brand to={"/"}>
            <h1>
              2KEA <br /> STUDIO
            </h1>
          </Brand>
          <MenuButton onClick={ClickOpenMenu}>
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
    </>
  );
}
