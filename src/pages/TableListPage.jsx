import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import backIcon from "../assets/icons/backIcon.svg";
import { Theme } from "../styles/theme";
import { fetchProducts } from "../apis/productsApi";

const MOBILE_MEDIA_QUERY = "(max-width: 767px)"; // 767px 이하를 모바일 기준으로 잡아서 이미지 옆 텍스트 노출 여부를 분기

// 페이지 전체 바깥 영역

const ItemListContainer = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;

  // 태블릿에서는 상단 여백을 줄여 화면 높이에 맞게 정리
  ${({ theme }) => theme.media.tablet} {
    margin-top: 80px;
    padding: 0 0 20px;
  }

  // 모바일에서는 상단 여백을 한 번 더 줄여 답답하지 않게 정리
  ${({ theme }) => theme.media.mobile} {
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

  // 태블릿에서는 제목 영역 간격을 줄여 비율을 맞춤
  ${({ theme }) => theme.media.tablet} {
    gap: 28px;
  }

  // 모바일에서는 제목 영역 간격을 더 줄여 세로 공간을 확보
  ${({ theme }) => theme.media.mobile} {
    gap: 20px;
  }
`;

const BackBtnTitle = styled.div`
  padding: 0 54px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;

  // 태블릿에서는 좌우 여백과 요소 간격을 줄여 폭에 맞춤
  ${({ theme }) => theme.media.tablet} {
    padding: 0 32px;
    gap: 14px;
  }

  // 모바일에서는 좌우 여백을 더 줄여 작은 화면에서도 내용이 잘 보이게 함
  ${({ theme }) => theme.media.mobile} {
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

  // 태블릿에서는 제목 크기를 줄여 화면 비율을 맞춤
  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.section};
  }

  // 모바일에서는 제목 크기를 더 줄여 줄바꿈과 겹침을 방지
  ${({ theme }) => theme.media.mobile} {
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
  transition: all 0.3s ease;

  ${({ theme }) => theme.media.tablet} {
    padding: 0 32px 16px;
    gap: 28px;
  }

  ${({ theme }) => theme.media.mobile} {
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

  // 태블릿에서는 본문 글자 크기를 한 단계 줄여 균형을 맞춤
  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${({ theme }) => theme.media.mobile} {
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
  grid-auto-rows: auto;
  gap: 40px;
  transition: all 0.3s ease;

  // 1650px 이하에서는 4열 리스트를 2열 구조로 바꿔서 카드가 갑자기 찌그러지지 않게 조정
  // 1650px 이하에서는 4열을 2열로 바꿔 카드가 가로로 과하게 눌리지 않게 함
  @media screen and (max-width: 1650px) {
    max-width: 1080px;
    padding: 40px 54px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: auto;
    gap: 40px 36px;
  }

  // 태블릿에서는 2열 구조를 유지하면서 전체 여백과 간격을 줄임
  ${({ theme }) => theme.media.tablet} {
    max-width: 100%;
    padding: 30px 32px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: auto;
    gap: 30px 24px;
  }

  // 모바일에서는 카드 간격과 좌우 여백을 더 줄여 작은 화면에 맞춤
  ${({ theme }) => theme.media.mobile} {
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
  transition: all 0.3s ease;

  ${(props) => props.large && `grid-column: span 2;`}

  // 태블릿에서도 큰 카드는 2칸을 유지해서 레이아웃 흐름이 깨지지 않게 함
  ${({ theme }) => theme.media.tablet} {
    ${(props) => props.large && `grid-column: span 2;`}
  }
`;

// 상품 번호 + 이름 정보 바
const ItemInfo = styled.div`
  margin-bottom: 10px;
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 65px;
  border-top: 1px solid ${Theme.colors.blacktext};
  border-bottom: 1px solid ${Theme.colors.blacktext};

  // 태블릿에서는 정보 바 높이를 유지하며 간격만 미세 조정
  ${({ theme }) => theme.media.tablet} {
    min-height: 68px;
    padding: 8px 0;
    margin-bottom: 8px;
  }

  // 모바일에서는 정보 바 높이를 줄여 카드 전체 비율을 맞춤
  ${({ theme }) => theme.media.mobile} {
    min-height: 58px;
    padding: 8px 0;
    margin-bottom: 8px;
  }
`;

const ItemNum = styled.span`
  flex-shrink: 0;
  color: ${Theme.colors.redaccent};
  font-size: ${Theme.fontsize.desktop.section};
  transition: all 0.3s ease;

  // 태블릿에서는 제목 크기를 줄여 화면 비율을 맞춤
  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.section};
  }

  // 모바일에서는 제목 크기를 더 줄여 줄바꿈과 겹침을 방지
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.section};
  }

  @media screen and (max-width: 450px) {
    font-size: 18px;
  }
`;

const ItemTextWrap = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  transition: all 0.3s ease;

  // 모바일에서는 상품명과 재질을 세로로 쌓아 좁은 폭에서도 잘 보이게 함
  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    gap: 2px;
  }
`;

