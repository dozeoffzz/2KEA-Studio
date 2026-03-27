import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import ScrollReveal from "../common/ScrollReveal";
import { Theme } from "../../styles/theme";

//API 호출
import { fetchMain } from "../../apis/mainApi";
import { Link } from "react-router-dom";

//스타일 컴포넌트
const ItemList = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${({ theme }) => theme.media.tablet} {
    gap: 10px;
  }
  ${({ theme }) => theme.media.mobile} {
    gap: 5px;
  }
`;

const ListTitle = styled.p`
  font-size: ${Theme.fontsize.desktop.main.title};
  line-height: ${Theme.fontsize.desktop.main.title};
  text-align: center;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.main.title};
    line-height: ${Theme.fontsize.tablet.main.title};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.main.title};
    line-height: ${Theme.fontsize.mobile.main.title};
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 28px;
  right: 0;
  display: flex;
  gap: 10px;

  ${({ theme }) => theme.media.tablet} {
    top: 12px;
    gap: 7px;
  }
  ${({ theme }) => theme.media.mobile} {
    top: 0;
    gap: 5px;
  }
`;

const LeftSlideButton = styled.button`
  width: ${Theme.fontsize.desktop.content};
  height: ${Theme.fontsize.desktop.content};
  background-color: inherit;
  border: none;
  color: ${Theme.colors.textsecondary};
  cursor: pointer;
  transition: transform 0.3s;
  outline: none;

  ${({ theme }) => theme.media.tablet} {
    width: ${Theme.fontsize.tablet.content};
    height: ${Theme.fontsize.tablet.content};
  }
  ${({ theme }) => theme.media.mobile} {
    width: ${Theme.fontsize.mobile.small};
    height: ${Theme.fontsize.mobile.small};
  }

  svg {
    width: ${Theme.fontsize.desktop.content};
    height: ${Theme.fontsize.desktop.content};
    fill: currentColor;
    stroke: currentColor;

    ${({ theme }) => theme.media.tablet} {
      width: ${Theme.fontsize.tablet.content};
      height: ${Theme.fontsize.tablet.content};
    }
    ${({ theme }) => theme.media.mobile} {
      width: ${Theme.fontsize.mobile.small};
      height: ${Theme.fontsize.mobile.small};
    }
  }

  :hover {
    transform: translateY(-3px);
  }
`;

const RightSlideButton = styled(LeftSlideButton)``;

const ListImageBox = styled.div`
  width: 100%;
  overflow: hidden;
`;

//슬라이드용 컴포넌트
const ListSlide = styled.div`
  display: flex;
  /* 보이는 리스트 부분 양옆 패딩 제거 */
  margin: 0 -10px;
  /* 인덱스 위치에 따라 슬라이드 위치 결정 */
  transform: translateX(${({ index, visibleCount }) => `-${(100 / visibleCount) * index}%`});
  /* 슬라이드 애니메이션 */
  transition: ${({ isTranslation }) => (isTranslation ? "transform 0.6s ease-in-out" : "none")};

  ${({ theme }) => theme.media.tablet} {
    margin: 0 -7.5px;
  }
  ${({ theme }) => theme.media.mobile} {
    margin: 0 -2.5px;
  }
`;

const ListImageWrapper = styled.div`
  position: relative;
  //계산 복잡도를 낮추기 위해 padding으로 간격 설정
  padding: 0 10px;
  //슬라이드 너비 설정
  flex: 0 0 ${({ visibleCount }) => `calc(100% / ${visibleCount})`};
  height: 550px;

  ${({ theme }) => theme.media.tablet} {
    padding: 0 7.5px;
    height: 250px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 0 2.5px;
    height: 130px;
  }

  &:hover .list-hover-img {
    opacity: 1;
  }
`;

const DefaultImage = styled.img`
  width: 100%;
  height: 100%;
`;

const HoverImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0 10px;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;

  ${({ theme }) => theme.media.tablet} {
    padding: 0 7.5px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 0 2.5px;
  }
`;

