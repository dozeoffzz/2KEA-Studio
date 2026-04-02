import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { useEffect, useState } from "react";
import { Theme } from "../../styles/theme";
import { createPortal } from "react-dom";

// 오늘 하루 숨김 여부 저장 키
const MODAL_HIDE_KEY = "hideMainModalDate";

// 모달 내용 자동 전환 시간
const MODAL_INTERVAL = 4500;

// 오늘 날짜 키 생성
const getTodayKey = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${date}`;
};

// 내용 등장 애니메이션
const slideInContent = keyframes`
  from {
    opacity: 0;
    transform: translateX(22px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// 오버레이
const Overlay = styled.div`
  position: fixed;
  top: 105px;
  left: 115px;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(12, 12, 12, 0.12);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;

  ${({ theme }) => theme.media.tablet} {
    left: 66px;
    top: 50px;
  }

  ${({ theme }) => theme.media.mobile} {
    top: 255px;
    left: 45%;
    transform: translate(-50%, -50%);
  }
`;

// 모달 프레임
const ModalFrame = styled.div`
  width: 430px;
  height: 350px;
  display: flex;
  flex-direction: column;
  background-color: ${Theme.colors.white};
  overflow: hidden;

  ${({ theme }) => theme.media.tablet} {
    width: 350px;
    height: 350px;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 270px;
    height: 300px;
  }
`;

// 상단 내용 영역
const ContentArea = styled.div`
  flex: 1;
  padding: 20px 20px 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
  overflow-x: hidden;

  ${({ theme }) => theme.media.tablet} {
    padding: 25px 17px 0;
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 10px 10px 0;
    justify-content: center;
    align-items: center;
  }
`;

// 애니메이션 컨텐츠 박스
const AnimatedContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  animation: ${slideInContent} 0.42s ease;
`;

// 텍스트 묶음
const TextStack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 15px;

  ${({ theme }) => theme.media.mobile} {
    gap: 10px;
  }
`;

// 메인 제목
const Title = styled.span`
  font-size: 32px;

  ${({ theme }) => theme.media.tablet} {
    font-size: 26px;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: 22px;
  }
`;

// 부제목
const SecondTitle = styled.span`
  font-size: 14px;
  line-height: 1.5;

  ${({ theme }) => theme.media.tablet} {
    font-size: 13px;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
  }
`;

// 여러 줄 본문
const Content = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  line-height: 1.6;

  ${({ theme }) => theme.media.tablet} {
    font-size: 13px;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
  }
`;

// 한 줄 본문
const SingleLineText = styled.span`
  font-size: 14px;
  line-height: 1.6;

  ${({ theme }) => theme.media.tablet} {
    font-size: 13px;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
  }
`;

// 안내 문구 묶음
const InfoStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

// 안내 문구
const InfoText = styled.span`
  font-size: 14px;
  line-height: 1.4;

  ${({ theme }) => theme.media.tablet} {
    font-size: 13px;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
  }
`;

// 인디케이터 영역
const IndicatorArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  flex-shrink: 0;
`;

// 점 정렬 영역
const DotArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 22px;

  ${({ theme }) => theme.media.tablet} {
    gap: 18px;
  }

  ${({ theme }) => theme.media.mobile} {
    gap: 15px;
  }
`;

// 각 점 스타일
const Dot = styled.button`
  width: 10px;
  height: 10px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background-color: ${({ $active }) =>
    $active ? Theme.colors.black : "#b3b3b3"};
  cursor: pointer;

  ${({ theme }) => theme.media.mobile} {
    width: 8px;
    height: 8px;
  }
`;

// 하단 버튼 영역
const BottomArea = styled.div`
  width: 100%;
  flex-shrink: 0;
`;

// 버튼 래퍼
const ButtonWrap = styled.div`
  display: flex;
  width: 100%;
  border-top: 1px solid ${Theme.colors.black};
`;

// 버튼 공통 스타일
const BaseButton = styled.button`
  width: 50%;
  min-height: 40px;
  border: none;
  font-size: 14px;
  text-align: center;
  cursor: pointer;

  ${({ theme }) => theme.media.tablet} {
    min-height: 38px;
    font-size: 13px;
  }

  ${({ theme }) => theme.media.mobile} {
    min-height: 32px;
    font-size: 12px;
  }
`;

// 오늘 하루 닫기 버튼
const TodayCloseButton = styled(BaseButton)`
  background-color: ${Theme.colors.white};
  color: ${Theme.colors.black};
`;

// 닫기 버튼
const CloseButton = styled(BaseButton)`
  background-color: ${Theme.colors.black};
  color: ${Theme.colors.white};
`;

// 모달 내용 데이터
const modalContents = [
  {
    title: "TITLE",
    subtitle: "- 신규 컬렉션 런칭 -",
    blocks: [
      {
        type: "content",
        lines: ["공간의 온도를 바꾸는 2KEA만의 새로운", "실루엣을 만나보세요"],
      },
      {
        type: "single",
        text: "모던한 감각으로 재해석한 2KEA의 새로운 오브제",
      },
      {
        type: "single",
        text: "신제품 출시 기념 전 지역 무료 배송",
      },
    ],
  },
  {
    title: "EVENT",
    subtitle: "- 성수 쇼룸 구매 이벤트 -",
    blocks: [
      {
        type: "content",
        lines: [
          "성수 쇼룸에서 소파 및 조명 구매 대상으로",
          "초이스 쿠션 증정 이벤트를 진행중 입니다.",
        ],
      },
      {
        type: "single",
        text: "더욱더 설레는 마음으로 쇼룸에 찾아와 주세요 :)",
      },
      {
        type: "info",
        lines: [
          "* 초이스쿠션 종류는 재고 상황에 따라 상이합니다.",
          "* 3월 27일 ~ 4월 3일 단 7일동안 진행됩니다.",
        ],
      },
    ],
  },
  {
    title: "RESERVATION",
    subtitle: "- 성수 쇼룸 예약자 안내 -",
    blocks: [
      {
        type: "content",
        lines: [
          "평일 2KEA 성수 쇼룸은 예약 또는 자유롭게 쇼룸 방문이 가능하며,",
          "예약자 우선으로 상담이 진행됩니다.",
        ],
      },
      {
        type: "content",
        lines: [
          "상담 예약은 평일에만 진행되며,",
          "주말에는 예약 없이 방문 가능합니다",
        ],
      },
      {
        type: "single",
        text: "쇼룸 방문 시, 꼭 참고 부탁드립니다.",
      },
    ],
  },
];

function ContentBlock({ block }) {
  if (block.type === "content") {
    return (
      <Content>
        {block.lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </Content>
    );
  }

  if (block.type === "info") {
    return (
      <InfoStack>
        {block.lines.map((line) => (
          <InfoText key={line}>{line}</InfoText>
        ))}
      </InfoStack>
    );
  }

  if (block.type === "single") {
    return <SingleLineText>{block.text}</SingleLineText>;
  }

  return null;
}

export default function MainIntroModal({ isOpen, onClose }) {
  const [isVisible, setIsVisible] = useState(() => {
    return localStorage.getItem(MODAL_HIDE_KEY) !== getTodayKey();
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  const targetElement = document.getElementById("modal-root");

  useEffect(() => {
    if (!isOpen || !isVisible) return undefined;

    const timeoutId = window.setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % modalContents.length);
    }, MODAL_INTERVAL);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isOpen, isVisible, currentIndex]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handleTodayClose = () => {
    localStorage.setItem(MODAL_HIDE_KEY, getTodayKey());
    setIsVisible(false);
    onClose?.();
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  if (!isOpen || !isVisible || !targetElement) return null;

  const currentContent = modalContents[currentIndex];

  return createPortal(
    <Overlay>
      <ModalFrame>
        <ContentArea>
          <AnimatedContent key={currentIndex}>
            <TextStack>
              <Title>{currentContent.title}</Title>
              <SecondTitle>{currentContent.subtitle}</SecondTitle>

              {currentContent.blocks.map((block, index) => (
                <ContentBlock key={`${currentIndex}-${index}`} block={block} />
              ))}
            </TextStack>
          </AnimatedContent>
        </ContentArea>

        <IndicatorArea>
          <DotArea>
            {modalContents.map((_, index) => (
              <Dot
                key={index}
                type="button"
                aria-label={`${index + 1}번째 모달 보기`}
                $active={currentIndex === index}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </DotArea>
        </IndicatorArea>

        <BottomArea>
          <ButtonWrap>
            <TodayCloseButton type="button" onClick={handleTodayClose}>
              오늘 하루 열지 않기
            </TodayCloseButton>
            <CloseButton type="button" onClick={handleClose}>
              닫기
            </CloseButton>
          </ButtonWrap>
        </BottomArea>
      </ModalFrame>
    </Overlay>,
    targetElement,
  );
}
