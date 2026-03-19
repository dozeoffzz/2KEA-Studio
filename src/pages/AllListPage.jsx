import styled from "@emotion/styled";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { itemList } from "../services/Apiex";
import backIcon from "../assets/icons/backIcon.svg";
import { Theme } from "../styles/theme";

const ItemListContainer = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
`;

const BackBtnTitle = styled.div`
  padding: 0 54px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h2`
  font-size: ${Theme.fontsize.desktop.section};
`;

const NavLinkWrap = styled.div`
  padding: 0 54px;
  padding-bottom: 20px;
  display: flex;
  gap: 40px;
  border-bottom: 1px solid ${Theme.colors.textsecondary};
`;

const NavLinkList = styled(NavLink)`
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.textsecondary};

  &.active {
    color: ${Theme.colors.blacktext};
  }
`;

const ItemListMain = styled.div`
  padding: 40px 20px;
  display: grid;
  grid-template-columns: repeat(4, 425px);
  grid-auto-rows: 483px;
  gap: 40px;
`;

const Item = styled(NavLink)`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* overflow: hidden; */

  ${(props) => props.large && `grid-column: span 2;`}
`;

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
`;

const ItemNum = styled.span`
  font-size: ${Theme.fontsize.desktop.section};

  color: ${(props) => {
    if (props.category === "seating") return Theme.colors.greentext;
    if (props.category === "table") return Theme.colors.redaccent;
    if (props.category === "lighting") return Theme.colors.yellowaccent;
  }};
`;

const ItemName = styled.span`
  font-size: ${Theme.fontsize.desktop.content};
`;

const ItemImgWrap = styled.div`
  display: flex;
  gap: 10px;
  flex: 1;
`;

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
`;

const ItemContent = styled.p`
  font-size: ${Theme.fontsize.desktop.small};
  word-break: keep-all;

  /* 세로쓰기 설정 */
  writing-mode: vertical-lr;
  text-orientation: mixed;

  overflow: hidden;
`;

const ItemImg = styled.div`
  background-color: ${Theme.colors.overlay};
  flex: 1;
`;

const PageNationWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 70px;
  font-size: ${Theme.fontsize.desktop.content};
  margin-bottom: 40px;
`;

const CurrentPage = styled.button`
  font-size: ${Theme.fontsize.desktop.content};
  &.active {
    border-bottom: 2px solid ${Theme.colors.blacktext};
  }
`;

const PageNationButton = styled.button`
  font-size: ${Theme.fontsize.desktop.content};
`;

export default function AllListPage() {
  const [page, setPage] = useState(1);
  const totalPages = [1, 2, 3, 4];

  const allPerPage = 7;

  const startIndex = (page - 1) * allPerPage;
  const currentItems = itemList.slice(startIndex, startIndex + allPerPage);

  return (
    <>
      <ItemListContainer>
        <TitleWrap className="TitleWrap">
          <BackBtnTitle>
            <NavLink to={"/"}>
              <img src={backIcon} />
            </NavLink>
            <Title>All</Title>
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
        <ItemListMain>
          {currentItems.map((item) => (
            <Item key={item.id} large={item.large} to={`/products/${item.category}/${item.id}`}>
              <ItemInfo>
                <ItemNum category={item.category}>{item.num}</ItemNum>
                <ItemName>
                  {item.name} | {item.material}
                </ItemName>
              </ItemInfo>
              <ItemImgWrap>
                <ItemContentWrap>
                  <ItemContent>{item.content}</ItemContent>
                </ItemContentWrap>
                <ItemImg></ItemImg>
              </ItemImgWrap>
            </Item>
          ))}
        </ItemListMain>
        <PageNationWrap>
          <PageNationButton onClick={() => setPage(1)}>First</PageNationButton>
          <PageNationButton onClick={() => setPage(page > 1 ? page - 1 : 1)}>Prev</PageNationButton>
          {totalPages.map((list) => (
            <CurrentPage key={list} onClick={() => setPage(list)} className={page === list ? "active" : ""}>
              {list}
            </CurrentPage>
          ))}
          <PageNationButton onClick={() => setPage(page < totalPages.length ? page + 1 : totalPages.length)}>
            Next
          </PageNationButton>
          <PageNationButton onClick={() => setPage(4)}>Last</PageNationButton>
        </PageNationWrap>
      </ItemListContainer>
    </>
  );
}
