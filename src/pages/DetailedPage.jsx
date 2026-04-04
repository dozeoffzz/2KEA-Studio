import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import { Theme } from "../styles/theme";

// 테스트용 이미지
import { useCartStore } from "../stores/useCartStore";
import MoveCartModal from "../components/modals/MoveCartModal";
import { detailApi } from "../apis/detailApi";

// 리뷰 API
import { getReviews } from "../apis/reviewService";
import { useAuthStore } from "../stores/useAuthStore";

import DetailedPageReview from "../pages/DetailedPageReview";

// 추가 정보 내용
const accordionItems = [
  {
    title: "제품 관리 정보",
    content:
      "직사광선이나 고온다습한 환경은 제품의 변형 및 변색 원인이 될 수 있으므로 피해주세요. 오염이 발생한 경우에는 부드러운 마른 천으로 가볍게 닦아 관리해 주세요. 거친 수세미, 화학 세제, 강한 마찰은 표면 손상의 원인이 될 수 있습니다.",
  },
  {
    title: "교환 및 반품 정보",
    content:
      "단순 변심에 의한 교환 및 반품은 상품 수령 후 7일 이내 접수 가능합니다. 단, 제품을 사용하였거나 고객 부주의로 인한 훼손이 발생한 경우에는 교환 및 반품이 제한될 수 있습니다. 상품의 포장, 구성품, 안내서 등이 누락되지 않은 상태로 접수해 주셔야 합니다.",
  },
  {
    title: "고객 확인 사항",
    content:
      "모니터 해상도 및 촬영 환경에 따라 실제 제품의 색상은 화면과 다르게 보일 수 있습니다. 측정 방식에 따라 사이즈는 약간의 오차가 발생할 수 있습니다. 소재 및 제작 공정 특성상 미세한 스크래치, 결 차이, 톤 차이는 불량 사유에 해당하지 않습니다.",
  },
  {
    title: "상품 고시 정보",
    content:
      "품명, 소재, 색상, 사이즈 등 세부 정보는 상세페이지 내 상품 정보를 참고해 주세요. 제조국 및 제조 관련 정보는 상품별 상세 안내 기준에 따라 제공됩니다. 배송 및 설치 관련 내용 또한 상품 안내 정보를 함께 확인해 주세요.",
  },
  {
    title: "커스터마이징",
    content:
      "사이즈 및 마감 방식에 따라 주문 제작이 가능한 상품입니다. 맞춤 제작 특성상 상담 후 제작이 진행되며, 제작 완료 후 교환 및 반품은 어려울 수 있습니다. 원하시는 사양이 있는 경우 문의를 통해 상세 안내를 받아보실 수 있습니다.",
  },
];

const MainWrap = styled.div`
  margin-top: 180px;
  width: 100%;
  background-color: ${Theme.colors.white};
`;

const ImgGallery = styled.section`
  margin-bottom: 104px;

  @media screen and (max-width: 1200px) {
    margin-bottom: 90px;
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
  height: 44vw;
  max-height: 760px;
  overflow: hidden;

  ${({ theme }) => theme.media.tablet} {
    height: 52vw;
    transition: 0.45s ease;
  }

  ${({ theme }) => theme.media.mobile} {
    height: 52vw;
    transition: 0.45s ease;
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

  ${({ theme }) => theme.media.tablet} {
    width: 50vw;
    height: 50vw;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 52vw;
    height: 52vw;
  }

  // 애니메이션 효과
  transition:
    transform 0.55s ease,
    left 0.55s ease,
    opacity 0.55s ease;

  // 중앙 이미지 강조
  opacity: ${(props) => {
    if (props.$position === "center") return 1;
    // 양 옆이미지 40%만 보이게 설정
    if (props.$position === "left" || props.$position === "right") return 0.4;
    // 뒤쪽 이미지 12%만 보이게 설정
    return 0.12;
  }};

  z-index: ${(props) => {
    // 제일 앞
    if (props.$position === "center") return 3;
    if (props.$position === "left" || props.$position === "right") return 2;
    // 제일 뒤
    return 1;
  }};

  // 슬라이드 이미지 크기
  transform: ${(props) => {
    if (props.$position === "center") {
      return "translate(-50%, -50%) scale(1)";
    } else if (props.$position === "left" || props.$position === "right") {
      return "translate(-50%, -50%) scale(0.65)";
    } else {
      // 3장 이상일 때 현재/양옆 말고 뒤에 깔리는 이미지
      return "translate(-50%, -50%) scale(0.5)";
    }
  }};
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

  @media screen and (max-width: 440px) {
    width: 30px;
    height: 30px;
    font-size: 20px;
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: 20%;
  transform: translateY(-50%);
  transition: 0.45s ease;

  ${({ theme }) => theme.media.mobile} {
    left: 18%;
  }

  @media screen and (max-width: 600px) {
    left: 16%;
  }

  @media screen and (max-width: 500px) {
    left: 15%;
  }

  @media screen and (max-width: 440px) {
    left: 16%;
  }
`;

