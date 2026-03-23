import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Theme } from "../../styles/theme";

// 하단 푸터 전체 영역
const FooterWrap = styled.footer`
  width: 100%;
  height: 359px;
  flex-shrink: 0;
  background: linear-gradient(180deg, #fafafa 0%, #fafafa 35%, #d9d9d9 68%, #999999 100%);

  ${({ theme }) => theme.media.tablet} {
    height: auto;
  }
  ${({ theme }) => theme.media.mobile} {
    height: auto;
  }
`;

// 푸터 내부 기준 박스
const FooterInner = styled.div`
  width: 100%;
  max-width: 1920px;
  height: 100%;
  margin: 0 auto;

  ${({ theme }) => theme.media.tablet} {
    height: auto;
  }
  ${({ theme }) => theme.media.mobile} {
    height: auto;
  }
`;

// 푸터 상단 정보 영역
const FooterTop = styled.div`
  padding: 50px 100px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;

  ${({ theme }) => theme.media.tablet} {
    padding: 50px 50px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 50px 30px;
  }
`;

// 푸터 공통 제목
const FooterTitle = styled.h3`
  font-size: ${Theme.fontsize.desktop.content};
  margin: 0 0 22px;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
  }
`;

// CUSTOMER SERVICE 블록
const CustomerBlock = styled.div``;

// CUSTOMER SERVICE 설명 텍스트
const CustomerText = styled.p`
  font-size: ${Theme.fontsize.desktop.small};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.small};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: 10px;
  }
`;

// 온라인 문의 링크
const InquiryLink = styled.a`
  display: inline-block;
  margin-top: 8px;
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.blacktext};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: 9px;
  }
`;

// CONTACT / SOCIAL 오른쪽 컬럼 묶음
const RightColumns = styled.div`
  display: flex;
  gap: 90px;

  ${({ theme }) => theme.media.mobile} {
    gap: 10px;
  }
`;

// 오른쪽 단일 컬럼
const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

// CONTACT / SOCIAL 항목 텍스트
const ColumnItem = styled.p`
  font-size: ${Theme.fontsize.desktop.small};
  margin: 0 0 4px 0;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.small};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
  }
`;

const ColumnItemLink = styled.a`
  font-size: ${Theme.fontsize.desktop.small};
  margin: 0 0 4px 0;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.small};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
  }
`;

// 푸터 하단 사업자 정보 영역
const FooterBottom = styled.div`
  padding: 0 100px;
  display: flex;
  align-items: center;
  width: 100%;
  border-top: 1px solid ${Theme.colors.black};
  font-size: ${Theme.fontsize.desktop.small};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.small};
    padding: 0 50px;
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: 8px;
    padding: 0 30px;
  }
`;

// 푸터 하단 일반 텍스트
const BottomText = styled.p`
  margin-top: 25px;
`;

// 이용약관 / 개인정보 보호정책 묶음
const BottomLinks = styled.div`
  display: flex;
  gap: 18px;
`;

const Copyright = styled.p``;

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
              <ColumnItemLink href="https://www.instagram.com/2kea_studio/" target="_blank" rel="noopener noreferrer">
                Instagram
              </ColumnItemLink>
              <ColumnItemLink href="https://github.com/dozeoffzz/2KEA-Studio" target="_blank" rel="noopener noreferrer">
                Github
              </ColumnItemLink>
              <ColumnItemLink href="https://kr.pinterest.com/" target="_blank" rel="noopener noreferrer">
                Pinterest
              </ColumnItemLink>
              <ColumnItemLink href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                YouTube
              </ColumnItemLink>
            </Column>
          </RightColumns>
        </FooterTop>

        {/* 푸터 맨 아래 사업자 정보 */}
        <FooterBottom>
          <div>
            <BottomText>
              광주광역시 XX XX 대표 이가람, 이영연, 이해랑, 최은우, 최원희 사업자번호 XXX-XX-XXXXX
            </BottomText>
            <BottomLinks>
              <span>이용약관</span>
              <span>개인정보 보호정책</span>
            </BottomLinks>
            <Copyright>©2KEA rights reversed</Copyright>
          </div>
        </FooterBottom>
      </FooterInner>
    </FooterWrap>
  );
}
