import styled from "@emotion/styled";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ItemList } from "../services/Apiex";
import backIcon from "../assets/icons/backIcon.svg";

const ItemListContainer = styled.div`
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
  gap: 20px;
`;

const Title = styled.h2`
  font-size: 26px;
`;

const NavLinkWrap = styled.div`
  padding: 0 54px;
  padding-bottom: 20px;
  display: flex;
  gap: 40px;
  border-bottom: 1px solid #999999;
`;

const NavLinkList = styled(NavLink)`
  font-size: 21px;
  color: #999999;
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
  border-top: 1px solid #0c0c0c;
  border-bottom: 1px solid #0c0c0c;
`;

const ItemNum = styled.span`
  font-size: 42px;
`;

const ItemName = styled.span`
  font-size: 21px;
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
  border-left: 1px solid #0c0c0c;
  border-right: 1px solid #0c0c0c;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemContent = styled.p`
  font-size: 12px;
  word-break: keep-all;

  /* 세로쓰기 설정 */
  writing-mode: vertical-lr;
  text-orientation: mixed;

  overflow: hidden;
`;

const ItemImg = styled.div`
  background-color: #999999;
  flex: 1;
`;

const PageNationWrap = styled.div`
  display: flex;
  gap: 70px;
  font-size: 21px;
  margin-bottom: 40px;
`;

const PageNationButton = styled(NavLink)`
  font-size: 21px;
`;

export default function ItemListPage() {
  const goBack = useNavigate();
  const handleGoBack = () => goBack(-1);
  return (
    <>
      <ItemListContainer>
        <TitleWrap className="TitleWrap">
          <BackBtnTitle>
            <button onClick={handleGoBack}>
              <img src={backIcon} />
            </button>
            <Title>Seating</Title>
          </BackBtnTitle>
          <NavLinkWrap>
            <NavLinkList>All</NavLinkList>
            <NavLinkList>Seating</NavLinkList>
            <NavLinkList>Tables</NavLinkList>
            <NavLinkList>Lighting</NavLinkList>
          </NavLinkWrap>
        </TitleWrap>
        <ItemListMain>
          {ItemList.map((item) => (
            <Item key={item.id} large={item.large} to={`/detailpage/${item.id}`}>
              <ItemInfo>
                <ItemNum>{item.num}</ItemNum>
                <ItemName>
                  {item.name} | {item.material}
                </ItemName>
              </ItemInfo>
              <ItemImgWrap>
                <ItemContentWrap>
                  <ItemContent>{item.content}</ItemContent>
                </ItemContentWrap>
                <ItemImg>background</ItemImg>
              </ItemImgWrap>
            </Item>
          ))}
        </ItemListMain>
        <PageNationWrap>
          <PageNationButton>First</PageNationButton>
          <PageNationButton>Prev</PageNationButton>
          <span>1</span>
          <PageNationButton>Next</PageNationButton>
          <PageNationButton>Last</PageNationButton>
        </PageNationWrap>
      </ItemListContainer>
    </>
  );
}
