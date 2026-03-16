import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { itemList } from "../services/Apiex";
import { Theme } from "../styles/theme";
import styled from "@emotion/styled";
import detailImg1 from "../assets/imgs/detail/detailImg1.svg";
import detailImg2 from "../assets/imgs/detail/detailImg2.webp";
import detailImg3 from "../assets/imgs/detail/detailImg3.webp";
import detailImg4 from "../assets/imgs/detail/detailImg4.webp";

const MainWrapper = styled.div`
  width: 100%;
  background-color: ${Theme.colors.white};
`;

const ImgGallery = styled.section`
  margin-bottom: 72px;
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 45vw;
  max-height: 760px;
  overflow: hidden;
`;

const SliderViewport = styled.div`
  width: 100%;
  height: 100%;
`;

const SlideItem = styled.div`
  position: absolute;
  top: 50%;
  left: ${(props) => {
    if (props.$position === "left") return "0%";
    if (props.$position === "center") return "50%";
    if (props.$position === "right") return "100%";
    return "50%";
  }};

  width: 50vw;
  max-width: 986px;
  height: 45vw;
  max-height: 843px;

  overflow: hidden;
  transform-origin: center center;
  will-change: transform, left, opacity;
  backface-visibility: hidden;
  transition:
    transform 0.75s cubic-bezier(0.22, 1, 0.36, 1),
    left 0.75s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1);

  z-index: ${(props) => (props.$position === "center" ? 3 : 2)};
  opacity: ${(props) => (props.$position === "center" ? 1 : 0.8)};

  transform: ${(props) => {
    if (props.$position === "center") {
      return "translate(-50%, -50%) scale(1)";
    }
    return "translate(-50%, -50%) scale(0.65)";
  }};
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  user-select: none;
  pointer-events: none;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  font-size: 52px;
  color: ${Theme.colors.textsecondary};
`;

const LeftArrow = styled(ArrowButton)`
  left: 20%;
  transform: translateY(-50%);
`;

const RightArrow = styled(ArrowButton)`
  right: 20%;
  transform: translateY(-50%);
`;

const ProductName = styled.p`
  margin-top: 100px;
  text-align: center;
  font-size: ${Theme.fontsize.desktop.section};
  color: ${Theme.colors.blacktext};
`;

// 왼쪽 구역
const DetailSection = styled.section`
  display: flex;
  padding: 20px 130px;
`;

const LeftContent = styled.div`
  flex: 1;
`;

const DetailImg = styled.img`
  width: 100%;
  max-width: 891px;
  max-height: 1552px;
`;

// 오른쪽 구역
const RightContent = styled.aside`
  width: 535px;
`;

// 주문박스 고정
const StickyBox = styled.div`
  position: sticky;
  top: 100px;
`;

const InfoGroup = styled.div`
  margin-bottom: 36px;
`;

const InfoTitle = styled.p`
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 3px solid ${Theme.colors.black};
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.blacktext};
`;

const InfoRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.blacktext};
`;

const Label = styled.span`
  min-width: 72px;
`;

const Value = styled.span``;

const QuantityWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  margin: 28px 0 18px;
`;

const QtyBtn = styled.button`
  color: ${Theme.colors.blacktext};
  font-size: ${Theme.fontsize.desktop.content};
`;

const QtyValue = styled.span`
  color: ${Theme.colors.blacktext};
  font-size: ${Theme.fontsize.desktop.content};
`;

const Price = styled.p`
  margin-bottom: 5px;
  text-align: right;
  color: ${Theme.colors.blacktext};
  font-size: ${Theme.fontsize.desktop.content};
`;

// shopping cart, buy 버튼
const ButtonGroup = styled.div`
  margin-top: 22px;
`;

const CardBtn = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 14px;
  background-color: ${Theme.colors.black};
  color: ${Theme.colors.whitetext};
  font-size: ${Theme.fontsize.desktop.content};
