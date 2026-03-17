import styled from "@emotion/styled";
import { NavLink, useNavigate } from "react-router-dom";
import cushionImg from "../assets/imgs/Cushion.svg";

// 페이지 전체 배경과 기본 글자색
const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  color: #0c0c0c;
`;

// 전체 레이아웃을 세로로 쌓는 최상위 프레임
const Frame = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
`;

// 상단 헤더 영역
const Header = styled.header`
  position: relative;
  width: 100%;
  height: 100px;
  flex-shrink: 0;
`;

// 1920 기준 헤더 내부 정렬용 박스
const HeaderInner = styled.div`
  position: relative;
  width: 100%;
  max-width: 1920px;
  height: 100%;
  margin: 0 auto;

  @media (max-width: 1279px) {
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
`;

// 공통 아이콘 버튼 스타일
const IconButtonBase = `
  position: absolute;
  border: 0;
  background: transparent;
  color: #0c0c0c;
  cursor: pointer;
  padding: 0;
`;

// 왼쪽 상단 + 버튼
const PlusButton = styled.button`
  ${IconButtonBase}
  top: 23px;
  left: 24px;
  width: 30px;
  height: 30px;
  font-size: 54px;
  font-weight: 300;
  line-height: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 가운데 브랜드 로고 텍스트
const Brand = styled(NavLink)`
  position: absolute;
  top: 3px;
  left: 835px;
  width: 262px;
  font-size: 34px;
  line-height: 1.05;
  text-align: center;
  letter-spacing: 0;
  color: #0c0c0c;
  text-decoration: none;

  @media (max-width: 1279px) {
    position: static;
    width: auto;
    min-width: 180px;
    max-width: 262px;
    padding-top: 3px;
    font-size: clamp(24px, 4vw, 34px);
  }

  @media (max-width: 768px) {
    min-width: 140px;
    font-size: 24px;
    line-height: 1;
  }
`;

// 오른쪽 상단 햄버거 버튼
const MenuButton = styled.button`
  ${IconButtonBase}
  top: 29px;
  right: 30px;
  width: 24px;
  height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1px 0;

  span {
    display: block;
    width: 24px;
    height: 3px;
    background: #0c0c0c;
  }
`;

// 메인 영역
const Main = styled.main`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// 404 콘텐츠가 들어가는 상단 섹션
const Hero = styled.section`
  width: 100%;
  min-height: 565px;
  flex-shrink: 0;

  @media (max-width: 1279px) {
    min-height: auto;
  }
`;

// 404와 버튼들을 배치하는 무대 영역
const HeroStage = styled.div`
  position: relative;
  width: 100%;
  max-width: 1920px;
  height: 100%;
  margin: 0 auto;

  @media (max-width: 1279px) {
    max-width: 100%;
    padding: 40px 24px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
    min-height: 565px;
    height: auto;
  }

  @media (max-width: 768px) {
    padding: 28px 20px 20px;
    gap: 28px;
    min-height: auto;
  }
`;

// 404 숫자와 메시지를 묶는 영역
const DesktopCluster = styled.div`
  position: absolute;
  left: 671px;
  top: 155px;
  width: 578px;
  height: 339px;

  @media (max-width: 1279px) {
    position: static;
    width: 100%;
    max-width: min(578px, 100%);
    height: auto;
  }
`;

// 4 + 쿠션 + 4 가로 배치
const ErrorWrap = styled.div`
  width: 578px;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;

  @media (max-width: 1279px) {
    width: 100%;
    height: auto;
    justify-content: center;
    gap: clamp(18px, 4vw, 40px);
  }

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

// 양옆 숫자 4 스타일
const Four = styled.span`
  width: 120px;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 230px;
  line-height: 1;
  font-weight: 400;
  flex-shrink: 0;

  @media (max-width: 1279px) {
    width: auto;
    height: auto;
    font-size: clamp(112px, 16vw, 230px);
  }
`;

// 가운데 0 역할을 하는 쿠션 이미지
const Cushion = styled.img`
  width: 238px;
  height: 188px;
  object-fit: contain;
  display: block;
  flex-shrink: 0;

  @media (max-width: 1279px) {
    width: clamp(140px, 22vw, 238px);
    height: auto;
  }
`;

// 404 아래의 Page Not Found 텍스트
const Message = styled.p`
  position: absolute;
  left: 402px;
  width: 176px;
  height: 34px;
  margin: 0;
  font-size: 34px;
  line-height: 1;
  text-align: left;
  white-space: nowrap;

  @media (max-width: 1279px) {
    position: static;
    width: auto;
    height: auto;
    margin-top: 26px;
    font-size: clamp(22px, 3vw, 34px);
    text-align: center;
  }
`;

// 오른쪽 Back / Back to Main 버튼 묶음
const ActionArea = styled.div`
  position: absolute;
  top: 374px;
  left: 1478px;
  width: 244px;
  display: flex;
  flex-direction: column;
  gap: 38px;

  @media (max-width: 1279px) {
    position: static;
    width: 100%;
    max-width: 320px;
    gap: 26px;
  }
