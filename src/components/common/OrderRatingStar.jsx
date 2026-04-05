import styled from "@emotion/styled";
import EmptyStar from "../../assets/imgs/detail/Star.svg";
import HalfStar from "../../assets/imgs/detail/Half.svg";
import FullStar from "../../assets/imgs/detail/Full.svg";
import { useState } from "react";

const StarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StarWrap = styled.div`
  position: relative;
  display: flex;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  cursor: pointer;
`;

const StarIcon = styled.img`
  object-fit: contain;
  pointer-events: none;
`;

const HalfSection = styled.div`
  position: absolute;
  top: 0;
  left: ${({ isLeft }) => (isLeft ? "0" : "auto")};
  right: ${({ isLeft }) => (isLeft ? "auto" : "0")};
  width: 50%;
  height: 100%;
  z-index: 1;
`;

export default function OrderRatingStar({ rating, setRating, baseSize = 24, step = 2 }) {
  const [hover, setHover] = useState(0); //호버시 채워지는 별 상태값

  //호버 벗어나면 별 초기화
  const StarHoverOut = () => {
    setHover(0);
  };

  return (
    <StarContainer onMouseLeave={StarHoverOut}>
      {Array.from({ length: 5 }).map((_, idx) => {
        const starIndex = idx + 1; //1~5까지 별의 순서
        const currentSize = baseSize + idx * step; // 뒤로 갈수록 점점 커지는 디자인

        //왼쪽에 마우스 올리면 별 반개짜리, 오른쪽에 마우스 올리면 별 1개짜리 나오기
        const getStarImg = (value) => {
          if (value >= starIndex) return FullStar;
          if (value >= starIndex - 0.5) return HalfStar;
          return EmptyStar;
        };

        //호버 중일때는 호버 점수를 우션적으로 보여주기
        const starValue = hover || rating;
        const starImg = getStarImg(starValue);

        const handleInterSection = (isHalf) => {
          //현재 마우스 올린 위치가 별 절반 기준으로 왼쪽인지 오른쪽인지 확인
          const newStar = isHalf ? starIndex - 0.5 : starIndex;

          //이미 선택된 점수를 클릭하면 0점으로 초기화
          if (rating === newStar) {
            setRating(0);
          } else {
            setRating(newStar);
          }
        };

        //별 왼쪽 호버 및 클릭 로직
        const halfStarHover = () => {
          setHover(starIndex - 0.5);
        };
        const halfStarClick = () => {
          handleInterSection(true);
          setHover(0);
        };

        //별 오른쪽 호버 및 클릭 로직
        const fullStarHover = () => {
          setHover(starIndex);
        };
        const fullStarClick = () => {
          handleInterSection(false);
          setHover(0);
        };

        return (
          <StarWrap key={idx} size={currentSize}>
            <HalfSection isLeft={true} onMouseEnter={halfStarHover} onClick={halfStarClick} />
            <HalfSection isLeft={false} onMouseEnter={fullStarHover} onClick={fullStarClick} />
            <StarIcon src={starImg} alt={`${starValue}점`}></StarIcon>
          </StarWrap>
        );
      })}
    </StarContainer>
  );
}
