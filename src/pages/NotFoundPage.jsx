import styled from "@emotion/styled";
import { NavLink, useNavigate } from "react-router-dom";
import cushionImg from "../assets/imgs/Cushion.svg";
import { Theme } from "../styles/theme";

// 페이지 전체 배경
const Page = styled.div`
  padding: 0 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 50px;
  min-height: 100vh;
  gap: 60px;

  ${({ theme }) => theme.media.tablet} {
    padding: 0 40px;
  }

  @media (max-width: 670px) {
    padding: 0 20px;
  }
`;

// 404 숫자와 메시지를 묶는 영역
const DesktopCluster = styled.div`
  display: flex;
  flex-direction: column;
`;

// 4 + 쿠션 + 4 가로 배치
const ErrorWrap = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  padding: 0 100px;
  transition: all 0.3s ease;

  ${({ theme }) => theme.media.tablet} {
    padding: 0 50px;
    gap: 50px;
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 0 20px;
    gap: 40px;
  }

  @media (max-width: 670px) {
    gap: 30px;
    padding: 0 25px;
  }

  @media (max-width: 420px) {
    gap: 20px;
    padding: 0 30px;
  }
`;

// 양옆 숫자 4 스타일
const Four = styled.span`
  font-size: 180px;
  transition: all 0.3s ease;

  ${({ theme }) => theme.media.mobile} {
    font-size: 150px;
  }

  @media (max-width: 670px) {
    font-size: 100px;
  }

  @media (max-width: 420px) {
    font-size: 80px;
  }
`;

// 가운데 0 역할을 하는 쿠션 이미지
const Cushion = styled.img`
  object-fit: contain;
  transition: all 0.3s ease;

  ${({ theme }) => theme.media.tablet} {
    width: 230px;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 180px;
  }

  @media (max-width: 670px) {
    width: 130px;
  }

  @media (max-width: 420px) {
    width: 100px;
  }
`;

// 404 아래의 Page Not Found 텍스트
const Message = styled.p`
  display: flex;
  justify-content: flex-end;
  font-size: 32px;
  white-space: nowrap;
  transition: all 0.3s ease;

  ${({ theme }) => theme.media.tablet} {
    font-size: 28px;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: 24px;
  }

  @media (max-width: 670px) {
    font-size: 18px;
  }

  @media (max-width: 420px) {
    font-size: 16px;
  }
`;

// 오른쪽 Back / Back to Main 버튼 묶음
const ActionArea = styled.div`
  width: 260px;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  gap: 10px;
  transition: all 0.3s ease;

  ${({ theme }) => theme.media.tablet} {
    width: 200px;
    gap: 5px;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 160px;
  }

  @media (max-width: 670px) {
    width: 120px;
  }

  @media (max-width: 420px) {
    width: 100px;
  }
`;

const ActionBackBtn = styled.span`
  font-size: 26px;
  font-weight: ${Theme.fontweight.qrweight};
  transition: all 0.3s ease;

  ${({ theme }) => theme.media.tablet} {
    font-size: 22px;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: 20px;
  }

  @media (max-width: 670px) {
    font-size: 16px;
  }

  @media (max-width: 420px) {
    font-size: 12px;
  }
`;

// 밑줄 포함 네비게이션 버튼
const ActionBackButton = styled.button`
  padding: 0 0 10px;
  border-bottom: 1px solid ${Theme.colors.black};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${Theme.fontsize.desktop.title};
  transition: all 0.3s ease;

  &:hover {
    border-bottom: 3px solid ${Theme.colors.textsecondary};
  }

  ${({ theme }) => theme.media.tablet} {
    padding: 0 0 5px;
    font-size: ${Theme.fontsize.tablet.title};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.title};
  }

  @media (max-width: 670px) {
    font-size: ${Theme.fontsize.mobile.content};
  }
`;
const ActionBackMainButton = styled(ActionBackButton)``;

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Page>
      {/* 404 숫자와 메시지 */}
      <DesktopCluster>
        <ErrorWrap>
          <Four>4</Four>
          <Cushion src={cushionImg} alt="red bean bag cushion" />
          <Four>4</Four>
        </ErrorWrap>
        <Message>Page Not Found</Message>
      </DesktopCluster>

      {/* 오른쪽 이동 버튼 영역 */}
      <ActionArea>
        <ActionBackButton type="button" onClick={() => navigate(-1)}>
          <ActionBackBtn>Back</ActionBackBtn>
          <span>›</span>
        </ActionBackButton>
        <ActionBackMainButton type="button" onClick={() => navigate("/")}>
          <ActionBackBtn>Back to Main</ActionBackBtn>
          <span>›</span>
        </ActionBackMainButton>
      </ActionArea>
    </Page>
  );
}