const RightArrow = styled(ArrowButton)`
  right: 20%;
  transform: translateY(-50%);
  transition: 0.45s ease;

  ${({ theme }) => theme.media.mobile} {
    right: 18%;
  }

  @media screen and (max-width: 600px) {
    right: 16%;
  }

  @media screen and (max-width: 500px) {
    right: 15%;
  }

  @media screen and (max-width: 440px) {
    right: 16%;
  }
`;

// 제품명
const ProductName = styled.p`
  margin-top: 80px;
  text-align: center;
  font-size: ${Theme.fontsize.desktop.section};
  color: ${Theme.colors.blacktext};

  ${({ theme }) => theme.media.tablet} {
    margin: 56px 0;
    font-size: ${Theme.fontsize.tablet.section};
  }

  ${({ theme }) => theme.media.mobile} {
    margin: 40px 0;
    font-size: 22px;
  }
`;

const DetailSection = styled.section`
  display: flex;
  align-items: flex-start;
  gap: 48px;
  padding: 0 100px 50px;
  margin-bottom: 100px;

  @media screen and (max-width: 1280px) {
    gap: 36px;
    padding: 0 70px 50px;
    transition: 0.45s ease;
  }

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    gap: 48px;
    padding: 0 40px 50px;
    margin-bottom: 60px;
    transition: 0.45s ease;
  }

  ${({ theme }) => theme.media.mobile} {
    gap: 32px;
    padding: 0 20px 40px;
    margin-bottom: 40px;
  }
`;

// 왼쪽 상세 이미지 구역
const LeftContent = styled.div`
  flex: 1.2;
  align-self: flex-start;
  display: flex;
  justify-content: flex-start;

  ${({ theme }) => theme.media.tablet} {
    margin: 0 auto;
    justify-content: center;
    margin-bottom: 50px;
  }

  ${({ theme }) => theme.media.mobile} {
    margin: 0 auto;
    justify-content: center;
  }
`;

const DetailImg = styled.img`
  width: 100%;
  max-width: 760px;
  min-width: 600px;
  height: auto;
  display: block;

  ${({ theme }) => theme.media.mobile} {
    max-width: 600px;
    min-width: 300px;
    margin-bottom: 50px;
  }
`;

// 오른쪽 주문 정보 구역
const RightContent = styled.aside`
  flex: 0.7;
  width: 100%;
  min-width: 0;
  max-width: 460px;
  align-self: stretch;

  ${({ theme }) => theme.media.tablet} {
    align-self: auto;
    max-width: 700px;
    margin: 0 auto;
  }

  ${({ theme }) => theme.media.mobile} {
    max-width: 550px;
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
  margin-bottom: 23px;
`;

const InfoTitle = styled.p`
  padding-bottom: 5px;
  margin-bottom: 10px;
  border-bottom: 2px solid ${Theme.colors.black};
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.blacktext};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

const InfoRow = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 10px;
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.blacktext};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${({ theme }) => theme.media.mobile} {
    gap: 15px;
    margin-bottom: 8px;
    font-size: ${Theme.fontsize.mobile.mini};
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

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

const QtyValue = styled.span`
  color: ${Theme.colors.blacktext};
  font-size: ${Theme.fontsize.desktop.content};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

