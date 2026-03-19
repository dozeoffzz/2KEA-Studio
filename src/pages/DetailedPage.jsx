import React, { useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { itemList } from "../services/Apiex";
import { Theme } from "../styles/theme";
import styled from "@emotion/styled";
// 테스트용 이미지
import detailImg1 from "../assets/imgs/detail/detailImg1.svg";
import detailImg2 from "../assets/imgs/detail/detailImg2.webp";
import detailImg3 from "../assets/imgs/detail/detailImg3.webp";
import detailImg4 from "../assets/imgs/detail/detailImg4.webp";
import { useCartStore } from "../stores/useCartStore";
import MoveCartModal from "../components/modals/MoveCartModal";

const MainWrap = styled.div`
  margin-top: 100px;
  width: 100%;
  background-color: ${Theme.colors.white};
`;

const ImgGallery = styled.section`
  margin-bottom: 104px;

  @media screen and (max-width: 1200px) {
    margin-bottom: 36px;
  }

  ${({ theme }) => theme.media.tablet} {
    margin-bottom: 22px;
  }

  ${({ theme }) => theme.media.mobile} {
    margin-bottom: 18px;
  }
`;

const SliderWrap = styled.div`
  position: relative;
  width: 100%;
  height: 45vw;
  max-height: 760px;
  overflow: hidden;

  ${({ theme }) => theme.media.tablet} {
    height: 58vw;
    min-height: 360px;
    max-height: 620px;
  }

  ${({ theme }) => theme.media.mobile} {
    height: 72vw;
    min-height: 260px;
    max-height: 420px;
  }
`;

const Slider = styled.div`
  width: 100%;
  height: 100%;
`;

// 슬라이드 이미지 위치 지정
const SlideItem = styled.div`
  position: absolute;
  top: 50%;

  left: ${(props) => {
    if (props.$position === "left") return "0%";
    if (props.$position === "center") return "50%";
    if (props.$position === "right") return "100%";
    return "50%";
  }};

  // 이미지 최대 크기 설정
  width: 50vw;
  height: 45vw;
  max-width: 986px;
  max-height: 843px;
  overflow: hidden;

  // 애니메이션 효과
  transition:
    transform 0.55s ease,
    left 0.55s ease,
    opacity 0.55s ease;

  // 중앙 이미지 강조
  z-index: ${(props) => (props.$position === "center" ? 3 : 2)};
  opacity: ${(props) => (props.$position === "center" ? 1 : 0.6)};

  transform: ${(props) =>
    props.$position === "center" ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.65)"};
`;

const SlideImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

// 슬라이드 좌우 화살표
const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  font-size: 52px;
  color: ${Theme.colors.textsecondary};
  background: none;
  z-index: 10;

  ${({ theme }) => theme.media.tablet} {
    font-size: 40px;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 40px;
    height: 40px;
    font-size: 26px;
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: 20%;
  transform: translateY(-50%);

  ${({ theme }) => theme.media.mobile} {
    left: 18%;
  }

  @media screen and (max-width: 500px) {
    left: 15%;
  }
`;

const RightArrow = styled(ArrowButton)`
  right: 20%;
  transform: translateY(-50%);

  ${({ theme }) => theme.media.mobile} {
    right: 18%;
  }

  @media screen and (max-width: 500px) {
    right: 15%;
  }
`;

// 제품명
const ProductName = styled.p`
  margin-top: 100px;
  text-align: center;
  font-size: ${Theme.fontsize.desktop.section};
  color: ${Theme.colors.blacktext};

  ${({ theme }) => theme.media.tablet} {
    margin-top: 56px;
    font-size: ${Theme.fontsize.tablet.section};
  }

  ${({ theme }) => theme.media.mobile} {
    margin-top: 40px;
    font-size: ${Theme.fontsize.mobile?.section || "22px"};
  }
`;

const DetailSection = styled.section`
  display: flex;
  gap: 100px;
  justify-content: space-around;
  padding: 0px 50px 200px 50px;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }

  ${({ theme }) => theme.media.tablet} {
    gap: 90px;
    padding: 0px 120px 108px 120px;
  }

  ${({ theme }) => theme.media.mobile} {
    gap: 47px;
    padding: 0px 24px 40px 24px;
  }
`;

// 왼쪽 상세 이미지 구역
const LeftContent = styled.div`
  display: flex;
  justify-content: center;
`;

const DetailImg = styled.img`
  width: 100%;
  min-width: 687px;
  min-height: 1030px;
  max-width: 891px;
  max-height: 1307px;

  ${({ theme }) => theme.media.mobile} {
    min-width: 100%;
    min-height: auto;
    max-width: 100%;
    max-height: auto;
  }
`;

// 오른쪽 주문 정보 구역
const RightContent = styled.aside`
  width: 100%;
  max-width: 535px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1200px) {
    margin: 0 auto;
  }