`;

// 밑줄 포함 네비게이션 버튼
const ActionButton = styled.button`
  width: 246px;
  padding: 0 0 10px;
  border: 0;
  border-bottom: 1px solid #0c0c0c;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 36px;
  line-height: 1;
  font-weight: 400;
  color: #0c0c0c;
  cursor: pointer;
  text-align: left;

  span:first-of-type {
    display: inline-block;
    white-space: nowrap;
    flex: 1;
    min-width: 0;
    transform: translateY(2px);
  }

  span:last-of-type {
    font-size: 44px;
    line-height: 0.8;
    transform: translateY(-2px);
  }

  &:last-of-type span:last-of-type {
    transform: translate(6px, 2px);
  }

  @media (max-width: 1279px) {
    width: 100%;
    font-size: clamp(28px, 4vw, 36px);

    span:last-of-type {
      font-size: clamp(36px, 5vw, 44px);
      transform: translateY(-2px);
    }

    &:last-of-type span:last-of-type {
      transform: translateY(-1px);
    }
  }
`;

// 하단 푸터 전체 영역
const Footer = styled.footer`
  width: 100%;
  height: 359px;
  flex-shrink: 0;
  background: linear-gradient(180deg, #ffffff 0%, #fafafa 35%, #d9d9d9 68%, #999999 100%);

  @media (max-width: 1279px) {
    height: auto;
  }
`;

// 푸터 내부 기준 박스
const FooterInner = styled.div`
  position: relative;
  width: 100%;
  max-width: 1920px;
  height: 100%;
  margin: 0 auto;

  @media (max-width: 1279px) {
    max-width: 100%;
  }
`;

// 푸터 상단 정보 영역
const FooterTop = styled.div`
  position: relative;
  width: 100%;
  height: 249px;

  @media (max-width: 1279px) {
    height: auto;
    display: flex;
    justify-content: space-between;
    gap: 40px;
    padding: 44px 24px 36px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 28px;
    padding: 32px 20px 24px;
  }
`;

// 푸터 공통 제목
const FooterTitle = styled.h3`
  font-size: 23px;
  line-height: 1;
  font-weight: 400;
  margin: 0 0 22px;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 16px;
  }
`;

// CUSTOMER SERVICE 블록
const CustomerBlock = styled.div`
  position: absolute;
  top: 63px;
  left: 74px;

  @media (max-width: 1279px) {
    position: static;
  }
`;

// CUSTOMER SERVICE 설명 텍스트
const CustomerText = styled.p`
  font-size: 18px;
  line-height: 1.5;
  margin: 0 0 2px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

// 온라인 문의 링크
const InquiryLink = styled.a`
  display: inline-block;
  margin-top: 8px;
  font-size: 18px;
  line-height: 1.3;
  color: #0c0c0c;
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

// CONTACT / SOCIAL 오른쪽 컬럼 묶음
const RightColumns = styled.div`
  position: absolute;
  top: 53px;
  right: 166px;
  display: flex;
  gap: 91px;

  @media (max-width: 1279px) {
    position: static;
    gap: 56px;
  }

  @media (max-width: 768px) {
    gap: 40px;
    flex-wrap: wrap;
  }
`;

// 오른쪽 단일 컬럼
const Column = styled.div`
  min-width: 120px;
`;

// CONTACT / SOCIAL 항목 텍스트
const ColumnItem = styled.p`
  font-size: 18px;
  line-height: 1.45;
  margin: 0 0 4px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

// 푸터 하단 사업자 정보 영역
const FooterBottom = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 110px;
  border-top: 1px solid #0c0c0c;
  padding: 24px 74px 0;

  @media (max-width: 1279px) {
    position: static;
    height: auto;
    padding: 22px 24px 20px;
  }

  @media (max-width: 768px) {
    padding: 18px 20px 18px;
  }
`;

// 푸터 하단 일반 텍스트
const BottomText = styled.p`
  font-size: 16px;
  line-height: 1.35;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// 이용약관 / 개인정보 보호정책 묶음
const BottomLinks = styled.div`
  display: flex;
  gap: 18px;
  margin: 2px 0;
  font-size: 16px;
  line-height: 1.35;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 10px 16px;
    font-size: 14px;
  }
`;

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Page>
      <Frame>
        <Main>
          {/* 상단 404 메인 비주얼 영역 */}
          <Hero>
            <HeroStage>
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
                <ActionButton type="button" onClick={() => navigate(-1)}>
                  <span>Back</span>
                  <span>›</span>
                </ActionButton>
                <ActionButton type="button" onClick={() => navigate("/")}>
                  <span>Back to Main</span>
                  <span>›</span>
                </ActionButton>
              </ActionArea>
            </HeroStage>
          </Hero>
        </Main>
      </Frame>
    </Page>
  );
}
