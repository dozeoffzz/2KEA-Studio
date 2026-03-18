// 여러 개의 메인 소개 모달 내용을 하나로 합쳐서 순서대로 보여주는 통합 모달 컴포넌트
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Theme } from "../../styles/theme";

// localStorage에 오늘 하루 숨김 여부를 저장할 키
const MODAL_HIDE_KEY = "hideMainModalDate";

// 모달 내용이 바뀌는 시간 간격
const MODAL_INTERVAL = 4500;

// 오늘 날짜를 YYYY-MM-DD 형식으로 만드는 함수
const getTodayKey = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${date}`;
};

// 내용이 살짝 옆에서 들어오는 애니메이션
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

// 화면 전체를 덮는 오버레이
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(12, 12, 12, 0.12);
`;

// 모달 전체 프레임
const ModalFrame = styled.div`
  width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
  background-color: ${Theme.colors.white};
`;

// 텍스트 내용이 들어가는 상단 영역
const ContentArea = styled.div`
  flex: 1;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
`;

// 실제로 바뀌는 내용만 감싸는 박스
const AnimatedContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  animation: ${slideInContent} 0.42s ease;
`;

// 제목, 본문 등을 세로로 쌓는 영역
const TextStack = styled.div`
  width: 100%;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;
`;

// 메인 제목
const Title = styled.span`
  font-size: 32px;
`;

// 부제목
const SecondTitle = styled.span`
  font-size: 14px;
`;

// 두 줄 이상 본문
const Content = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  line-height: 1.45;
`;

// 한 줄 본문
const SingleLineText = styled.span`
  font-size: 14px;
  line-height: 1.45;
`;

// 안내 문구 여러 줄 묶음
const InfoStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

// 안내 문구 한 줄
const InfoText = styled.span`
  font-size: 14px;
  line-height: 1.4;
`;

// 점 3개가 들어가는 영역
const IndicatorArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  flex-shrink: 0;
`;

// 점 3개 정렬
const DotArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 22px;
`;

// 각 점 스타일
const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) =>
    active ? Theme.colors.black : "#b3b3b3"};
`;

// 하단 버튼 전체 영역
const BottomArea = styled.div`
  width: 100%;
  flex-shrink: 0;
`;

// 버튼 위 선 포함 버튼 래퍼
const ButtonWrap = styled.div`
  display: flex;
  width: 100%;
  border-top: 1px solid ${Theme.colors.black};
`;

// 버튼 공통 스타일
const BaseButton = styled.button`
  width: 50%;
  min-height: 45px;
  border: none;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
`;

// 오늘 하루 열지 않기 버튼
const TodayCloseButton = styled(BaseButton)`
  background-color: ${Theme.colors.white};
  color: ${Theme.colors.black};
`;

// 닫기 버튼
const CloseButton = styled(BaseButton)`
  background-color: ${Theme.colors.black};
  color: ${Theme.colors.white};
`;

// 순서대로 보여줄 모달 내용 데이터
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

// block 타입에 따라 다른 본문 UI로 바꿔주는 함수
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

export default function MainIntroModalCarousel() {
  // 오늘 하루 숨김 여부에 따라 모달 표시 여부 결정
  const [isVisible, setIsVisible] = useState(() => {
    return localStorage.getItem(MODAL_HIDE_KEY) !== getTodayKey();
  });

  // 현재 보여줄 모달 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);

  // 5초마다 바뀌는 interval 저장용 ref
  const intervalRef = useRef(null);

  // 모달이 보일 때만 5초 간격 자동 전환
  useEffect(() => {
    if (!isVisible) return;

    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % modalContents.length);
    }, MODAL_INTERVAL);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [isVisible]);

  // 일반 닫기 버튼
  const handleClose = () => {
    setIsVisible(false);
  };

  // 오늘 하루 열지 않기 버튼
  const handleTodayClose = () => {
    localStorage.setItem(MODAL_HIDE_KEY, getTodayKey());
    setIsVisible(false);
  };

  // 현재 인덱스에 맞는 모달 내용 가져오기
  const currentContent = useMemo(
    () => modalContents[currentIndex],
    [currentIndex],
  );

  // 안 보이게 되어 있으면 렌더링하지 않음
  if (!isVisible) return null;

  return (
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
            <Dot active={currentIndex === 0} />
            <Dot active={currentIndex === 1} />
            <Dot active={currentIndex === 2} />
          </DotArea>
        </IndicatorArea>

        <BottomArea>
          <ButtonWrap>
            <TodayCloseButton onClick={handleTodayClose}>
              오늘 하루 열지 않기
            </TodayCloseButton>
            <CloseButton onClick={handleClose}>닫기</CloseButton>
          </ButtonWrap>
        </BottomArea>
      </ModalFrame>
    </Overlay>
  );
}
