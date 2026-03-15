import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ItemList } from "../services/Apiex";
import { Theme } from "../styles/Theme";
import styled from "@emotion/styled";
import { useState } from "react";

const MainWrapper = styled.div`
  width: 100%;
  padding: 47px 44px;
  background-color: ${Theme.colors.white};
  color: ${Theme.colors.black};
`;

// 3분할 레이아웃
const GridWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductTitle = styled.p`
  margin-bottom: 40px;
  font-size: ${Theme.fontsize.desktop.section};
  color: ${Theme.colors.blacktext};
`;

const ProductDesc = styled.div`
  max-width: 737px;
  margin-bottom: 26px;
  color: ${Theme.colors.blacktext};
  font-size: ${Theme.fontsize.desktop.content};
  line-height: 1.5;

  p {
    margin-bottom: 14px;
  }
`;

const MainImg = styled.div`
  width: 737px;
  height: 630px;
  background-color: ${Theme.colors.overlay};
`;

// 중간 영역 스타일링 (세로 텍스트와 작은 이미지)
const MiddleWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  padding-right: 96px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 80px;
`;

const TextLine = styled.div`
  width: 2px;
  height: 180px;
  background-color: ${Theme.colors.black};
`;

const VerticalText = styled.p`
  margin: 0;
  transform: rotate(-90deg);
  white-space: nowrap;
  font-size: ${Theme.fontsize.desktop.section};
  color: ${Theme.colors.blacktext};
`;

const Subimg = styled.div`
  width: 357px;
  height: 417px;
  background-color: ${Theme.colors.overlay};
`;

// 오른쪽 구역
const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoWrap = styled.div``;

const InfoTitle = styled.p`
  border-bottom: 2px solid ${Theme.colors.black};
  margin-bottom: 10px;
  padding-bottom: 10px;
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.blacktext};
`;

const InfoPromotion = styled.div`
  display: flex;
  gap: 20px;
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.blacktext};
`;

// 배송 정보 스타일링
const DeliveryInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.blacktext};
`;

const InfoRow = styled.div`
  display: flex;
  gap: 20px;
`;

const Label = styled.span`
  margin-bottom: 10px;
`;

const Value = styled.span``;

// 수량 조절 스타일링
const QuantityWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 19px;
`;

const QtyBtn = styled.button`
  border: none;
  padding: 0px 10px;
  color: ${Theme.colors.blacktext};
  font-size: ${Theme.fontsize.desktop.content};
`;

const QtyValue = styled.span`
  color: ${Theme.colors.blacktext};
  font-size: ${Theme.fontsize.desktop.content};
`;

const Price = styled.p`
  text-align: right;
  color: ${Theme.colors.blacktext};
  font-size: ${Theme.fontsize.desktop.content};
`;

const CardBtn = styled.button`
  width: 100%;
  height: 50px;
  background-color: ${Theme.colors.black};
  color: ${Theme.colors.whitetext};
  font-size: ${Theme.fontsize.desktop.content};
`;

// 다른 상품 보러가기 버튼 스타일링
const Back = styled.button`
  color: ${Theme.colors.blacktext};
  font-size: ${Theme.fontsize.desktop.content};
  border-bottom: 3px solid ${Theme.colors.textsecondary};
  text-align: left;
  padding-bottom: 13px;
`;

// 추가 정보 스타일링
const MoreInfo = styled.div`
  margin-top: 10px;
`;

const MoreInfoList = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid ${Theme.colors.textsecondary};
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.textsecondary};
`;

export default function DetailedPage() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const item = ItemList.find((item) => item.id === Number(id));

  if (!item) {
    return <div>존재하지 않는 상품입니다.</div>;
  }

  const price = 3380000;
  const totalPrice = price * quantity;

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <MainWrapper>
      {/* 3분할 */}
      <GridWrap>
        {/* 왼쪽 구역 */}
        <LeftWrapper>
          <ProductTitle>{item.name} Detail</ProductTitle>
          <ProductDesc>
            <p>
              1952년 마르셀 브로이어가 디자인한 바실리 의자는 자전거 핸들에서 영감을 받아 최초로 스틸 튜브를 가구에 적용한
              혁신적인 바우하우스 디자인 입니다.
            </p>
            <p>
              가죽 스트랩과 강철 프레임의 조합으로 미니멀리즘과 기능성을 동시에 갖춘 20세기 모더니즘 가구의 상징적인 명작입니다.
            </p>
          </ProductDesc>
          <MainImg></MainImg>
        </LeftWrapper>

        {/* 중앙 구역 */}
        <MiddleWrapper>
          {/* 중앙 버티컬 텍스트 */}
          <TextWrapper>
            <VerticalText>
              {item.name} {item.material}
            </VerticalText>
            <TextLine />
          </TextWrapper>
          <Subimg></Subimg>
        </MiddleWrapper>

        {/* 오른쪽 구역 */}
        <RightWrapper>
          <InfoWrap>
            <InfoTitle>Note</InfoTitle>
            <InfoPromotion>
              <span>Promotion</span>
              <span>{item.material}</span>
            </InfoPromotion>
          </InfoWrap>

          <InfoWrap>
            {/* 배송 정보 */}
            <InfoTitle>Delivery</InfoTitle>
            <DeliveryInfo>
              <InfoRow>
                <Label>배송 방법</Label>
                <Value>직접배송</Value>
              </InfoRow>
              <InfoRow>
                <Label>배송비</Label>
                <Value>무료</Value>
              </InfoRow>
              <InfoRow>
                <Label>배송 기간</Label>
                <Value>25일 ~ 32일</Value>
              </InfoRow>
            </DeliveryInfo>
          </InfoWrap>

          {/* 수량 조절 */}
          <QuantityWrap>
            <QtyBtn onClick={handleDecrease}>-</QtyBtn>
            <QtyValue>{quantity}</QtyValue>
            <QtyBtn onClick={handleIncrease}>+</QtyBtn>
          </QuantityWrap>

          <Price>{totalPrice.toLocaleString()}원</Price>

          <CardBtn>Shopping Cart</CardBtn>
          <CardBtn>Buy</CardBtn>

          <Back onClick={() => navigate("/itemlist")}>다른 상품 보러가기</Back>

          {/* 추가 정보 */}
          <MoreInfo>
            <MoreInfoList>제품 관리 정보</MoreInfoList>
            <MoreInfoList>교환 및 반품 정보</MoreInfoList>
            <MoreInfoList>고객 확인 사항</MoreInfoList>
            <MoreInfoList>상품 고시 정보</MoreInfoList>
            <MoreInfoList>커스터마이징</MoreInfoList>
          </MoreInfo>
        </RightWrapper>
      </GridWrap>
    </MainWrapper>
  );
}
