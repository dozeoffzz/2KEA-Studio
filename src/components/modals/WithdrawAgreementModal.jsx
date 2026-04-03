import { useState } from "react";
import styled from "@emotion/styled";
import { createPortal } from "react-dom";
import { Theme } from "../../styles/theme";
import WithdrawTermsModal from "./WithdrawTermsModal";
import { useCartStore } from "../../stores/useCartStore";

const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  z-index: 998;
  background-color: ${Theme.colors.overlay};
  backdrop-filter: blur(2px);
`;

const ModalFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 520px;
  background-color: ${Theme.colors.white};
  box-shadow: 4px 4px 10px;
  overflow: hidden;

  ${({ theme }) => theme.media.mobile} {
    width: calc(100vw - 32px);
    max-width: 520px;
  }
`;

const ContentArea = styled.div`
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
  margin: 30px 0 0;
  color: ${Theme.colors.blacktext};
  font-family: "ZenSerif";
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0.03em;

  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
  }
`;

const SectionTitle = styled.p`
  margin: 20px 0 5px;
  width: 100%;
  color: ${Theme.colors.blacktext};
  font-family: "ZenSerif";
  font-size: ${Theme.fontsize.desktop.content};
  font-weight: 400;
  letter-spacing: 0.03em;
  text-align: left;

  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
  }
`;

const TermsCard = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.graybg};
  padding: 12px 16px 14px;
  text-align: left;
`;

const TermsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
`;

const TermsItemTitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.blacktext};
  font-family: "ZenSerif";
  font-size: ${Theme.fontsize.desktop.content};
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0.03em;

  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
  }
`;

const ViewButton = styled.button`
  padding: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.textsecondary};
  font-family: "ZenSerif";
  font-size: 15px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0.03em;
  text-decoration: underline;
  white-space: nowrap;
  border: none;
  cursor: pointer;

  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
  }
`;

const TermsText = styled.div`
  margin-top: 4px;
  margin-left: 32px;
  color: ${({ theme }) => theme.colors.blacktext};
  font-family: "ZenSerif";
  font-size: ${Theme.fontsize.desktop.content};
  font-weight: 400;
  letter-spacing: 0.03em;

  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
  }

  div + div {
    margin-top: 4px;
  }
`;

const AgreeRow = styled.label`
  margin: 14px auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: fit-content;
  max-width: 100%;
  color: ${({ theme }) => theme.colors.blacktext};
  font-family: "ZenSerif";
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0.03em;
  cursor: pointer;
  text-align: center;

  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
  }
`;

const AgreeText = styled.span`
  display: inline-block;
  text-align: center;
`;

const Checkbox = styled.input`
  width: 10px;
  height: 10px;
  margin: 0;
  flex-shrink: 0;
  appearance: none;
  border: 0.3px solid ${({ theme }) => theme.colors.blacktext};
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  cursor: pointer;

  &:checked::after {
    content: "";
    position: absolute;
    left: 2px;
    top: -1px;
    width: 3px;
    height: 6px;
    border-right: 1px solid ${({ theme }) => theme.colors.blacktext};
    border-bottom: 1px solid ${({ theme }) => theme.colors.blacktext};
    transform: rotate(45deg);
  }
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

export default function WithdrawAgreementModal({ isOpen, onClose, onConfirm }) {
  const targetElement = document.getElementById("modal-root");
  const [isChecked, setIsChecked] = useState(false);
  const [termsType, setTermsType] = useState("");

  if (!isOpen || !targetElement) return null;

  const handleConfirm = () => {
    if (!isChecked) {
      alert("약관에 동의해주세요.");
      return;
    }
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    localStorage.removeItem("address");
    localStorage.removeItem("point");
    localStorage.removeItem("orderData");
    localStorage.removeItem("delivery");

    // 장바구니 초기화
    useCartStore.getState().clearCart();

    // 탈퇴 완료 안내
    alert("회원탈퇴가 완료되었습니다.");

    // 로그아웃 + 페이지 이동
    window.location.href = "/";
    onConfirm?.();
  };

  return createPortal(
    <>
      <Overlay>
        <ModalFrame>
          <ContentArea>
            <TitleWrap>
              <Title>회원탈퇴 약관 안내</Title>
            </TitleWrap>

            <Description>회원탈퇴 전 아래 사항을 반드시 확인하시길 바랍니다.</Description>

            <SectionTitle>회원탈퇴 약관</SectionTitle>

            <TermsCard>
              <TermsHeader>
                <TermsItemTitle>제1조 ( 계정 및 개인정보 삭제 )</TermsItemTitle>
                <ViewButton type="button" onClick={() => setTermsType("terms")}>
                  약관보기
                </ViewButton>
              </TermsHeader>

              <TermsText>
                <div>
                  1) 회원탈퇴 시 계정 및 관련 개인정보는 즉시 또는 관련 법령에 따라 일정 기간 보관 후 파기됩니다.
                </div>
                <div>2) 삭제된 정보는 어떠한 경우에도 복구되지 않습니다.</div>
              </TermsText>
            </TermsCard>

            <AgreeRow>
              <Checkbox type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
              <AgreeText>[ 필수 ] 상기 내용을 모두 확인하였으며, 회원탈퇴에 동의합니다.</AgreeText>
            </AgreeRow>
          </ContentArea>

          <ButtonWrap>
            <CancelButton type="button" onClick={onClose}>
              탈퇴취소
            </CancelButton>
            <ConfirmButton type="button" onClick={handleConfirm}>
              회원탈퇴
            </ConfirmButton>
          </ButtonWrap>
        </ModalFrame>
      </Overlay>

      <WithdrawTermsModal type={termsType} onClose={() => setTermsType("")} />
    </>,
    targetElement,
  );
}