export default function NewProductList() {
  const [loading, setLoading] = useState(true); // API 데이터 로딩 완료 여부
  const [list, setList] = useState([]); //API로 받아올 리스트 데이터
  const [index, setIndex] = useState(0); //현재 슬라이드 기준 위치
  const [isTranslation, setIsTranslation] = useState(false); //애니메이션 활설화 여부
  const [slideCount, setSlideCount] = useState(2); //버튼 클릭시 슬라이드할 아이템 갯수
  const isSliding = useRef(false); // 슬라이드 애니메이션 진행 여부(버튼 연타 방지용)

  const visibleCount = 4; // 한 화면에 보이는 슬라이드 갯수
  const extendedList =
    list.length > 0 ? [...list.slice(-visibleCount), ...list, ...list.slice(0, visibleCount)] : []; //무한 슬라이드 구현용 복사 리스트

  //api 데이터 받아오기
  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchMain();
        // 데이터가 배열인지 확인 후 저장하기
        if (result && Array.isArray(result.data.recommendations)) {
          setList(result.data.recommendations);
          setIndex(visibleCount);
        }
      } catch (error) {
        console.error("데이터 로드 실패.", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  //화면 리사이즈 시 슬라이드 버튼 클릭시 이동 갯수 업데이트
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlideCount(1);
      } else {
        setSlideCount(2);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //api 데이터 로딩 이후 슬라이드 초기 위치 설정
  useEffect(() => {
    if (list.length > 0) {
      //초기 배치시 애니메이션 방지(바로 배치되는것처럼 보이기)
      setIsTranslation(false);
      //앞에 붙은 복제본을 건너뛰고 실제 첫 상품 위치로 인덱스 설정
      setIndex(visibleCount);
    }
  }, [list]); //리스트 데이터 변경시마다 실행

  //오른쪽 목록으로 슬라이드
  const nextSlide = () => {
    if (isSliding.current) return; //애니메이션 진행 중 반복클릭 방지
    isSliding.current = true; //애니메이션 시작 상태로 변경
    setIsTranslation(true); //애니메이션 활성화
    setIndex((prev) => prev + slideCount); //오른쪽으로 슬라이드
  };

  //왼쪽 방향으로 슬라이드
  const previousSlide = () => {
    if (isSliding.current) return;
    isSliding.current = true;
    setIsTranslation(true);
    setIndex((prev) => prev - slideCount); //왼쪽으로 슬라이드
  };

  const handleTransitionEnd = () => {
    isSliding.current = false; //애니메이션 중단 상태로 변경

    //오른쪽 끝 도달 시
    if (index >= list.length + visibleCount) {
      setIsTranslation(false); //애니메이션 끄기
      setIndex(visibleCount); //실제 리스트 첫 위치로 점프
    }

    //왼쪽 끝 도달 시
    if (index <= 0) {
      setIsTranslation(false); //애니메이션 끄기
      setIndex(list.length); //실제 리스트 마지막 위치로 점프
    }
  };

  if (loading) return <div>데이터 로딩중...</div>;

  return (
    <ScrollReveal>
      <ItemList>
        <ListTitle>NEW TRACE: THE COLLECTION</ListTitle>
        <ButtonContainer>
          <RightSlideButton onClick={previousSlide}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
              />
            </svg>
          </RightSlideButton>
          <LeftSlideButton onClick={nextSlide}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
              />
            </svg>
          </LeftSlideButton>
        </ButtonContainer>
        <ListImageBox>
          {/* 슬라이드용 컴포넌트 */}
          <ListSlide
            index={index}
            visibleCount={visibleCount}
            isTranslation={isTranslation}
            onTransitionEnd={handleTransitionEnd}
          >
            {/* 이미지 데이터 배열 받아오기 */}
            {extendedList.map((item, idx) => (
              // 복제된 아이템의 key값 충돌 방지를 위해 id 와 index 조합
              <ListImageWrapper key={`${item.id}-${idx}`} visibleCount={visibleCount}>
                <DefaultImage src={item.src[0]} alt={item.name} />
                <Link to={`/products/${item.category}/${item.productId}`}>
                  <HoverImage src={item.src[1]} alt={item.name} className="list-hover-img" />
                </Link>
              </ListImageWrapper>
            ))}
          </ListSlide>
        </ListImageBox>
      </ItemList>
    </ScrollReveal>
  );
}
