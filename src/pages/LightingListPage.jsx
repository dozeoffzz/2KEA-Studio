import styled from "@emotion/styled";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { itemList } from "../services/Apiex";
import backIcon from "../assets/icons/backIcon.svg";
import { Theme } from "../styles/theme";

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
    font-size: ${Theme.fontsize.phone.section};
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
    font-size: ${Theme.fontsize.phone.content};
  }
`;

// 상품 카드 리스트 그리드
const ItemListMain = styled.div`
  width: 100%;
  max-width: 1680px;
  margin: 0 auto;
  padding: 40px 40px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: 483px;
  gap: 40px;

  @media (max-width: 1880px) {
    max-width: 1500px;
    padding: 32px 48px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-auto-rows: auto;
    gap: 32px 24px;
  }

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
  width: 100%;
  height: 65px;
  border-top: 1px solid ${Theme.colors.blacktext};
  border-bottom: 1px solid ${Theme.colors.blacktext};

  @media (max-width: 1880px) {
    height: auto;
    min-height: 52px;
    padding: 8px 0;
    margin-bottom: 8px;
  }

  ${Theme.media.mobile} {
    min-height: 44px;
    padding: 8px 0;
    margin-bottom: 8px;
  }
`;

const ItemNum = styled.span`
  color: ${Theme.colors.yellowaccent};
  font-size: ${Theme.fontsize.desktop.section};

  @media (max-width: 1880px) {
    font-size: ${Theme.fontsize.tablet.section};
  }

  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.phone.section};
  }
`;

const ItemName = styled.span`
  font-size: ${Theme.fontsize.desktop.content};
  text-align: right;

  @media (max-width: 1880px) {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.phone.small};
  }
`;

// 이미지와 세로 설명을 묶는 영역
const ItemImgWrap = styled.div`
  display: flex;
  gap: 10px;
  flex: 1;

  @media (max-width: 1880px) {
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

  @media (max-width: 1880px) {
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
  background-color: ${Theme.colors.overlay};
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 1880px) {
    width: 100%;
    aspect-ratio: ${(props) => (props.large ? "1.8 / 1" : "0.88 / 1")};
    padding: 18px;
  }

  ${Theme.media.tablet} {
    aspect-ratio: ${(props) => (props.large ? "2 / 1" : "1 / 1")};
  }

  ${Theme.media.mobile} {
    width: 100%;
    aspect-ratio: ${(props) => (props.large ? "1.9 / 1" : "0.82 / 1")};
    padding: 12px;
  }
`;

// 실제 상품 이미지
const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
`;

// 하단 페이지네이션 영역
const PageNationWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 70px;
  font-size: ${Theme.fontsize.desktop.content};
  margin-bottom: 40px;

  @media (max-width: 1880px) {
    gap: 32px;
    font-size: ${Theme.fontsize.tablet.content};
    margin-bottom: 36px;
    flex-wrap: wrap;
  }

  ${Theme.media.mobile} {
    gap: 18px;
    font-size: ${Theme.fontsize.phone.content};
    margin-bottom: 28px;
    flex-wrap: wrap;
  }
`;

const CurrentPage = styled.button`
  font-size: ${Theme.fontsize.desktop.content};
  background: transparent;
  border: none;
  cursor: pointer;

  &.active {
    border-bottom: 2px solid ${Theme.colors.blacktext};
  }

  @media (max-width: 1880px) {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.phone.content};
  }
`;

const PageNationButton = styled.button`
  font-size: ${Theme.fontsize.desktop.content};
  background: transparent;
  border: none;
  cursor: pointer;

  @media (max-width: 1880px) {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.phone.content};
  }
`;

// 페이지 컴포넌트
export default function LightingListPage() {
  // 현재 페이지 번호 상태
  const [page, setPage] = useState(1);
  const totalPages = [1];

  const perPage = 7;
  const lightingList = itemList.filter((item) => item.category === "lighting");
  const startIndex = (page - 1) * perPage;
  const currentItems = lightingList.slice(startIndex, startIndex + perPage);

  return (
    <ItemListContainer>
      <TitleWrap className="TitleWrap">
        <BackBtnTitle>
          <BackButton to={"/"}>
            <img src={backIcon} alt="뒤로가기" />
          </BackButton>
          <Title>Lighting</Title>
        </BackBtnTitle>

        <NavLinkWrap>
          <NavLinkList to={"/products"} end>
            All
          </NavLinkList>
          <NavLinkList to={"/products/seating"}>Seating</NavLinkList>
          <NavLinkList to={"/products/tables"}>Tables</NavLinkList>
          <NavLinkList to={"/products/lighting"}>Lighting</NavLinkList>
        </NavLinkWrap>
      </TitleWrap>

      {/* 상품 리스트 */}
      <ItemListMain>
        {currentItems.map((item) => (
          <Item
            key={item.id}
            large={item.large}
            to={`/products/${item.category}/${item.id}`}
          >
            {/* 상품 상단 정보 */}
            <ItemInfo>
              <ItemNum>{item.num}</ItemNum>
              <ItemName>
                {item.name} | {item.material}
              </ItemName>
            </ItemInfo>

            {/* 설명 영역 + 이미지 영역 */}
            <ItemImgWrap>
              <ItemContentWrap>
                <ItemContent>{item.content}</ItemContent>
              </ItemContentWrap>

              <ItemImg large={item.large}>
                <ItemImage
                  src={item.img || item.image || item.thumbnail}
                  alt={item.name}
                />
              </ItemImg>
            </ItemImgWrap>
          </Item>
        ))}
      </ItemListMain>

      {/* 페이지 이동 버튼 */}
      <PageNationWrap>
        <PageNationButton onClick={() => setPage(1)}>First</PageNationButton>
        <PageNationButton onClick={() => setPage(page > 1 ? page - 1 : 1)}>
          Prev
        </PageNationButton>

        {totalPages.map((list) => (
          <CurrentPage
            key={list}
            onClick={() => setPage(list)}
            className={page === list ? "active" : ""}
          >
            {list}
          </CurrentPage>
        ))}

        <PageNationButton
          onClick={() =>
            setPage(page < totalPages.length ? page + 1 : totalPages.length)
          }
        >
          Next
        </PageNationButton>
        <PageNationButton onClick={() => setPage(totalPages.length)}>
          Last
        </PageNationButton>
      </PageNationWrap>
    </ItemListContainer>
  );
}
