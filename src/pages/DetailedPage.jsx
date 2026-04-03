import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import styled from "@emotion/styled";

import { Theme } from "../styles/theme";

// 테스트용 이미지
import { useCartStore } from "../stores/useCartStore";
import MoveCartModal from "../components/modals/MoveCartModal";
import { detailApi } from "../apis/detailApi";
import Star from "../assets/imgs/detail/Star.svg";
import Full from "../assets/imgs/detail/Full.svg";
import Half from "../assets/imgs/detail/Half.svg";
import Review from "../assets/imgs/detail/review.svg";

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

// 임시 리뷰 넣어둔 상태
const mockReviews = [
  {
    id: 1,
    nickname: "Frieren",
    memberType: "개인회원 구매자",
    rating: 4,
    images: [
      "https://i.ibb.co/xtNLr7YV/Coco-Hanging-Chair-Slide2.webp",
      "https://i.ibb.co/FL4KmF4N/Ripple-Lounge-Slide3.webp",
      "https://i.ibb.co/nqjWwh3v/Ripple-Lounge-Slide2.webp",
      "https://i.ibb.co/23hy65yW/Ripple-Lounge-Slide.webp",
      "https://i.ibb.co/tNn0PBG/Hudson-Leather-Sofa-hover.webp",
    ],
    content:
      "생각했던 거 이상으로 단단하고, 미니멀한 분위기와 잘 어울리는 제품이었습니다. 생각했던 거 이상으로 단단하고, 미니멀한 분위기와 잘 어울리는 제품이었습니다.  ",
  },
  {
    id: 2,
    nickname: "은우가왜저럴까",
    memberType: "개인회원 구매자",
    rating: 4,
    images: [],
    content: "직선적인 형태와 단단한 소재감이 인상적이었고, 공간의 분위기를 차분하게 만들어줬습니다.",
  },
  {
    id: 3,
    nickname: "힘멜이라면",
    memberType: "개인회원 구매자",
    rating: 3.5,
    images: [
      "https://i.ibb.co/xtNLr7YV/Coco-Hanging-Chair-Slide2.webp",
      "https://i.ibb.co/FL4KmF4N/Ripple-Lounge-Slide3.webp",
      "https://i.ibb.co/nqjWwh3v/Ripple-Lounge-Slide2.webp",
    ],
    content: "미니멀한 인테리어와 잘 어울리고 실제로 봤을 때 더 만족스러웠습니다.",
  },
  {
    id: 4,
    nickname: "아이고인생",
    memberType: "개인회원 구매자",
    rating: 1,
    images: [],
    content: "일이 안 끝나네요",
  },
  {
    id: 5,
    nickname: "2팀파이팅",
    memberType: "개인회원 구매자",
    rating: 5,
    images: [],
    content: "2팀 아자아자 파이팅....",
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

// 리뷰 영역
const ReviewSection = styled.section`
  width: 100%;
  padding: 0 100px 80px;

  @media screen and (max-width: 1280px) {
    padding: 0 70px 70px;
  }

  ${({ theme }) => theme.media.tablet} {
    padding: 0 40px 40px;
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 0 20px 20px;
  }
`;

// 리뷰 제목
const ReviewTitle = styled.h3`
  font-size: 32px;
  font-weight: 600;
  border-bottom: 1px solid #222222;
  padding-bottom: 31px;

  ${({ theme }) => theme.media.tablet} {
    font-size: 28px;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: 20px;
    padding-bottom: 20px;
  }
`;

const ReviewSummary = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  border-bottom: 1px solid #222222;
  align-items: stretch;

  @media screen and (max-width: 1050px) {
    grid-template-columns: 1fr;
  }
`;

// 리뷰 평점 박스
const RatingBox = styled.div`
  padding: 28px 24px;
  border-right: 1px solid #222222;

  @media screen and (max-width: 1050px) {
    border-right: none;
    border-bottom: 1px solid #222222;
  }
`;

// 리뷰 평점 요약 박스
const RatingSummaryWrap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const RatingNum = styled.p`
  min-width: 72px;
  font-size: 45px;
  color: ${Theme.colors.blacktext};

  @media screen and (max-width: 1280px) {
    font-size: 40px;
  }

  ${({ theme }) => theme.media.tablet} {
    font-size: 50px;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: 27px;
  }

  @media screen and (max-width: 600px) {
    text-align: center;
  }
`;

const RatingGraphList = styled.div`
  display: flex;
  gap: 30px;
  align-items: flex-end;

  @media screen and (max-width: 1280px) {
    gap: 23px;
    transition: 0.45s ease;
  }
`;

const RatingGraphItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RatingPercent = styled.span`
  margin-bottom: 8px;
  font-size: 17px;
  color: ${Theme.colors.blacktext};

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.medium};
  }
