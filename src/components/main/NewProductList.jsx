import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import ScrollReveal from "../common/ScrollReveal";
import { Theme } from "../../styles/theme";
import { fetchMain } from "../../apis/mainApi";
import { Link } from "react-router-dom";

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
  font-size: ${Theme.fontsize.desktop.section};
  line-height: 1.2;
  text-align: center;

  @media (max-width: 1470px) {
    font-size: 30px;
  }

  @media (max-width: 1350px) {
    font-size: ${Theme.fontsize.tablet.section};
  }

  @media (max-width: 1000px) {
    font-size: 25px;
  }

  @media (max-width: 900px) {
    font-size: 22px;
  }

  @media (max-width: 800px) {
    font-size: 19px;
  }

  @media (max-width: 660px) {
    font-size: 17px;
  }

  @media (max-width: 590px) {
    font-size: 16px;
  }

  @media (max-width: 530px) {
    font-size: 14px;
  }

  @media (max-width: 400px) {
    font-size: 13px;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 0;
  display: flex;
  gap: 10px;

  ${({ theme }) => theme.media.tablet} {
    top: 8px;
    gap: 7px;
  }
  ${({ theme }) => theme.media.mobile} {
    top: -1px;
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
  transition: all 0.3s ease;
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

const ListSlide = styled.div`
  display: flex;
  margin: 0 -10px;
  transform: translateX(${({ index, visibleCount }) => `-${(100 / visibleCount) * index}%`});
  transition: ${({ isTranslation }) => (isTranslation ? "transform 0.6s ease-in-out" : "none")};

  ${({ theme }) => theme.media.tablet} {
    margin: 0 -7.5px;
  }
  ${({ theme }) => theme.media.mobile} {
    margin: 0 -2.5px;
  }
`;

const ListImageWrapper = styled.div`
  padding: 0 10px;
  flex: 0 0 ${({ visibleCount }) => `calc(100% / ${visibleCount})`};

  ${({ theme }) => theme.media.tablet} {
    padding: 0 7.5px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 0 2.5px;
  }

  &:hover .list-hover-img {
    opacity: 1;
  }
`;

const InnerImageBox = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 436 / 550;
  overflow: hidden;
`;

const DefaultImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HoverImage = styled(DefaultImage)`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
`;

export default function NewProductList() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [index, setIndex] = useState(0);
  const [isTranslation, setIsTranslation] = useState(false);
  const [slideCount, setSlideCount] = useState(2);
  const isSliding = useRef(false);

  const visibleCount = 4;
  const extendedList = list.length > 0 ? [...list.slice(-visibleCount), ...list, ...list.slice(0, visibleCount)] : [];

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchMain();
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

  useEffect(() => {
    if (list.length > 0) {
      setIsTranslation(false);
      setIndex(visibleCount);
    }
  }, [list]);

  const nextSlide = () => {
    if (isSliding.current) return;
    isSliding.current = true;
    setIsTranslation(true);
    setIndex((prev) => prev + slideCount);
  };

  const previousSlide = () => {
    if (isSliding.current) return;
    isSliding.current = true;
    setIsTranslation(true);
    setIndex((prev) => prev - slideCount);
  };

  const handleTransitionEnd = () => {
    isSliding.current = false;
    if (index >= list.length + visibleCount) {
      setIsTranslation(false);
      setIndex(visibleCount);
    }
    if (index <= 0) {
      setIsTranslation(false);
      setIndex(list.length);
    }
  };

  if (loading) return null;

  return (
    <ScrollReveal>
      <ItemList>
        <ListTitle>NEW TRACE: THE COLLECTION</ListTitle>
        <ButtonContainer>
          <RightSlideButton onClick={previousSlide}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
              />
            </svg>
          </RightSlideButton>
          <LeftSlideButton onClick={nextSlide}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
              />
            </svg>
          </LeftSlideButton>
        </ButtonContainer>
        <ListImageBox>
          <ListSlide
            index={index}
            visibleCount={visibleCount}
            isTranslation={isTranslation}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedList.map((item, idx) => (
              <ListImageWrapper key={`${item.id}-${idx}`} visibleCount={visibleCount}>
                <InnerImageBox>
                  <DefaultImage src={item.src[0]} alt={item.name} />
                  <Link to={`/products/${item.category}/${item.productId}`}>
                    <HoverImage src={item.src[1]} alt={item.name} className="list-hover-img" />
                  </Link>
                </InnerImageBox>
              </ListImageWrapper>
            ))}
          </ListSlide>
        </ListImageBox>
      </ItemList>
    </ScrollReveal>
  );
}
