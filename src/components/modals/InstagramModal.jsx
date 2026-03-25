import styled from "@emotion/styled";
import { createPortal } from "react-dom";
import { Theme } from "../../styles/theme";
import qrCode from "../../assets/imgs/Instagram/qr.svg";
import bgImage from "../../assets/imgs/main/rightchair.webp";

const Overlay = styled.div`
  position: fixed;
  left: 116px;
  bottom: 140px;
  z-index: 999;
  background-color: ${Theme.colors.overlay};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  position: relative;
  width: 400px;

  ${({ theme }) => theme.media.mobile} {
    width: 270px;
  }
`;

// 오른쪽 상단 x 버튼
const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  color: ${Theme.colors.blacktext};
  font-size: 18px;
  font-family: sans-serif;
  cursor: pointer;
  z-index: 10;

  ${({ theme }) => theme.media.mobile} {
    font-size: 15px;
  }
`;

// 모달 배경 이미지
const ModalInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 20px 15px;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  text-align: center;

  ${({ theme }) => theme.media.mobile} {
    padding: 20px 15px;
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

// 텍스트들이 before 레이어 위에 보이게
const Title = styled.p`
  position: relative;
  z-index: 1;
  font-size: ${Theme.fontsize.desktop.section};
  color: ${Theme.colors.blacktext};
  font-weight: 400;
  letter-spacing: 2px;

  ${({ theme }) => theme.media.mobile} {
    font-size: 18px;
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

  ${({ theme }) => theme.media.mobile} {
    font-size: 16px;
  }
`;

const InstaLabel = styled.p`
  position: relative;
  z-index: 1;
  font-size: ${Theme.fontsize.desktop.small};
  color: ${Theme.colors.blacktext};
  letter-spacing: 2px;

  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
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

  ${({ theme }) => theme.media.mobile} {
    width: 100px;
    height: 100px;
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
    font-size: 11px;
  }
`;

const ScanText = styled.p`
  position: relative;
  z-index: 1;
  font-size: ${Theme.fontsize.desktop.medium};
  color: ${Theme.colors.blacktext};

  ${({ theme }) => theme.media.mobile} {
    font-size: 14px;
  }
`;

// 버튼 전체
const BottomArea = styled.div`
  width: 100%;
  flex-shrink: 0;
`;

// 버튼 위 선
const ButtonWrap = styled.div`
  display: flex;
  width: 100%;
  border-top: 1px solid ${Theme.colors.black};
`;

// 닫기버튼
const BaseButton = styled.button`
  width: 50%;
  min-height: 36px;
  border: none;
  font-size: 12px;
  text-align: center;
  cursor: pointer;

  ${({ theme }) => theme.media.mobile} {
    min-height: 32px;
    font-size: 11px;
  }
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

// isOpen 모달 열고 닫는 상태값
export default function InstagramModal({ isOpen, onClose }) {
  // modal-root에 모달 렌더링하기
  const targetElement = document.querySelector("#modal-root");

  // isOpen이 false면 아무것도 안보이게
  if (!isOpen) return null;

  // 메인 모달과 동일하게 오늘 하루 열지 않기 로컬스토리지에 오늘 날짜 저장
  function handleTodayClose() {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem("hideInstaModalDate", today);
    onClose();
  }

  return createPortal(
    // 오버레이 클릭하면 모달 닫히게
    <Overlay onClick={onClose}>
      {/* 모달 박스 클릭시 닫히지 않게 */}
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalInner>
          <Title>2KEA ARCHIVE</Title>
          <SubTitle>
            공간의 가치를 더하는
            <br />
            2KEA만의 시각적 기록
          </SubTitle>
          <InstaLabel>- 공식 INSTAGRAM -</InstaLabel>

          {/* import한 qrCode 이미지 */}
          <QrBox>
            <QrImage src={qrCode} alt="인스타그램 QR 코드" />
          </QrBox>

          <DownText>- 팔로우 시 신제품 소식과 스타일링 팁 제공 -</DownText>
          <ScanText>[QR] 스캔하여 스토리를 만나보세요</ScanText>
        </ModalInner>

        {/* 버튼은 메인 모달이랑 동일가게한거 */}
        <BottomArea>
          <ButtonWrap>
            <TodayCloseButton onClick={handleTodayClose}>
              오늘 하루 열지 않기
            </TodayCloseButton>
            <CloseButton onClick={onClose}>닫기</CloseButton>
          </ButtonWrap>
        </BottomArea>
      </ModalBox>
    </Overlay>,
    targetElement,
  );
}
