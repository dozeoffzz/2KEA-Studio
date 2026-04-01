import { useState } from "react";
import styled from "@emotion/styled";
import { createPortal } from "react-dom";
import { Theme } from "../../styles/theme";
import qrCode from "../../assets/imgs/Instagram/qr.svg";
import bgImage from "../../assets/imgs/main/rightchair.webp";

// 전체 화면 덮는 불투명 배경
const Overlay = styled.div`
  position: fixed;
  left: 115px;
  top: 465px;
  z-index: 999;
  background-color: ${Theme.colors.overlay};
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.media.tablet} {
    left: 66px;
    top: 410px;
  }

  ${({ theme }) => theme.media.mobile} {
    top: 260px;
    left: 47%;
    transform: translate(-50%, -50%);
  }
`;

// 모달 전체 컨테이너
const ModalContainer = styled.div`
  position: relative;
  width: 360px;

  ${({ theme }) => theme.media.tablet} {
    width: 320px;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 270px;
  }
`;

// 모달 배경 이미지 영역
const ModalInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 25px 20px 37px;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  text-align: center;

  ${({ theme }) => theme.media.tablet} {
    gap: 5px;
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 10px 10px 32px;
    gap: 8px;
  }

  // 이미지 위에 반투명 레이어 올려서 연하게
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${Theme.colors.qrimgbg};
  }
`;

// 이미지 안쪽 맨 밑에 버튼들을 배치하기
const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 7px;
  left: 0;
  padding: 0 15px;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

// 버튼 스타일
const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: ${Theme.fontsize.desktop.small};
  color: ${Theme.colors.blacktext};
  cursor: pointer;
  font-family: sans-serif;
  opacity: 0.8;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.small};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
  }

  &:hover {
    opacity: 1;
  }
`;

// 텍스트들이 레이어 위에 보이게
const Title = styled.p`
  position: relative;
  z-index: 1;
  font-size: ${Theme.fontsize.desktop.section};
  color: ${Theme.colors.blacktext};
  font-weight: 400;
  letter-spacing: 2px;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.section};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.content};
  }
`;

const SubTitle = styled.p`
  position: relative;
  z-index: 1;
  font-size: ${Theme.fontsize.desktop.content};
  font-family: sans-serif;
  font-weight: ${Theme.fontweight.qrweight};
  color: ${Theme.colors.qrtext};
  line-height: 1.6;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.medium};
  }
`;

const InstaLabel = styled.p`
  position: relative;
  z-index: 1;
  font-size: ${Theme.fontsize.desktop.small};
  color: ${Theme.colors.blacktext};
  letter-spacing: 2px;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.small};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

// qr 이미지 박스
const QrBox = styled.div`
  position: relative;
  z-index: 1;
  width: 140px;
  height: 140px;
  background-color: ${Theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  ${({ theme }) => theme.media.tablet} {
    width: 110px;
    height: 110px;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 90px;
    height: 90px;
  }
`;

const QrImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DownText = styled.p`
  position: relative;
  z-index: 1;
  font-size: ${Theme.fontsize.desktop.small};
  color: ${Theme.colors.blacktext};
  letter-spacing: 1px;

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

const ScanText = styled.p`
  position: relative;
  z-index: 1;
  font-size: ${Theme.fontsize.desktop.medium};
  color: ${Theme.colors.blacktext};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

const MODAL_HIDE_KEY = "2KEA_MODAL_HIDE";
const getTodayKey = () => new Date().toLocaleDateString();

export default function InstagramModal({ isOpen, onClose }) {
  // 오늘 하루 숨김 여부 상태 관리
  const [isVisible, setIsVisible] = useState(() => {
    return localStorage.getItem(MODAL_HIDE_KEY) !== getTodayKey();
  });

  const targetElement = document.querySelector("#modal-root");

  // 오늘 하루 열지 않기 클릭
  const handleTodayClose = () => {
    localStorage.setItem(MODAL_HIDE_KEY, getTodayKey());
    setIsVisible(false);
    onClose();
  };

  // 일반 닫기 핸들러
  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  // 조건부 렌더링
  if (!isOpen || !isVisible || !targetElement) return null;

  return createPortal(
    <Overlay>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalInner>
          <Title>2KEA ARCHIVE</Title>
          <SubTitle>
            공간의 가치를 더하는
            <br />
            2KEA만의 시각적 기록
          </SubTitle>
          <InstaLabel>- 공식 INSTAGRAM -</InstaLabel>

          <QrBox>
            <QrImage src={qrCode} alt="인스타그램 QR 코드" />
          </QrBox>

          <DownText>- 팔로우 시 신제품 소식과 스타일링 팁 제공 -</DownText>
          <ScanText>[QR] 스캔하여 스토리를 만나보세요</ScanText>

          <ButtonWrapper>
            <CloseBtn onClick={handleTodayClose}>오늘 하루 열지 않기</CloseBtn>
            <CloseBtn onClick={handleClose}>닫기</CloseBtn>
          </ButtonWrapper>
        </ModalInner>
      </ModalContainer>
    </Overlay>,
    targetElement,
  );
}
