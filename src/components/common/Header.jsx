import styled from "@emotion/styled";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Theme } from "../../styles/theme";
import plusIcon from "../../assets/icons/plusIcon.svg";
import menuIcon from "../../assets/icons/menuIcon.svg";
import { useContext, useEffect, useState } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import { useLocation } from "react-router-dom";
import { LogoAnimationContext } from "../contexts/LogoAnimationContext";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${Theme.colors.overlay};
  backdrop-filter: blur(3px);
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  pointer-events: ${(props) => (props.isOpen ? "auto" : "none")};

  transition: opacity 0.3s ease;
  z-index: 999;
`;
const HeaderContainer = styled.header`
  padding: 0px 30px;
  position: fixed;
  top: 0;
  width: 100%;
  height: ${(props) => (props.isOpen ? "330px" : "100px")};
  flex-shrink: 0;
  background-color: transparent;
  z-index: 1000;

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
  align-items: center;
`;

// 왼쪽 상단 + 버튼
const PlusButton = styled.button`
  width: 32px;

  ${({ theme }) => theme.media.mobile} {
    width: 15px;
  }
`;

// 가운데 브랜드 로고 텍스트
// Link 태그는 to 는 본인이 사용하고 커스텀 프롭스를 그냥 전달하면 a 태그로 넘김
// 하지만 a 태그는 커스텀 프롭스를 이해하지 못하기 때문에 오류가 발생함
// 스타일 계산만 하고 실제 DOM 요소까지 전달 방지를 위해 shouldForwardProp 키워드 사용
const Brand = styled(Link, { shouldForwardProp: (prop) => prop !== "animated" })`
  display: ${({ animated }) => (animated ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  font-size: ${Theme.fontsize.desktop.main.animationTitle};
  text-align: center;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.main.animationTitle};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.main.animationTitle};
  }
`;

const Logo = styled.h1`
  font-weight: 500;
  letter-spacing: 0.3rem;

  ${({ theme }) => theme.media.tablet} {
    letter-spacing: 0.2rem;
  }

  ${({ theme }) => theme.media.mobile} {
    letter-spacing: 0.1rem;
  }
`;

// 오른쪽 상단 햄버거 버튼
const MenuButton = styled.button`
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
  font-size: ${Theme.fontsize.desktop.content};

  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.content};
  }
`;

//isAnimated: 메인레이아웃에서 선언한 애니메이션 상태 전달받기
export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const { isLogin, logout } = useAuthStore();
  //제공받은 Context 사용
  const { isAnimated } = useContext(LogoAnimationContext);
  //메인페이지는 애니메이션 완료 여부에 따라 로고가 보이고, 다른 페이지는 즉시 로고 보이기
  const animated = location.pathname === "/" ? isAnimated : true;

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

  // 페이지 바뀌면 헤더 닫기
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const ClickOpenMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* 모바일 일때 오버레이 클릭하면 헤더 없어지게 */}
      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
      {/* // useState로 호버, 스크롤 값변경하기 위해 프롭스 전달 */}
      <HeaderContainer isScroll={isScroll} isOpen={isOpen}>
        <HeaderWrap>
          <PlusButton
            onClick={ClickOpenMenu}
            isOpen={isOpen}
            isScroll={isScroll}
            onMouseEnter={() => setIsOpen(true)}
          >
            <img src={plusIcon} />
          </PlusButton>
          <Brand to={"/"} animated={animated}>
            <Logo>2KEA</Logo>
          </Brand>
          <MenuButton
            onClick={ClickOpenMenu}
            isOpen={isOpen}
            isScroll={isScroll}
            onMouseEnter={() => setIsOpen(true)}
          >
            <img src={menuIcon} />
          </MenuButton>
        </HeaderWrap>
        {/* // useState로 값변경하기 위해 프롭스 전달 */}
        <MenuWrap
          isOpen={isOpen}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {/* 왼쪽메뉴 */}
          <LeftMenu>
            <Products>Products</Products>
            <Font to={"/products"}>All</Font>
            <Font to={"/products/seating"}>Seating</Font>
            <Font to={"/products/tables"}>Tables</Font>
            <Font to={"/products/lighting"}>Lighting</Font>
          </LeftMenu>
          <RightMenu>
            {isLogin ? <Font to={"/auth/me"}>MyPage</Font> : null}
            {isLogin ? null : <Font to={"/signup"}>Sign Up</Font>}
            {isLogin ? (
              <LogOut
                onClick={() => {
                  logout();
                  navigate("/", { replace: true });
                  window.scrollTo(0, 0);
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