`;

// 다른 상품 보러가기 버튼
const Back = styled.button`
  width: 100%;
  margin: 117px 0px 20px 0px;
  padding-bottom: 12px;
  border-bottom: 2px solid ${Theme.colors.textsecondary};
  color: ${Theme.colors.blacktext};
  font-size: ${Theme.fontsize.desktop.content};
  text-align: left;
`;

// 추가 정보 영역
const MoreInfo = styled.div`
  margin-top: 12px;
`;

const MoreInfoList = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid ${Theme.colors.textsecondary};
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.textsecondary};

  &:last-child {
    border-bottom: none;
  }
`;

export default function DetailedPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const item = itemList.find((item) => item.id === Number(id));

  if (!item) {
    return <div>존재하지 않는 상품입니다.</div>;
  }

  // 이미지 배열
  const imageSlides = [item.image || detailImg3, item.image || detailImg2, item.image || detailImg4];
  const prevIndex = currentIndex === 0 ? imageSlides.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === imageSlides.length - 1 ? 0 : currentIndex + 1;

  // 총 금액 계산
  const totalPrice = item.price * quantity;

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageSlides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentIndex((prev) => (prev === imageSlides.length - 1 ? 0 : prev + 1));
  };

  return (
    <MainWrapper>
      <ImgGallery>
        <SliderWrapper>
          {/* 좌우 화살표 */}
          <LeftArrow onClick={handlePrevSlide}>‹</LeftArrow>
          <RightArrow onClick={handleNextSlide}>›</RightArrow>

          <SliderViewport>
            {imageSlides.map((src, index) => {
              let currentPosition = "";

              if (index === currentIndex) {
                currentPosition = "center";
              } else if (index === prevIndex) {
                currentPosition = "left";
              } else if (index === nextIndex) {
                currentPosition = "right";
              }

              return (
                <SlideItem key={index} $position={currentPosition}>
                  <SlideImage src={src} alt={`${item.name} 슬라이드 이미지 ${index + 1}`} />
                </SlideItem>
              );
            })}
          </SliderViewport>
        </SliderWrapper>

        <ProductName>{item.name} Detail</ProductName>
      </ImgGallery>

      <DetailSection>
        <LeftContent>
          <DetailImg src={detailImg1} alt={`${item.name} 상세 이미지`} />
        </LeftContent>

        <RightContent>
          <StickyBox>
            <InfoGroup>
              <InfoTitle>Note</InfoTitle>
              <InfoRow>
                <Label>Promotion</Label>
                <Value>{item.material}</Value>
              </InfoRow>
            </InfoGroup>

            <InfoGroup>
              <InfoTitle>Delivery</InfoTitle>
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
            </InfoGroup>

            <QuantityWrap>
              <QtyBtn onClick={handleDecrease}>-</QtyBtn>
              <QtyValue>{quantity}</QtyValue>
              <QtyBtn onClick={handleIncrease}>+</QtyBtn>
            </QuantityWrap>

            <Price>상품 금액: {item.price.toLocaleString()}원</Price>
            <Price>총 금액: {totalPrice.toLocaleString()}원</Price>

            <ButtonGroup>
              <CardBtn onClick={() => navigate("/shoppingcart")}>Shopping Cart</CardBtn>
              <CardBtn onClick={() => navigate("/")}>Buy</CardBtn>
            </ButtonGroup>

            <Back onClick={() => navigate("/alllist")}>다른 상품 보러가기</Back>

            <MoreInfo>
              <MoreInfoList>제품 관리 정보</MoreInfoList>
              <MoreInfoList>교환 및 반품 정보</MoreInfoList>
              <MoreInfoList>고객 확인 사항</MoreInfoList>
              <MoreInfoList>상품 고시 정보</MoreInfoList>
              <MoreInfoList>커스터마이징</MoreInfoList>
            </MoreInfo>
          </StickyBox>
        </RightContent>
      </DetailSection>
    </MainWrapper>
  );
}
