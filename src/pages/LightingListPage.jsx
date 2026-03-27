import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import backIcon from "../assets/icons/backIcon.svg";
import { Theme } from "../styles/theme";
import { fetchProducts } from "../apis/productsApi";

// 페이지 전체 바깥 영역

const ItemListContainer = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;

  ${Theme.media.tablet} {
    margin-top: 80px;
    padding: 0 0 20px;
  }

  ${Theme.media.mobile} {
    margin-top: 70px;
    padding: 0 0 20px;
  }
`;

// 상단 타이틀 + 카테고리 메뉴 영역
const TitleWrap = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;

  ${Theme.media.tablet} {
    gap: 28px;
  }

  ${Theme.media.mobile} {
    gap: 20px;
  }
`;

const BackBtnTitle = styled.div`
  padding: 0 54px;
  display: flex;
  align-items: center;
  gap: 20px;

  ${Theme.media.tablet} {
    padding: 0 32px;
    gap: 14px;
  }

  ${Theme.media.mobile} {
    padding: 0 20px;
    gap: 10px;
  }
`;

// 뒤로가기 버튼
const BackButton = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    display: block;
  }
`;

const Title = styled.h2`
  font-size: ${Theme.fontsize.desktop.section};

  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.section};
  }

  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.section};
  }
`;

const NavLinkWrap = styled.div`
  padding: 0 54px;
  padding-bottom: 20px;
  display: flex;
  gap: 40px;
  border-bottom: 1px solid ${Theme.colors.textsecondary};
  width: 100%;

  ${Theme.media.tablet} {
    padding: 0 32px 16px;
    gap: 28px;
  }

  ${Theme.media.mobile} {
    padding: 0 20px 14px;
    gap: 18px;
  }
`;

// 카테고리 탭 링크
const NavLinkList = styled(NavLink)`
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.textsecondary};

  &.active {
    color: ${Theme.colors.blacktext};
  }

  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.content};
  }
`;

// 상품 카드 리스트 그리드
const ItemListMain = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: 40px 40px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: 483px;
  gap: 40px;

  ${Theme.media.tablet} {
    max-width: 100%;
    padding: 30px 32px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: auto;
    gap: 30px 24px;
  }

  ${Theme.media.mobile} {
    padding: 24px 20px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: auto;
    gap: 24px 16px;
  }
`;

// 개별 상품 카드
const Item = styled(NavLink)`
  width: 100%;
  display: flex;
  flex-direction: column;
  grid-column: span 1;

  ${(props) => props.large && `grid-column: span 2;`}

  ${Theme.media.tablet} {
    ${(props) => props.large && `grid-column: span 2;`}
  }
`;

// 상품 번호 + 이름 정보 바
const ItemInfo = styled.div`
  margin-bottom: 10px;
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 65px;
  border-top: 1px solid ${Theme.colors.blacktext};
  border-bottom: 1px solid ${Theme.colors.blacktext};

  ${Theme.media.tablet} {
    height: 68px;
    padding: 8px 0;
    margin-bottom: 8px;
  }

  ${Theme.media.mobile} {
    height: 58px;
    padding: 8px 0;
    margin-bottom: 8px;
  }
`;

const ItemNum = styled.span`
  flex-shrink: 0;
  color: ${Theme.colors.yellowaccent};
  font-size: ${Theme.fontsize.desktop.section};

  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.section};
  }

  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.section};
  }
`;

const ItemName = styled.span`
  flex: 1;
  min-width: 0;
  font-size: ${Theme.fontsize.desktop.content};
  text-align: right;
  line-height: 1.2;
  white-space: nowrap;
  word-break: keep-all;
  overflow: hidden;
  text-overflow: ellipsis;

  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

// 이미지와 세로 설명을 묶는 영역
const ItemImgWrap = styled.div`
  display: flex;
  gap: 10px;
  flex: 1;

  ${Theme.media.tablet} {
    gap: 0;
    display: block;
  }
`;

// PC에서만 보이는 세로 설명 영역
const ItemContentWrap = styled.div`
  margin-bottom: 10px;
  padding: 5px 0;
  width: 65px;
  height: 100%;
  border-left: 1px solid ${Theme.colors.blacktext};
  border-right: 1px solid ${Theme.colors.blacktext};
  display: flex;
  justify-content: center;
  align-items: center;

  ${Theme.media.tablet} {
    display: none;
  }
`;

const ItemContent = styled.p`
  font-size: ${Theme.fontsize.desktop.small};
  word-break: keep-all;
  writing-mode: vertical-lr;
  text-orientation: mixed;
  overflow: hidden;