`;

// 리뷰 평점 그래프 바
const RatingBarWrap = styled.div`
  width: 6px;
  border-radius: 20px;
  height: ${(props) => (props.$percent > 0 ? `${(142 * props.$percent) / 100}px` : "142px")};
  min-height: ${(props) => (props.$percent > 0 ? "18px" : "142px")};
  background: ${(props) => (props.$percent > 0 ? "#ffbb00 70.2%" : "#d3d3d3")};
`;

const RatingLabel = styled.span`
  margin-top: 8px;
  font-size: 17px;
  color: ${Theme.colors.blacktext};

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.medium};
  }
`;

// best review
const BestReviewBox = styled.div`
  padding: 0 24px 28px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

// best review 제목
const BestReviewTitle = styled.p`
  margin: 0;
  font-size: 17px;
  color: ${Theme.colors.blacktext};
  text-align: left;
  margin-top: 31px;

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.content};
  }
`;

const BestReviewEmpty = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const BestReviewIcon = styled.img`
  width: 40px;
  height: 40px;
  display: block;
`;

const BestReviewText = styled.p`
  font-size: 16px;
  color: ${Theme.colors.textsecondary};
  text-align: center;

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

// 리뷰 개수
const ReviewTabRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #222222;
  font-size: 16px;

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

const ReviewCountGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ReviewTabButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 17px;
  color: ${(props) => (props.$active ? Theme.colors.blacktext : Theme.colors.textsecondary)};

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

// 리뷰 리스트
const ReviewList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-bottom: 1px solid #222222;

  & > *:nth-of-type(2n) {
    border-right: none;
  }

  @media screen and (max-width: 1050px) {
    grid-template-columns: 1fr;

    & > *:nth-of-type(2n) {
      border-right: none;
    }
  }
`;

const ReviewCard = styled.article`
  padding: 24px 24px 28px;
  min-height: 420px;
  border-right: 1px solid #222222;

  @media screen and (max-width: 1050px) {
    border-right: none;
    border-bottom: 1px solid #222222;
    min-height: auto;
  }

  @media screen and (max-width: 510px) {
    padding: 15px 10px 15px;
  }
`;

// 리뷰 작성자 정보
const ReviewerInfo = styled.p`
  font-size: 16px;
  margin-bottom: 10px;

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.content};
  }
`;

const StarRow = styled.div`
  display: flex;
  gap: 2px;
  margin-bottom: 18px;
`;

const StarIcon = styled.img`
  width: 18px;
  height: 18px;
  display: block;
  flex-shrink: 0;
`;

// 리뷰 이미지 슬라이더 영역
const ReviewImageSliderWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 24px;

  @media screen and (max-width: 450px) {
    justify-content: center;
  }
`;

const ReviewImageViewport = styled.div`
  overflow: hidden;
  width: 390px;
  transition: 0.45s ease;

  @media screen and (max-width: 1220px) {
    width: 340px;
  }

  @media screen and (max-width: 510px) {
    width: 300px;
  }

  @media screen and (max-width: 450px) {
    width: 210px;
  }
`;

const ReviewSlideTrack = styled.div`
  display: flex;
  gap: 16px;
`;

const ReviewArrowButton = styled.button`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;

  ${({ theme }) => theme.media.mobile} {
    width: 28px;
    height: 28px;
    font-size: 18px;
  }
`;

const ReviewArrowLeft = styled(ReviewArrowButton)`
  margin-right: 6px;
`;

const ReviewArrowRight = styled(ReviewArrowButton)`
  margin-left: 6px;
`;

const ReviewText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  word-break: keep-all;

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

const ReviewPagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 20px 0 0;
`;

const ReviewPageArrow = styled.button`
  width: 36px;
  height: 36px;
  border: 1px solid #222222;
  background: none;
  font-size: 20px;
  line-height: 1;

  ${({ theme }) => theme.media.mobile} {
    width: 28px;
    height: 28px;
    font-size: 18px;
  }
`;