`;

// 주문박스 고정
const StickyBox = styled.div`
  position: sticky;
  top: 100px;

  ${({ theme }) => theme.media.tablet} {
    position: static;
  }
`;

const InfoGroup = styled.div`
  margin-bottom: 50px;

  ${({ theme }) => theme.media.mobile} {
    margin-bottom: 24px;
  }
`;

const InfoTitle = styled.p`
  padding-bottom: 5px;
  margin-bottom: 10px;
  border-bottom: 3px solid ${Theme.colors.black};
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.blacktext};

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile?.small || "12px"};
  }
`;

const InfoRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.blacktext};

  ${({ theme }) => theme.media.mobile} {
    gap: 14px;
    margin-bottom: 8px;
    font-size: ${Theme.fontsize.mobile?.small || "12px"};
  }
`;

const Label = styled.span`
  min-width: 72px;
`;

const Value = styled.span`
  word-break: keep-all;
`;

// 수량 설정
const QtyWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  margin: 28px 0 18px;

  ${({ theme }) => theme.media.mobile} {
    gap: 14px;
    margin: 22px 0 14px;
  }
`;

const QtyBtn = styled.button`
  color: ${Theme.colors.blacktext};
  font-size: ${Theme.fontsize.desktop.content};

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile?.small || "12px"};
  }
`;

const QtyValue = styled.span`
  color: ${Theme.colors.blacktext};
  font-size: ${Theme.fontsize.desktop.content};

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile?.small || "12px"};
  }
`;

const Price = styled.p`
  margin-bottom: 5px;
  text-align: right;
  color: ${Theme.colors.blacktext};
  font-size: ${Theme.fontsize.desktop.content};

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile?.small || "12px"};
  }
`;

// shopping cart, buy 버튼
const BtnGroup = styled.div`
  margin-top: 22px;
`;

const CardBtn = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 14px;
  background-color: ${Theme.colors.black};
  color: ${Theme.colors.whitetext};
  font-size: ${Theme.fontsize.desktop.content};

  ${({ theme }) => theme.media.mobile} {
    height: 38px;
    margin-top: 10px;
    font-size: ${Theme.fontsize.mobile?.small || "12px"};
  }
`;

// 다른 상품 보러가기 버튼
const Back = styled.button`
  width: 100%;
  margin: 117px 0px 20px 0px;
  padding-bottom: 12px;
  border: none;
  border-bottom: 2px solid ${Theme.colors.textsecondary};
  background: none;
  color: ${Theme.colors.blacktext};
  font-size: ${Theme.fontsize.desktop.content};
  text-align: left;

  ${({ theme }) => theme.media.tablet} {
    margin-top: 56px;
  }

  ${({ theme }) => theme.media.mobile} {
    margin-top: 40px;
    font-size: ${Theme.fontsize.mobile?.small || "12px"};
  }
`;

// 추가 정보
const MoreInfoWrap = styled.div`
  margin-top: 12px;

  ${({ theme }) => theme.media.mobile} {
    margin-top: 4px;
  }
`;