const Price = styled.p`
  margin-bottom: 5px;
  text-align: right;
  color: ${Theme.colors.blacktext};
  font-size: ${Theme.fontsize.desktop.content};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

// shopping cart, buy 버튼
const BtnGroup = styled.div`
  margin-top: 5px;
`;

const CardBtn = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 14px;
  background-color: ${Theme.colors.black};
  color: ${Theme.colors.whitetext};
  font-size: ${Theme.fontsize.desktop.content};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${({ theme }) => theme.media.mobile} {
    height: 38px;
    margin-top: 10px;
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

// 다른 상품 보러가기 버튼
const Back = styled.button`
  width: 100%;
  margin-top: 37px;
  padding-bottom: 12px;
  border: none;
  border-bottom: 2px solid ${Theme.colors.textsecondary};
  background: none;
  color: ${Theme.colors.blacktext};
  font-size: ${Theme.fontsize.desktop.content};
  text-align: left;

  ${({ theme }) => theme.media.tablet} {
    margin-top: 43px;
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${({ theme }) => theme.media.mobile} {
    margin-top: 30px;
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

// 추가 정보 아코디언
const MoreInfoWrap = styled.div`
  margin-top: 12px;

  ${({ theme }) => theme.media.mobile} {
    margin-top: 4px;
  }
`;

const AccordionItem = styled.div`
  border-bottom: 1px solid ${Theme.colors.textsecondary};

  &:last-child {
    border-bottom: 1px solid ${Theme.colors.textsecondary};
  }
`;

const AccordionBtn = styled.button`
  width: 100%;
  padding: 12px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${Theme.colors.textsecondary};
  font-size: ${Theme.fontsize.desktop.content};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

// 아코디언 열림/닫힘 아이콘
const AccordionIcon = styled.span`
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.textsecondary};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

const AccordionBody = styled.div`
  max-height: ${(props) => (props.$isOpen ? "250px" : "0")};
  overflow: hidden;
  transition: 0.45s ease;
`;

// 아코디언 내용
const AccordionContent = styled.div`
  padding: 0px 0px 16px;
  color: ${Theme.colors.textsecondary};
  font-size: ${Theme.fontsize.desktop.content};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

export default function DetailedPage() {
  // 라우터 관련
  const { id } = useParams();
  const navigate = useNavigate();

  // 유저 정보 store
  const userType = useAuthStore((state) => state.userInfo?.userType);

  // 장바구니 store
  const { addItem } = useCartStore();

  // products api 받아오기
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 리뷰 api 받아오기
  const [reviews, setReviews] = useState([]);

  // 모달 끄고 닫기
  const [isOpen, setIsOpen] = useState(false);

  // 수량
  const [quantity, setQuantity] = useState(1);

  // 슬라이드 인덱스
  const [imgIdx, setImgIdx] = useState(0);

  // 아코디언 열고 닫기
  const [openIdx, setOpenIdx] = useState(null);

  // 상품 정보 받아오기
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await detailApi(id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, [id]);

  // 리뷰 정보 받아오기
  useEffect(() => {
    const allReviews = getReviews();
    const currentProductReviews = allReviews.filter((review) => String(review.productId) === String(id));
    setReviews(currentProductReviews);
  }, [id]);

  // 마이페이지에서 최근 본 상품 보여주기 위해 로컬스토리지에 클릭된 상품 저장
  function SaveMyPageProducts(product) {
    const storeItem = JSON.parse(localStorage.getItem("recentProducts")) || [];

    // 중복 제거 (같은 상품 다시 보면 맨 앞으로)
    const filterItem = storeItem.filter((item) => item.id !== product.id);

    // 최신순으로 맨 앞에 추가
    const updated = [product, ...filterItem];

    // 최대 10개만 유지
    localStorage.setItem("recentProducts", JSON.stringify(updated.slice(0, 10)));
  }

  // 상품 정보가 바뀔 때마다 로컬스토리지에 저장
  useEffect(() => {
    if (product) {
      SaveMyPageProducts({
        id: product.id,
        name: product.name,
        img: product.slideImgs,
      });
    }
  }, [product]);

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "32px",
        }}
      >
        Loading...
      </div>
    );
  }

  // 상품이 존재하지 않을 때 처리
  if (!product) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "32px",
        }}
      >
        존재하지 않는 상품입니다.
      </div>
    );
  }

  // 슬라이드 이미지
  const rawImg = product.slideImgs || [];
  let img = [];

  // 3장이상
  if (rawImg.length >= 3) {
    img = rawImg;
  } else if (rawImg.length === 2) {
    // 2장이면 3장
    img = [rawImg[0], rawImg[1], rawImg[0]];
  } else if (rawImg.length === 1) {
    // 1장이면 3장 동일
    img = [rawImg[0], rawImg[0], rawImg[0]];
  }

  // 상세 이미지
  const detailImgs = product.detailImg || [];

  const lastIdx = img.length - 1;
  const totalPrice = product.price * quantity;

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
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      src: product.slideImgs,
      quantity: quantity,
    });
  };

  // 아코디언 열고 닫기
  const handleAccordionToggle = (idx) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <MainWrap>
      <ImgGallery>
        <SliderWrap>
          <LeftArrow type="button" onClick={handlePrevSlide}>
            ‹
          </LeftArrow>
          <RightArrow type="button" onClick={handleNextSlide}>
            ›
          </RightArrow>

          <Slider>
            {img.map((src, idx) => (
              <SlideItem key={idx} $position={getImgPosition(idx)}>
                <SlideImg src={src} alt={`${product.name} 슬라이드 이미지 ${idx + 1}`} />
              </SlideItem>
            ))}
          </Slider>
        </SliderWrap>

        <ProductName>{product.name} Detail</ProductName>
      </ImgGallery>
      <DetailSection>
        <LeftContent>{detailImgs[0] && <DetailImg src={detailImgs[0]} alt={`${product.name} 상세 이미지`} />}</LeftContent>

        <RightContent>
          <StickyBox>
            <InfoGroup>
              <InfoTitle>Note</InfoTitle>
              <InfoRow>
                <Label>Promotion</Label>
                <Value>{product.material}</Value>
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
              <QtyBtn type="button" onClick={handleDecrease}>
                -
              </QtyBtn>
              <QtyValue>{quantity}</QtyValue>
              <QtyBtn type="button" onClick={handleIncrease}>
                +
              </QtyBtn>
            </QtyWrap>

            <Price>상품 금액: {product.price.toLocaleString()}원</Price>
            <Price>총 금액: {totalPrice.toLocaleString()}원</Price>

            <BtnGroup>
              <CardBtn
                type="button"
                onClick={() => {
                  handleAdd();
                  setIsOpen(true);
                }}
              >
                Shopping Cart
              </CardBtn>

              <CardBtn
                type="button"
                onClick={() => {
                  handleAdd();
                  navigate("/cart");
                }}
              >
                Buy
              </CardBtn>
            </BtnGroup>

            <Back type="button" onClick={() => navigate(-1)}>
              다른 상품 보러가기
            </Back>

            <MoreInfoWrap>
              {accordionItems.map((accordion, idx) => {
                const isActive = openIdx === idx;

                return (
                  <AccordionItem key={accordion.title}>
                    <AccordionBtn type="button" onClick={() => handleAccordionToggle(idx)}>
                      <span>{accordion.title}</span>
                      <AccordionIcon>{isActive ? "−" : "+"}</AccordionIcon>
                    </AccordionBtn>

                    <AccordionBody $isOpen={isActive}>
                      <AccordionContent>{accordion.content}</AccordionContent>
                    </AccordionBody>
                  </AccordionItem>
                );
              })}
            </MoreInfoWrap>
          </StickyBox>
        </RightContent>
      </DetailSection>

      <DetailedPageReview reviews={reviews} userType={userType} />
      <MoveCartModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </MainWrap>
  );
}