`;

// 회색 배경 이미지 박스
const ItemImg = styled.div`
  position: relative;
  background-color: ${Theme.colors.overlay};
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  ${Theme.media.tablet} {
    width: 100%;
    aspect-ratio: ${(props) => (props.large ? "2.4 / 1" : "1.18 / 1")};
    padding: 18px;
  }

  ${Theme.media.mobile} {
    width: 100%;
    aspect-ratio: ${(props) => (props.large ? "2.2 / 1" : "1.08 / 1")};
    padding: 12px;
  }
`;

// 하단 페이지네이션 영역
const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.9s ease;
`;

const PageNationWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 70px;
  font-size: ${Theme.fontsize.desktop.content};
  margin-bottom: 40px;

  ${Theme.media.tablet} {
    gap: 32px;
    font-size: ${Theme.fontsize.tablet.content};
    margin-bottom: 36px;
    flex-wrap: wrap;
  }

  ${Theme.media.mobile} {
    gap: 50px;
    font-size: ${Theme.fontsize.mobile.content};
    margin-bottom: 28px;
    flex-wrap: wrap;
  }
`;

const CurrentPage = styled.button`
  font-size: ${Theme.fontsize.desktop.content};
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${Theme.colors.blacktext};

  &.active {
    border-bottom: 2px solid ${Theme.colors.blacktext};
  }

  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.content};
  }
`;

const PageNationButton = styled.button`
  font-size: ${Theme.fontsize.desktop.content};
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${Theme.colors.blacktext};

  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

// 페이지 컴포넌트
export default function LightingListPage() {
  // 현재 페이지 번호 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [category, setCategory] = useState("lighting");
  const [hoverImg, setHoverImg] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleMobile = (event) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMobile);
    } else {
      mediaQuery.addListener(handleMobile);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMobile);
      } else {
        mediaQuery.removeListener(handleMobile);
      }
    };
  }, []);

  // products api 받아오기
  const [item, setItem] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        // 페이지 api 받은데로 카테고리,현재페이지,보여줄 상품 제안수 보내기
        const res = await fetchProducts({ category, page: currentPage, limit: 7 });
        setItem(res.data);
        setTotalPage(res.totalPage);
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();
  }, [currentPage, category]);
  // 페이지네이션을 위해 배열로 만들어 주기
  const totalPages = Array.from({ length: totalPage }, (_, i) => i + 1);

  return (
    <>
      <ItemListContainer>
        <TitleWrap className="TitleWrap">
          <BackBtnTitle>
            <BackButton to={"/"}>
              <img src={backIcon} />
            </BackButton>
            <Title>Lighting</Title>
          </BackBtnTitle>
          <NavLinkWrap>
            <NavLinkList to={"/products"} end>
              All
            </NavLinkList>
            <NavLinkList to={"/products/seating"} onClick={() => setCategory("seating")}>
              Seating
            </NavLinkList>
            <NavLinkList to={"/products/tables"} onClick={() => setCategory("table")}>
              Tables
            </NavLinkList>
            <NavLinkList to={"/products/lighting"} onClick={() => setCategory("lighting")}>
              Lighting
            </NavLinkList>
          </NavLinkWrap>
        </TitleWrap>
        <ItemListMain>
          {item.map((item, index) => (
            <Item key={item.id} large={item.large ? 1 : 0} to={`/products/${item.category}/${item.id}`}>
              <ItemInfo>
                <ItemNum>{item.num}</ItemNum>
                <ItemName>
                  {item.name} | {item.material}
                </ItemName>
              </ItemInfo>
              <ItemImgWrap>
                {!isMobile && (
                  <ItemContentWrap>
                    <ItemContent>{item.content}</ItemContent>
                  </ItemContentWrap>
                )}
                <ItemImg
                  large={item.large ? 1 : 0}
                  onMouseEnter={() => setHoverImg(index)}
                  onMouseLeave={() => setHoverImg(null)}
                >
                  <Img src={item.src[0]} alt={item.name} visible={hoverImg !== index} />
                  <Img src={item.src[1]} alt={item.name} visible={hoverImg === index} />
                </ItemImg>
              </ItemImgWrap>
            </Item>
          ))}
        </ItemListMain>
        <PageNationWrap>
          <PageNationButton onClick={() => setCurrentPage(1)}>First</PageNationButton>
          <PageNationButton onClick={() => setCurrentPage(1)}>Prev</PageNationButton>
          {totalPages.map((list) => (
            <CurrentPage
              key={list}
              onClick={() => setCurrentPage(list)}
              className={currentPage === list ? "active" : ""}
            >
              {list}
            </CurrentPage>
          ))}
          <PageNationButton>Next</PageNationButton>
          <PageNationButton>Last</PageNationButton>
        </PageNationWrap>
      </ItemListContainer>
    </>
  );
}
