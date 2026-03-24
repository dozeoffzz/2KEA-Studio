import styled from "@emotion/styled";
import { NavLink, useNavigate } from "react-router-dom";
import cushionImg from "../assets/imgs/Cushion.svg";
import { Theme } from "../styles/theme";

// 페이지 전체 배경
const Page = styled.div`
  padding: 0 80px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;

  @media screen and (max-width: 1024px) {
    padding: 0 40px;
  }
  ${({ theme }) => theme.media.tablet} {
    padding: 0 40px;
  }
  ${({ theme }) => theme.media.mobile} {
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
  gap: 80px;

  @media screen and (max-width: 1024px) {
    gap: 80px;
  }
  ${({ theme }) => theme.media.tablet} {
    gap: 80px;
  }
  ${({ theme }) => theme.media.mobile} {
    gap: 40px;
  }
`;

// 양옆 숫자 4 스타일
const Four = styled.span`
  font-size: 230px;

  @media screen and (max-width: 1024px) {
    font-size: 200px;
  }
  ${({ theme }) => theme.media.tablet} {
    font-size: 200px;
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: 100px;
  }
`;

// 가운데 0 역할을 하는 쿠션 이미지
const Cushion = styled.img`
  object-fit: contain;

  @media screen and (max-width: 1024px) {
    width: 200px;
  }
  ${({ theme }) => theme.media.tablet} {
    width: 200px;
  }
  ${({ theme }) => theme.media.mobile} {
    width: 100px;
  }
`;

// 404 아래의 Page Not Found 텍스트
const Message = styled.p`
  display: flex;
  justify-content: flex-end;
  font-size: ${Theme.fontsize.desktop.title};
  white-space: nowrap;

  @media screen and (max-width: 1024px) {
    font-size: ${Theme.fontsize.tablet.title};
  }
  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.title};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.content};
  }
`;

// 오른쪽 Back / Back to Main 버튼 묶음
const ActionArea = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  gap: 30px;

  @media screen and (max-width: 1024px) {
    width: 230px;
    margin-top: 100px;
  }
  ${({ theme }) => theme.media.tablet} {
    width: 230px;
    margin-top: 100px;
  }
  ${({ theme }) => theme.media.mobile} {
    width: 150px;
    margin-top: 100px;
  }
`;

// 밑줄 포함 네비게이션 버튼
const ActionBackButton = styled.button`
  padding: 0 0 20px;
  border-bottom: 1px solid ${Theme.colors.black};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${Theme.fontsize.desktop.title};

  &:hover {
    border-bottom: 3px solid ${Theme.colors.textsecondary};
  }

  @media screen and (max-width: 1024px) {
    padding: 0 0 10px;
    font-size: ${Theme.fontsize.tablet.title};
  }
  ${({ theme }) => theme.media.tablet} {
    padding: 0 0 10px;
    font-size: ${Theme.fontsize.tablet.title};
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 0 0 5px;
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
          <span>Back</span>
          <span>›</span>
        </ActionBackButton>
        <ActionBackMainButton type="button" onClick={() => navigate("/")}>
          <span>Back to Main</span>
          <span>›</span>
        </ActionBackMainButton>
      </ActionArea>
    </Page>
  );
}
