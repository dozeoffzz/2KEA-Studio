import React, { useState } from "react";
import styled from "@emotion/styled";

import { Theme } from "../styles/theme";
import Star from "../assets/imgs/detail/Star.svg";
import Full from "../assets/imgs/detail/Full.svg";
import Half from "../assets/imgs/detail/Half.svg";
import Review from "../assets/imgs/detail/review.svg";

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

    &:last-of-type {
      border-bottom: none;
    }
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
    width: 250px;
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

const EmptyReviewMessageBox = styled.div`
  grid-column: 1 / -1;
  min-height: 353px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmptyReviewMessage = styled.p`
  font-size: 18px;
  color: ${Theme.colors.textsecondary};

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
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
    width: 72px;
    height: 72px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export default function DetailedPageReview({ reviews, userType }) {
  // 리뷰 탭 상태값
  const [reviewFilter, setReviewFilter] = useState("all");

  // 리뷰 페이지 인덱스
  const [reviewPage, setReviewPage] = useState(0);

  // 리뷰 이미지 인덱스
  const [reviewImageIndexes, setReviewImageIndexes] = useState({});

  const totalReviewCount = reviews.length;

  // 사진 리뷰 개수
  const photoReviews = reviews.filter((review) => review.images && review.images.length > 0);
  const photoReviewCount = photoReviews.length;

  // 리뷰 탭에 따른 리뷰 필터링
  const filteredReviews = reviewFilter === "photo" ? photoReviews : reviews;
  const reviewsPerPage = 2;
  const totalReviewPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  // 현재 페이지 리뷰 자르기
  const visibleReviews = filteredReviews.slice(reviewPage * reviewsPerPage, reviewPage * reviewsPerPage + reviewsPerPage);

  // 빈 칸 채우기
  const emptyVisibleReviewCount = reviewsPerPage - visibleReviews.length;
  const emptyVisibleReviews = Array.from({ length: emptyVisibleReviewCount });

  // 평점
  const averageRating =
    totalReviewCount === 0 ? 0 : (reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviewCount).toFixed(1);

  // 별점
  const ratingPercentages = [5, 4, 3, 2, 1].map((score) => {
    const count = reviews.filter((review) => Math.floor(review.rating) === score).length;

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

  // 리뷰 이미지 슬라이더 이동
  const handleReviewImageMove = (review, direction) => {
    setReviewImageIndexes((prev) => {
      const currentIndex = prev[review.id] || 0;
      const visibleCount = getReviewVisibleCount(review);
      const maxStartIndex = Math.max(0, (review.images?.length || 0) - visibleCount);

      // 최대 인덱스 넘지 않도록
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

  {
    /* 리뷰 */
  }
  return (
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
        {visibleReviews.length === 0 ? (
          <EmptyReviewMessageBox>
            <EmptyReviewMessage>리뷰가 없습니다.</EmptyReviewMessage>
          </EmptyReviewMessageBox>
        ) : (
          <>
            {visibleReviews.map((review) => (
              <ReviewCard key={review.id}>
                <ReviewerInfo>
                  {review.author} : {userType || review.memberType || "일반회원"}
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
          </>
        )}
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
  );
}