const MoreInfo = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid ${Theme.colors.textsecondary};
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.textsecondary};

  &:last-child {
    border-bottom: none;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile?.small || "12px"};
  }
`;

export default function DetailedPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  // 모달 끄고 닫기
  const [isOpen, setIsOpen] = useState();

  // 수량
  const [quantity, setQuantity] = useState(1);

  // 슬라이드 인덱스
  const [imgIdx, setImgIdx] = useState(0);

  const item = itemList.find((item) => item.id === Number(id));

  if (!item) {
    return <div>존재하지 않는 상품입니다.</div>;
  }

  // 슬라이드 이미지 배열
  const img = [item.image || detailImg2, item.image || detailImg3, item.image || detailImg4];
  const lastIdx = img.length - 1;

  // 이전 인덱스 구하기
  const getPrevIdx = (index) => {
    return index === 0 ? lastIdx : index - 1;
  };

  // 다음 인덱스 구하기
  const getNextIdx = (index) => {
    return index === lastIdx ? 0 : index + 1;
  };

  // 현재 기준 양옆 이미지 인덱스
  const prevIdx = getPrevIdx(imgIdx);
  const nextIdx = getNextIdx(imgIdx);

  // 이미지 위치 지정
  const getImgPosition = (idx) => {
    if (idx === imgIdx) return "center";
    if (idx === prevIdx) return "left";
    if (idx === nextIdx) return "right";
    return "";
  };

  // 총 금액 계산
  const totalPrice = item.price * quantity;

  // 수량 줄이기
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // 수량 늘리기
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  // 전 이미지로
  const handlePrevSlide = () => {
    setImgIdx((prev) => getPrevIdx(prev));
  };

  // 다음 이미지로
  const handleNextSlide = () => {
    setImgIdx((prev) => getNextIdx(prev));
  };
  // 상품 추가
  const handleAdd = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      quantity: quantity,
    });
  };

  return (
    <MainWrap>
      <ImgGallery>
        <SliderWrap>
          <LeftArrow onClick={handlePrevSlide}>‹</LeftArrow>
          <RightArrow onClick={handleNextSlide}>›</RightArrow>
          <Slider>
            {img.map((src, idx) => (
              <SlideItem key={idx} $position={getImgPosition(idx)}>
                <SlideImg src={src} alt={`${item.name} 슬라이드 이미지 ${idx + 1}`} />
              </SlideItem>
            ))}
          </Slider>
        </SliderWrap>

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

            <QtyWrap>
              <QtyBtn onClick={handleDecrease}>-</QtyBtn>
              <QtyValue>{quantity}</QtyValue>
              <QtyBtn onClick={handleIncrease}>+</QtyBtn>
            </QtyWrap>

            <Price>상품 금액: {item.price.toLocaleString()}원</Price>
            <Price>총 금액: {totalPrice.toLocaleString()}원</Price>

            <BtnGroup>
              <CardBtn
                onClick={() => {
                  handleAdd();
                  setIsOpen(true);
                }}
              >
                Shopping Cart
              </CardBtn>
              <CardBtn
                onClick={() => {
                  handleAdd();
                  navigate("/cart");
                }}
              >
                Buy
              </CardBtn>
            </BtnGroup>

            <Back onClick={() => navigate("/allproducts")}>다른 상품 보러가기</Back>

            <MoreInfoWrap>
              <MoreInfo>제품 관리 정보</MoreInfo>
              <MoreInfo>교환 및 반품 정보</MoreInfo>
              <MoreInfo>고객 확인 사항</MoreInfo>
              <MoreInfo>상품 고시 정보</MoreInfo>
              <MoreInfo>커스터마이징</MoreInfo>
            </MoreInfoWrap>
          </StickyBox>
        </RightContent>
      </DetailSection>
      <MoveCartModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </MainWrap>
  );
}