const ReviewPageText = styled.span`
  font-size: 16px;
  color: ${Theme.colors.blacktext};
`;

const EmptyReviewCard = styled.article`
  min-height: 353px;
  border-right: 1px solid #222222;

  @media screen and (max-width: 1050px) {
    display: none;
  }
`;

const ReviewImage = styled.div`
  width: 120px;
  height: 120px;
  overflow: hidden;
  flex-shrink: 0;
  transition: 0.45s ease;

  @media screen and (max-width: 1220px) {
    width: 100px;
    height: 100px;
  }

  @media screen and (max-width: 510px) {
    width: 90px;
    height: 90px;
  }

  @media screen and (max-width: 450px) {
    width: 60px;
    height: 60px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export default function DetailedPage() {
  // 라우터 관련
  const { id } = useParams();
  const navigate = useNavigate();

  // 장바구니 store
  const { addItem } = useCartStore();

  // products api 받아오기
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 모달 끄고 닫기
  const [isOpen, setIsOpen] = useState(false);

  // 수량
  const [quantity, setQuantity] = useState(1);

  // 슬라이드 인덱스
  const [imgIdx, setImgIdx] = useState(0);

  // 아코디언 열고 닫기
  const [openIdx, setOpenIdx] = useState(null);

  // 리뷰 탭 상태값
  const [reviewFilter, setReviewFilter] = useState("all");

  const [reviewPage, setReviewPage] = useState(0);

  // 리뷰 이미지 인덱스
  const [reviewImageIndexes, setReviewImageIndexes] = useState({});

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
  const totalReviewCount = mockReviews.length;

  const photoReviews = mockReviews.filter((review) => review.images?.length > 0);
  const photoReviewCount = photoReviews.length;
  const filteredReviews = reviewFilter === "photo" ? photoReviews : mockReviews;

  const reviewsPerPage = 2;
  const totalReviewPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  // 현재 페이지 리뷰 자르기
  const visibleReviews = filteredReviews.slice(
    reviewPage * reviewsPerPage,
    reviewPage * reviewsPerPage + reviewsPerPage,
  );

  // 빈 칸 채우기
  const emptyVisibleReviewCount = reviewsPerPage - visibleReviews.length;
  const emptyVisibleReviews = Array.from({ length: emptyVisibleReviewCount });

  // 평점
  const averageRating =
    totalReviewCount === 0
      ? 0
      : (mockReviews.reduce((acc, review) => acc + review.rating, 0) / totalReviewCount).toFixed(1);

  // 별점
  const ratingPercentages = [5, 4, 3, 2, 1].map((score) => {
    // .5이상이면 0.5 더 놓기
    const count = mockReviews.filter((review) => Math.floor(review.rating) === score).length;

    return {
      score,
      count,
      percent: totalReviewCount === 0 ? 0 : Math.round((count / totalReviewCount) * 100),
    };
  });

  // 리뷰 이미지
  const getReviewVisibleCount = (review) => Math.min(review.images?.length || 0, 3);

  // 리뷰 이미지 슬라이더
  const getVisibleReviewImages = (review) => {
    const visibleCount = getReviewVisibleCount(review);
    const maxStartIndex = Math.max(0, (review.images?.length || 0) - visibleCount);

    // 최대 인덱스 넘지 X
    const startIndex = Math.min(reviewImageIndexes[review.id] || 0, maxStartIndex);

    return review.images.slice(startIndex, startIndex + visibleCount).map((src, index) => ({
      src,
      imageIndex: startIndex + index,
    }));
  };

  const handleReviewImageMove = (review, direction) => {
    setReviewImageIndexes((prev) => {
      const currentIndex = prev[review.id] || 0;
      const visibleCount = getReviewVisibleCount(review);
      const maxStartIndex = Math.max(0, (review.images?.length || 0) - visibleCount);

      let nextIndex;
      if (direction === "prev") {
        nextIndex = currentIndex === 0 ? maxStartIndex : currentIndex - 1;
      } else {
        nextIndex = currentIndex === maxStartIndex ? 0 : currentIndex + 1;
      }

      return {
        ...prev,
        [review.id]: nextIndex,
      };
    });
  };

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

  const handlePrevReviewPage = () => {
    setReviewPage((prev) => (prev === 0 ? totalReviewPages - 1 : prev - 1));
  };

  const handleNextReviewPage = () => {
    setReviewPage((prev) => (prev === totalReviewPages - 1 ? 0 : prev + 1));
  };

  // 별점 이미지
  const getStarIcon = (star, rating) => {
    if (star <= Math.floor(rating)) return Full;
    if (star - 0.5 === rating) return Half;
    return Star;
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
        <LeftContent>
          {detailImgs[0] && <DetailImg src={detailImgs[0]} alt={`${product.name} 상세 이미지`} />}
        </LeftContent>

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

      {/* 리뷰 */}
      <ReviewSection>
        <ReviewTitle>REVIEWS</ReviewTitle>

        <ReviewSummary>
          <RatingBox>
            <RatingSummaryWrap>
              <RatingNum>{averageRating}</RatingNum>

              <RatingGraphList>
                {ratingPercentages.map((item) => (
                  <RatingGraphItem key={item.score}>
                    <RatingPercent>{item.percent}%</RatingPercent>

                    <RatingBarWrap $percent={item.percent} />

                    <RatingLabel>{item.score}점</RatingLabel>
                  </RatingGraphItem>
                ))}
              </RatingGraphList>
            </RatingSummaryWrap>
          </RatingBox>

          <BestReviewBox>
            <BestReviewTitle>BEST REVIEW</BestReviewTitle>

            <BestReviewEmpty>
              <BestReviewIcon src={Review} alt="리뷰 아이콘" />
              <BestReviewText>조회할 수 있는 리뷰가 없습니다.</BestReviewText>
            </BestReviewEmpty>
          </BestReviewBox>
        </ReviewSummary>

        <ReviewTabRow>
          <ReviewCountGroup>
            <ReviewTabButton type="button" $active={reviewFilter === "photo"} onClick={() => setReviewFilter("photo")}>
              포토리뷰 ({photoReviewCount})
            </ReviewTabButton>

            <ReviewTabButton type="button" $active={reviewFilter === "all"} onClick={() => setReviewFilter("all")}>
              전체리뷰 ({totalReviewCount})
            </ReviewTabButton>
          </ReviewCountGroup>

          <div>최신순 | 추천순</div>
        </ReviewTabRow>

        <ReviewList>
          {visibleReviews.map((review) => (
            <ReviewCard key={review.id}>
              <ReviewerInfo>
                {review.nickname} : {review.memberType}
              </ReviewerInfo>

              <StarRow>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} src={getStarIcon(star, review.rating)} alt={`별점 ${review.rating}점`} />
                ))}
              </StarRow>

              {review.images.length > 0 && (
                <ReviewImageSliderWrap>
                  {review.images.length > 3 && (
                    <ReviewArrowLeft type="button" onClick={() => handleReviewImageMove(review, "prev")}>
                      ‹
                    </ReviewArrowLeft>
                  )}

                  <ReviewImageViewport>
                    <ReviewSlideTrack>
                      {getVisibleReviewImages(review).map((image) => (
                        <ReviewImage key={image.imageIndex}>
                          <img src={image.src} alt={`리뷰 이미지 ${image.imageIndex + 1}`} />
                        </ReviewImage>
                      ))}
                    </ReviewSlideTrack>
                  </ReviewImageViewport>

                  {review.images.length > 3 && (
                    <ReviewArrowRight type="button" onClick={() => handleReviewImageMove(review, "next")}>
                      ›
                    </ReviewArrowRight>
                  )}
                </ReviewImageSliderWrap>
              )}

              <ReviewText>{review.content}</ReviewText>
            </ReviewCard>
          ))}

          {emptyVisibleReviews.map((_, index) => (
            <EmptyReviewCard key={`empty-visible-review-${index}`} />
          ))}
        </ReviewList>

        {totalReviewPages > 1 && (
          <ReviewPagination>
            <ReviewPageArrow type="button" onClick={handlePrevReviewPage}>
              ‹
            </ReviewPageArrow>

            <ReviewPageText>
              {reviewPage + 1} / {totalReviewPages}
            </ReviewPageText>

            <ReviewPageArrow type="button" onClick={handleNextReviewPage}>
              ›
            </ReviewPageArrow>
          </ReviewPagination>
        )}
      </ReviewSection>
      <MoveCartModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </MainWrap>
  );
}
