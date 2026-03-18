import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

// 하단 푸터 전체 영역
const FooterWrap = styled.footer`
  width: 100%;
  height: 359px;
  flex-shrink: 0;
  background: linear-gradient(180deg, #fafafa 0%, #fafafa 35%, #d9d9d9 68%, #999999 100%);

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

export default function Footer() {
  return (
    <FooterWrap>
      <FooterInner>
        <FooterTop>
          {/* 왼쪽 고객센터 정보 */}
          <CustomerBlock>
            <FooterTitle>CUSTOMER SERVICE</FooterTitle>
            <CustomerText>평일 9:00 - 18:00 (점심시간 1:00 - 2:00)</CustomerText>
            <CustomerText>(토,일 공휴일 휴무)</CustomerText>
            <InquiryLink href="mailto:2KEA@email.com">온라인 문의 바로가기 →</InquiryLink>
          </CustomerBlock>

          {/* 오른쪽 연락처 / 소셜 정보 */}
          <RightColumns>
            <Column>
              <FooterTitle>CONTACT</FooterTitle>
              <ColumnItem>2KEA</ColumnItem>
              <ColumnItem>SOUTH KOREA</ColumnItem>
              <ColumnItem>+82 XX XXXX XXXX</ColumnItem>
              <ColumnItem>2KEA@email.com</ColumnItem>
            </Column>

            <Column>
              <FooterTitle>SOCIAL</FooterTitle>
              <ColumnItem>Instagram</ColumnItem>
              <ColumnItem>Github</ColumnItem>
              <ColumnItem>Pinterest</ColumnItem>
              <ColumnItem>YouTube</ColumnItem>
            </Column>
          </RightColumns>
        </FooterTop>

        {/* 푸터 맨 아래 사업자 정보 */}
        <FooterBottom>
          <BottomText>광주광역시 XX XX 대표 이가람, 이영연, 이해랑, 최은우, 최원희 사업자번호 XXX-XX-XXXXX</BottomText>
          <BottomLinks>
            <span>이용약관</span>
            <span>개인정보 보호정책</span>
          </BottomLinks>
          <BottomText>©2KEA right reversed</BottomText>
        </FooterBottom>
      </FooterInner>
      <div>
        <NavLink to={"/"}>메인 페이지로 이동</NavLink>
        <NavLink to={"/products"}>아이템 리스트 페이지로 이동</NavLink>
        <NavLink to={"/cart"}>쇼핑 카트 페이지로 이동</NavLink>
        <NavLink to={"/login"}>로그인 페이지로 이동</NavLink>
        <NavLink to={"/*"}>404 페이지로 이동</NavLink>
      </div>
    </FooterWrap>
  );
}
