import styled from "@emotion/styled";
import { createPortal } from "react-dom";
import { Theme } from "../../styles/theme";
import qrCode from "../../assets/imgs/Instagram/qr.svg";
import bgImage from "../../assets/imgs/main/rightchair.webp";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: ${Theme.colors.overlay};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  position: relative;
  width: 400px;
`;

// 오른쪽 상단 x 버튼
const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  color: ${Theme.colors.blacktext};
  font-size: 20px;
  cursor: pointer;
  z-index: 10;
`;

// 모달 배경 이미지
const ModalInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px 30px;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  text-align: center;

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
`;

const SubTitle = styled.p`
  position: relative;
  z-index: 1;
  font-size: ${Theme.fontsize.desktop.content};
  font-family: sans-serif;
  font-weight: ${Theme.fontweight.qrweight};
  color: ${Theme.colors.qrtext};
  line-height: 1.6;
`;

const InstaLabel = styled.p`
  position: relative;
  z-index: 1;
  font-size: ${Theme.fontsize.desktop.small};
  color: ${Theme.colors.blacktext};
  letter-spacing: 2px;
`;

// qr 이미지 박스
const QrBox = styled.div`
  position: relative;
  z-index: 1;
  width: 160px;
  height: 160px;
  background-color: ${Theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const QrImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BottomText = styled.p`
  position: relative;
  z-index: 1;
  font-size: ${Theme.fontsize.desktop.small};
  color: ${Theme.colors.blacktext};
  letter-spacing: 1px;
`;

const ScanText = styled.p`
  position: relative;
  z-index: 1;
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.blacktext};
`;

// isOpen - 모달 열고 닫는 상태값
export default function InstagramModal({ isOpen, onClose }) {
  // modal-root에 모달 렌더링하기
  const targetElement = document.querySelector("#modal-root");

  // isOpen이 false면 아무것도 안보이게
  if (!isOpen) return null;

  return createPortal(
    // 오버레이 클릭하면 모달 닫히게
    <Overlay onClick={onClose}>
      {/* 모달 박스 클릭시 닫히지 않게 */}
      <ModalBox onClick={(e) => e.stopPropagation()}>
        {/* x 버튼 누르면 onClose */}
        <CloseBtn onClick={onClose}>X</CloseBtn>

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

          <BottomText>- 팔로우 시 신제품 소식과 스타일링 팁 제공 -</BottomText>
          <ScanText>[QR] 스캔하여 스토리를 만나보세요</ScanText>
        </ModalInner>
      </ModalBox>
    </Overlay>,
    targetElement,
  );
}
