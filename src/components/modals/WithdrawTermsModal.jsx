import styled from "@emotion/styled";
import { createPortal } from "react-dom";
import { Theme } from "../../styles/theme";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${Theme.colors.overlay};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const TermsBox = styled.div`
  width: 350px;
  max-height: 380px;
  background: white;
  padding: 20px;
  overflow-y: auto;
  position: relative;

  &::-webkit-scrollbar {
    width: 4px;
  }

  scrollbar-color: ${Theme.colors.grayline} transparent;

  ${({ theme }) => theme.media.mobile} {
    min-width: 300px;
    padding: 16px;
    margin: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid ${Theme.colors.grayline};
`;

const Title = styled.h3`
  font-size: ${Theme.fontsize.desktop.small};
`;

const CloseBtn = styled.button`
  font-family: sans-serif;
  cursor: pointer;
`;

const Content = styled.p`
  font-size: ${Theme.fontsize.desktop.mini};
  line-height: 1.5;
  white-space: pre-line;
`;

export default function WithdrawTermsModal({ type, onClose }) {
  const target = document.querySelector("#modal-root");
  if (type !== "terms" || !target) return null;

  const title = "탈퇴약관";
  const content = `
제1조 ( 계정 및 개인정보 삭제 )
- 회원탈퇴 시 계정 및 관련 개인정보는 즉시 또는 관련 법령에 
- 따라 일정 기간 보관 후 파기됩니다.
- 삭제된 정보는 어떠한 경우에도 복구되지 않습니다.

제2조 ( 서비스 이용 기록 처리 )
- 회원이 작성한 게시물, 리뷰 등은 삭제 또는 비식별 처리될 수 있습니다.
- 관계 법령 및 서비스 정책에 따라 일부 정보는 삭제되지 않을 수 있습니다.

제3조 ( 탈퇴 유예기간 )
- 탈퇴 신청 후 7일간 계정 복구가 가능하며, 해당 기간 내 로그인 시 
- 탈퇴 신청은 자동 취소됩니다.
- 유예기간 경과 후에는 계정 및 관련 정보가 완전히 삭제되며 
복구가 불가능합니다.

제4조 (서비스 이용 제한 및 재가입 )
- 탈퇴 완료 후 동일 계정으로 서비스 이용이 불가능합니다.
- 동일 정보로 재가입 시 서비스 이용이 제한될 수 있습니다.

제5조 ( 책임 제한 )
- 회원탈퇴로 인해 발생하는 데이터 손실 및 기타 불이익에 대해 회사는 관련 법령에 특별한 규정이 없는 한 책임을 지지 않습니다.
`;

  return createPortal(
    <Overlay onClick={onClose}>
      <TermsBox onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{title}</Title>
          <CloseBtn onClick={onClose}>X</CloseBtn>
        </Header>
        <Content>{content}</Content>
      </TermsBox>
    </Overlay>,
    target,
  );
}