const ItemName = styled.span`
  flex: 0 1 auto;
  min-width: 0;
  font-size: ${Theme.fontsize.desktop.content};
  text-align: right;
  line-height: 1.2;
  word-break: keep-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: all 0.3s ease;

  // 태블릿에서는 본문 글자 크기를 한 단계 줄여 균형을 맞춤
  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  // 모바일에서는 텍스트를 전체 폭으로 사용하고 글자 크기를 줄여 줄바꿈에 대응
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    font-size: ${Theme.fontsize.mobile.small};
  }

  @media screen and (max-width: 450px) {
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

const ItemSeparator = styled.span`
  flex-shrink: 0;
  font-size: ${Theme.fontsize.desktop.content};
  line-height: 1.2;

  // 태블릿에서는 본문 글자 크기를 한 단계 줄여 균형을 맞춤
  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  // 모바일에서는 구분선을 숨겨 세로 배치가 자연스럽게 보이게 함
  ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`;

const ItemMaterial = styled.span`
  flex-shrink: 0;
  font-size: ${Theme.fontsize.desktop.small};
  text-align: right;
  line-height: 1.2;
  color: ${Theme.colors.textsecondary};
  word-break: keep-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: all 0.3s ease;
  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.small};
  }

  // 모바일에서는 텍스트를 전체 폭으로 사용하고 글자 크기를 줄여 줄바꿈에 대응
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    font-size: ${Theme.fontsize.mobile.small};
  }

  @media screen and (max-width: 450px) {
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

// 이미지와 세로 설명을 묶는 영역
const ItemImgWrap = styled.div`
  display: flex;
  gap: 10px;
  flex: 1;
  min-width: 0;
  align-items: stretch;
  transition: all 0.3s ease;

  // 태블릿 이하에서는 세로 텍스트 영역을 빼고 이미지만 보이게 해서 답답함을 줄임
  ${({ theme }) => theme.media.tablet} {
    gap: 0;
    display: block;
  }
`;

// PC에서만 보이는 세로 설명 영역
const ItemContentWrap = styled.div`
  flex: 0 0 65px;
  width: 65px;
  align-self: stretch;
  border-left: 1px solid ${Theme.colors.blacktext};
  border-right: 1px solid ${Theme.colors.blacktext};
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  transition: all 0.3s ease;

  // 태블릿 이하에서는 이미지 옆 세로 설명을 숨겨 이미지 영역을 더 넓게 사용
  ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`;

const ItemContent = styled.p`
  padding: 18px 0;
  font-size: ${Theme.fontsize.desktop.small};
  word-break: keep-all;
  writing-mode: vertical-lr;
  text-orientation: mixed;
  overflow: hidden;
`;

const ItemImg = styled.div`
  position: relative;
  background-color: ${Theme.colors.overlay};
  flex: 1;
  min-width: 0;
  aspect-ratio: ${(props) => (props.large ? "2.06 / 1" : "1 / 1")};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.3s ease;
  // 태블릿에서는 이미지 비율과 내부 여백을 조정해 카드가 한쪽으로만 찌그러지지 않게 함
  ${({ theme }) => theme.media.tablet} {
    width: 100%;
    aspect-ratio: ${(props) => (props.large ? "2.4 / 1" : "1.18 / 1")};
    padding: 18px;
  }

  // 모바일에서는 이미지 비율과 여백을 한 번 더 줄여 작은 화면에서도 균형을 유지
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    aspect-ratio: ${(props) => (props.large ? "2.2 / 1" : "1.08 / 1")};
    padding: 12px;
  }
`;

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
  transition: all 0.3s ease;

  // 태블릿에서는 페이지네이션 간격을 줄이고 줄바꿈을 허용해 공간을 확보
  ${({ theme }) => theme.media.tablet} {
    gap: 32px;
    font-size: ${Theme.fontsize.tablet.content};
    margin-bottom: 36px;
    flex-wrap: wrap;
  }

  ${({ theme }) => theme.media.mobile} {
    gap: 50px;
    font-size: ${Theme.fontsize.mobile.content};
    margin-bottom: 28px;
    flex-wrap: wrap;
  }

  @media screen and (max-width: 450px) {
    gap: 40px;
  }
`;

const CurrentPage = styled.button`
  font-size: ${Theme.fontsize.desktop.content};
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${Theme.colors.blacktext};
  transition: all 0.3s ease;

  &.active {
    border-bottom: 2px solid ${Theme.colors.blacktext};
  }

  // 태블릿에서는 본문 글자 크기를 한 단계 줄여 균형을 맞춤
  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.content};
  }
`;

const PageNationButton = styled.button`
  font-size: ${Theme.fontsize.desktop.content};
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${Theme.colors.blacktext};

  // 태블릿에서는 본문 글자 크기를 한 단계 줄여 균형을 맞춤
  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }

  @media screen and (max-width: 450px) {
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

// 페이지 컴포넌트
export default function TableListPage() {
  // 현재 페이지 번호 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [category, setCategory] = useState("table");
  const [hoverImg, setHoverImg] = useState(null);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_MEDIA_QUERY).matches);

  useEffect(() => {
    const mobileMediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);

    const handleMobileChange = (event) => {
      setIsMobile(event.matches);
    };

    if (mobileMediaQuery.addEventListener) {
      mobileMediaQuery.addEventListener("change", handleMobileChange);
    } else {
      mobileMediaQuery.addListener(handleMobileChange);
    }

    return () => {
      if (mobileMediaQuery.removeEventListener) {
        mobileMediaQuery.removeEventListener("change", handleMobileChange);
      } else {
        mobileMediaQuery.removeListener(handleMobileChange);
      }
    };
  }, []);

  // products api 받아오기
  const [item, setItem] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        // 페이지 api 받은데로 카테고리,현재페이지,보여줄 상품 제안수 보내기
        const res = await fetchProducts({
          category,
          page: currentPage,
          limit: 7,
        });
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
            <Title>Tables</Title>
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
                <ItemTextWrap>
                  <ItemName>{item.name}</ItemName>
                  <ItemSeparator>|</ItemSeparator>
                  <ItemMaterial>{item.material}</ItemMaterial>
                </ItemTextWrap>
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
