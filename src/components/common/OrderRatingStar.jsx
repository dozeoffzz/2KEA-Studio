import styled from "@emotion/styled";
import EmptyStar from "../../assets/imgs/detail/Star.svg";
import FullStar from "../../assets/imgs/detail/Full.svg";
import React, { useState } from "react";

const StarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StarWrap = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  cursor: pointer;
`;

const StarIcon = styled.img`
  object-fit: contain;
  pointer-events: none;
`;

export default function OrderRatingStar({ rating, setRating, baseSize = 24, step = 2 }) {
  const [hover, setHover] = useState(0);
  return (
    <StarContainer>
      {Array.from({ length: 5 }).map((_, idx) => {
        const starValue = idx + 1;
        const currentSize = baseSize + idx * step; // 점점 커지는 크기 계산
        const isFull = (hover || rating) >= starValue;

        //별점 클릭시 채우고, 채운 별점을 다시 클릭하면 비우기
        const handleStarClick = () => {
          if (rating === starValue) {
            setRating(0);
          } else {
            setRating(starValue);
            setHover(0);
          }
        };

        //별 호버시 별 꽉 채운거로 보이기
        const hoverRateStar = () => {
          setHover(starValue);
        };

        //호버 해제하면 별 기존으로 보이기
        const hoverOutStar = () => {
          setHover(0);
        };

        return (
          <StarWrap
            key={idx}
            size={currentSize}
            onClick={handleStarClick}
            onMouseEnter={hoverRateStar}
            onMouseLeave={hoverOutStar}
          >
            <StarIcon src={isFull ? FullStar : EmptyStar} alt={`${starValue}점`}></StarIcon>
          </StarWrap>
        );
      })}
    </StarContainer>
  );
}
