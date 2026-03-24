import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import ScrollReveal from "../common/ScrollReveal";
import { Theme } from "../../styles/theme";

//API 호출
import { getMainPage } from "../../api/mainPageApi";

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
  font-size: ${Theme.fontsize.desktop.title};
  line-height: ${Theme.fontsize.desktop.title};
  text-align: center;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.title};
    line-height: ${Theme.fontsize.tablet.title};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.section};
    line-height: ${Theme.fontsize.mobile.section};
    padding-right: 28px;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 28px;
  right: 0;
  display: flex;
  gap: 10px;

  ${({ theme }) => theme.media.tablet} {
    top: 14px;
  }
  ${({ theme }) => theme.media.mobile} {
    top: 5px;
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
  transform: translateX(${({ index, visibleCount }) => `-${(100 / visibleCount) * index}%`});
  /* 구조분해 할당: 무한 슬라이드 애니메이션*/
  transition: ${({ isTranslation }) => (isTranslation ? "transform 0.6s ease-in-out" : "none")};
`;

const ListImageWrapper = styled.div`
  position: relative;
  padding: 0 10px;
  flex: 0 0 ${({ visibleCount }) => `calc(100% / ${visibleCount})`};
  height: 550px;
  flex-shrink: 0;

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
  const [isTranslation, setIsTranslation] = useState(false); //애니메이션 상태 적용 여부(무한 슬라이드 방지용)
  const [index, setIndex] = useState(0); //현재 슬라이드 기준 위치
  const [slideCount, setSlideCount] = useState(2); // 버튼 클릭마다 슬라이드 이동 갯수
  const isSliding = useRef(false); // 슬라이드 애니메이션 진행 여부(버튼 연타 방지용)
  const visibleCount = 4; // 한 화면에 보이는 슬라이드 갯수
  let extendedList = [...list.slice(-slideCount), ...list, ...list.slice(0, slideCount)]; //무한 슬라이드 구현용 복사 리스트

  //api 데이터 받아오기
  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getMainPage();
        // 데이터가 배열인지 확인 후 저장하기
        if (result && Array.isArray(result.data.recommendations)) {
          setList(result.data.recommendations);
          setIsTranslation(false);
        }
      } catch (error) {
        console.error("데이터 로드 실패.", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  //모바일일 경우 이미지 1개, 태블릿, PC일 경우 이미지 2개 슬라이드
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 576) {
        setSlideCount(1);
      } else {
        setSlideCount(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //slideCount 또는 list 가 바뀔때마다 인덱스 다시 세팅
  useEffect(() => {
    if (list.length) {
      setIndex(slideCount);
    }
  }, [list, slideCount]);

  //슬라이드 애니메이션이 꺼져있으면 다시 활성화(무한 슬라이드 방지)
  useEffect(() => {
    if (!isTranslation) {
      setIsTranslation(true);
    }
  }, [isTranslation]);

  const nextSlide = () => {
    if (isSliding.current) return; //애니메이션 진행중 클릭 방지
    isSliding.current = true;
    setIndex((prev) => prev + slideCount);
  };

  const previousSlide = () => {
    if (isSliding.current) return;
    isSliding.current = true;
    setIndex((prev) => prev - slideCount);
  };

  const handleTransitionEnd = () => {
    //오른쪽 끝 복제 영역에 도달했을 경우
    if (index >= list.length + slideCount) {
      //슬라이드 애니메이션 제거
      setIsTranslation(false);
      //시작 위치로 순간이동
      setIndex(slideCount);
    }

    //왼쪽 끝 복제 영역에 도달했을 경우
    if (index <= 0) {
      //슬라이드 애니메이션 제거
      setIsTranslation(false);
      //실제 마지막 슬라이드 위치로 순간이동
      setIndex(list.length);
    }

    //슬라이드 애니메이션 진행 중단
    isSliding.current = false;
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
            {extendedList.map((item, i) => (
              // 복제된 아이템의 key값 충돌 방지를 위해 id 와 index 조합
              <ListImageWrapper key={`${item.id}-${i}`} visibleCount={visibleCount}>
                <DefaultImage src={item.src[0]} alt={item.name} />
                <HoverImage src={item.src[1]} alt={item.name} className="list-hover-img" />
              </ListImageWrapper>
            ))}
          </ListSlide>
        </ListImageBox>
      </ItemList>
    </ScrollReveal>
  );
}
