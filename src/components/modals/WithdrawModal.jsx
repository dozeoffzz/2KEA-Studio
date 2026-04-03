import { useState } from "react";
import styled from "@emotion/styled";
import { createPortal } from "react-dom";
import { Theme } from "../../styles/theme";
import WithdrawAgreementModal from "./WithdrawAgreementModal";

const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  z-index: 9999;
  background-color: ${Theme.colors.overlay};
  backdrop-filter: blur(2px);
`;

const ModalFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 520px;
  min-height: 404px;
  background-color: ${Theme.colors.white};
  box-shadow: 4px 4px 10px;
  overflow: hidden;

  ${({ theme }) => theme.media.mobile} {
    width: calc(100vw - 32px);
    max-width: 520px;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: ${Theme.colors.white};

  ${({ theme }) => theme.media.mobile} {
    padding: 16px;
  }
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 34px;
`;

const Title = styled.p`
  margin: 0;
  font-family: "ZenSerif";
  font-size: ${Theme.fontsize.desktop.content};
  font-weight: 400;

  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
  }
`;

const Description = styled.p`
  margin: auto 0;
  width: 100%;
  color: ${Theme.colors.blacktext};
  font-family: "ZenSerif";
  font-size: ${Theme.fontsize.desktop.content};
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 1px;
  word-break: keep-all;
  text-align: center;

  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
  }
`;

const RedText = styled.span`
  color: #ff0000;
`;

const ButtonWrap = styled.div`
  height: 42px;
  display: flex;
  width: 100%;

  ${({ theme }) => theme.media.mobile} {
    height: 34px;
  }
`;

const BaseButton = styled.button`
  width: 50%;
  font-family: "ZenSerif";
  font-size: ${Theme.fontsize.desktop.content};
  font-weight: 400;
  border-top: 1px solid ${Theme.colors.black};
  cursor: pointer;

  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
  }
`;

const CancelButton = styled(BaseButton)`
  background-color: ${Theme.colors.white};
  color: ${Theme.colors.blacktext};
`;

const ConfirmButton = styled(BaseButton)`
  background-color: ${Theme.colors.black};
  color: ${Theme.colors.whitetext};
`;

export default function WithdrawModal({ isOpen, onClose, onWithdraw }) {
  const targetElement = document.getElementById("modal-root");
  const [isAgreementOpen, setIsAgreementOpen] = useState(false);

  if (!isOpen || !targetElement) return null;

  const handleOpenAgreement = () => {
    setIsAgreementOpen(true);
  };

  const handleCloseAgreement = () => {
    setIsAgreementOpen(false);
    onClose?.();
  };

  const handleConfirmWithdraw = () => {
    setIsAgreementOpen(false);
    onWithdraw?.();
  };

  return createPortal(
    <>
      {!isAgreementOpen && (
        <Overlay>
          <ModalFrame>
            <ContentArea>
              <TitleWrap>
                <Title>회원탈퇴 안내</Title>
              </TitleWrap>

              <Description>
                회원탈퇴를 진행하시면 계정 및 관련 정보가 삭제되며,
                <br />
                삭제된 데이터는 복구가 불가능합니다.
                <br />
                탈퇴 신청 후 <RedText>7일간의 유예기간</RedText>이 적용됩니다.
                <br />
                이 기간 내에 다시 로그인하시면 탈퇴가 자동으로 취소됩니다.
                <br />
                유예기간이 종료되면 모든 정보는 완전히 삭제됩니다.
                <br />
                탈퇴를 원하실 경우 아래 회원탈퇴 버튼을 눌러 진행해주세요.
              </Description>
            </ContentArea>

            <ButtonWrap>
              <CancelButton type="button" onClick={onClose}>
                탈퇴취소
              </CancelButton>
              <ConfirmButton type="button" onClick={handleOpenAgreement}>
                회원탈퇴
              </ConfirmButton>
            </ButtonWrap>
          </ModalFrame>
        </Overlay>
      )}

      <WithdrawAgreementModal
        isOpen={isAgreementOpen}
        onClose={handleCloseAgreement}
        onConfirm={handleConfirmWithdraw}
      />
    </>,
    targetElement,
  );
}
