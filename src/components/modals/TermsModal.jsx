import styled from "@emotion/styled";
import { createPortal } from "react-dom";
import { Theme } from "../../styles/theme";

// 화면 전체 덮는 오버레이
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
  z-index: 999;
`;

// 약관 내용 들어가는 모달
const TermsBox = styled.div`
  width: 350px;
  max-height: 380px;
  background: white;
  padding: 20px;
  overflow-y: auto;
  position: relative;
  // 스크롤 좀더 얇게
  &::-webkit-scrollbar {
    width: 4px;
  }
  scrollbar-color: ${Theme.colors.grayline} transparent;
  /* overflow: hidden; */

  ${({ theme }) => theme.media.mobile} {
    min-width: 300px;
    padding: 16px;
    margin: 20px;
  }
`;

// 타이틀이랑 같이 닫기 버튼 묶는 부분
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

// 닫기 버튼
const CloseBtn = styled.button`
  font-family: sans-serif;
  cursor: pointer;
`;

// 약관 내용
const Content = styled.p`
  font-size: ${Theme.fontsize.desktop.mini};
  line-height: 1.5;
  white-space: pre-line;
`;

// 약관 선택에 따라 다르게 보이게
export default function TermsModal({ type, onClose }) {
  const target = document.querySelector("#modal-root");
  if (!type || !target) return null;

  // type 따라 내용 바뀌게
  let title = "";
  let content = "";

  if (type === "privacy") {
    title = "개인정보 이용약관";
    content = `
제1조 ( 수집하는 개인정보 항목 )
회사는 회원가입 및 서비스 이용을 위해 다음과 같은 개인정보를 수집합니다.
- 필수항목: 이름, 아이디, 비밀번호, 휴대전화번호, 이메일 주소

제2조 ( 개인정보의 수집 및 이용 목적 )
회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
- 회원 식별 및 본인 확인
- 서비스 제공 및 계약 이행
- 부정 이용 방지 및 비인가 사용 방지
- 공지사항 전달 및 고객 문의 응대

제3조 ( 개인정보의 보유 및 이용기간 )
회원의 개인정보는 원칙적으로 회원 탈퇴 시까지 보유 및 이용됩니다.
단, 관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간 동안 보관됩니다.

제4조 ( 개인정보의 제3자 제공 )
회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
다만, 법령에 의거하거나 이용자의 사전 동의가 있는 경우에 한하여 제공됩니다.

제5조 ( 이용자의 권리 )
이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며,
수집 및 이용에 대한 동의를 철회할 수 있습니다.

제6조 ( 동의 거부 권리 )
이용자는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다.
단, 동의를 거부할 경우 서비스 이용이 제한될 수 있습니다.
`;
  }

  if (type === "terms") {
    title = "쇼핑몰 이용약관";
    content = `
제1조 ( 목적 )
본 약관은 2KEA-Studio가 운영하는 쇼핑몰에서 제공하는 서비스 이용 조건 및 절차를 규정함을 목적으로 합니다.

제2조 ( 서비스의 제공 )
회사는 다음과 같은 업무를 수행합니다.
- 상품 정보 제공 및 구매 계약 체결
- 상품 배송 및 교환/환불 처리
- 고객 상담 서비스 제공

제3조 ( 계약의 성립 )
이용자가 상품 구매를 신청하고 회사가 이를 승낙함으로써 계약이 성립됩니다.

제4조 ( 청약철회 및 환불 )
이용자는 상품을 공급받은 날로부터 7일 이내에 청약철회를 할 수 있습니다.
단, 상품이 훼손되었거나 사용된 경우에는 제한될 수 있습니다.

제5조 ( 이용자의 의무 )
이용자는 다음 행위를 해서는 안됩니다.
- 타인의 정보 도용
- 허위 정보 입력
- 서비스 운영 방해 행위

제6조 ( 회사의 면책 )
회사는 천재지변, 시스템 장애 등 불가항력적인 사유로 서비스를 제공할 수 없는 경우 책임을 지지 않습니다.

제7조 ( 분쟁 해결 )
회사와 이용자 간 분쟁이 발생할 경우 관련 법령에 따라 해결합니다.
`;
  }

  if (type === "marketing") {
    title = "쇼핑정보 수신 동의";
    content = `
제1조 ( 수집 및 이용 목적 )
회사는 다음과 같은 목적을 위해 개인정보를 활용합니다.
- 신규 상품 안내
- 이벤트 및 할인 정보 제공
- 맞춤형 마케팅 서비스 제공

제2조 ( 수집 항목 )
- 휴대전화번호
- 이메일 주소
- 서비스 이용 기록

제3조 ( 수신 방법 )
- SMS(문자 메시지)
- 이메일

제4조 ( 보유 기간 )
동의 철회 시까지 보유 및 이용됩니다.

제5조 ( 동의 거부 권리 )
본 동의는 선택 사항이며, 동의하지 않더라도 서비스 이용에는 제한이 없습니다.

제6조 ( 동의 철회 )
이용자는 언제든지 마이페이지 또는 설정 메뉴를 통해 수신 여부를 변경할 수 있습니다.
`;
  }

  return createPortal(
    <Overlay onClick={onClose}>
      {/* 모달 박스 클릭해도 안닫히게 */}
      <TermsBox onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{title}</Title>
          <CloseBtn onClick={onClose}>X</CloseBtn>
        </Header>
        {/* 내용 들어갈 부분 */}
        <Content>{content}</Content>
      </TermsBox>
    </Overlay>,
    target,
  );
}
