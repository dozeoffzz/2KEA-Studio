//패키지 및 컴포넌트 임포트
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Theme } from "../styles/theme";
import { Link } from "react-router-dom";
import TopArea from "../components/main/TopArea";
import ScrollReveal from "../components/common/ScrollReveal";
import NewProductList from "../components/main/NewProductList";

//이벤트 광고 3
import MainIntroModalCarousel from "../components/modals/MainIntroModal";
// 인스타
import InstagramModal from "../components/modals/InstagramModal";

//API 호출
import { fetchMain } from "../apis/mainApi";

// 컴포넌트 스타일링
// 계획서에 명시되지 않은 부분은 피그마 참고해서 작업

//전체 컨테이너
const MainSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
`;

//상단 이미지 이후 컨테이너
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 130px;
  width: 100%;
  padding: 265px 110px 0;

  ${({ theme }) => theme.media.tablet} {
    padding: 140px 15px 0;
    gap: 140px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 65px 10px 0;
    gap: 65px;
  }
`;

//소파 이미지 영역
const SofaImageBox = styled.div`
  position: relative;
  width: 100%;
  max-width: 1592px;
  aspect-ratio: 1592 / 1111;
  margin: 0 50px 0 auto;

  ${({ theme }) => theme.media.tablet} {
    max-width: 696px;
    aspect-ratio: 696 / 785;
    margin: 0 15px 0 auto;
  }

  ${({ theme }) => theme.media.mobile} {
    max-width: 337px;
    aspect-ratio: 337 / 380;
    margin: 0 0 0 auto;
  }

  &:hover .sofa-hover-img {
    opacity: 1;
  }
`;

const SofaImage = styled.img`
  width: 100%;
  height: 100%;
`;

const SofaHoverImage = styled(SofaImage)`
  position: absolute;
  top: 0;
  right: 0;
  margin-left: auto;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
  cursor: pointer;
`;

const SofaDescBox = styled.div`
  position: absolute;
  bottom: -32px;
  left: -72px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 3;

  ${({ theme }) => theme.media.tablet} {
    bottom: 6px;
    left: -24px;
  }
  ${({ theme }) => theme.media.mobile} {
    gap: 4px;
    bottom: 4px;
    left: -8px;
  }
`;

const SofaTitle = styled.h3`
  font-size: ${Theme.fontsize.desktop.main.title};
  line-height: ${Theme.fontsize.desktop.main.title};
  font-weight: 400;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.main.title};
    line-height: ${Theme.fontsize.tablet.main.title};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.main.title};
    line-height: ${Theme.fontsize.mobile.main.title};
  }
`;

const SofaDesc = styled.p`
  font-size: ${Theme.fontsize.desktop.main.section};
  line-height: ${Theme.fontsize.desktop.main.section};
  font-weight: 400;
  margin-left: 96px;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.main.section};
    line-height: ${Theme.fontsize.tablet.main.section};
    margin-left: 40px;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.main.section};
    line-height: ${Theme.fontsize.mobile.main.section};
    margin-left: 16px;
  }
`;

//전등 이미지 영역
const LightImageBox = styled.div`
  position: relative;
  display: flex;
  gap: 24px;
  width: 100%;
  height: auto;
  padding: 32px;
  background-color: ${Theme.colors.redaccent};

  ${({ theme }) => theme.media.tablet} {
    height: 594px;
    gap: 12px;
    padding: 16px;
  }

  ${({ theme }) => theme.media.mobile} {
    height: 377px;
    padding: 8px;
  }
`;

const LightImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 838px;
  aspect-ratio: 838 / 863;
  overflow: hidden;

  :hover .light-hover-img {
    opacity: 1;
  }

  ${({ theme }) => theme.media.tablet} {
    max-width: 350px;
    aspect-ratio: 350 / 522;
  }

  ${({ theme }) => theme.media.mobile} {
    max-width: 241px;
    aspect-ratio: 241 / 315;
  }
`;

const LightImage = styled.img`
  width: 100%;
  max-width: 838px;
  aspect-ratio: 838 / 863;
  padding-bottom: 16px;

  ${({ theme }) => theme.media.tablet} {
    max-width: 350px;
    aspect-ratio: 350 / 522;
    padding-bottom: 8px;
  }

  ${({ theme }) => theme.media.mobile} {
    max-width: 241px;
    aspect-ratio: 241 / 315;
    padding-bottom: 4px;
  }
`;

const LightHoverImage = styled(LightImage)`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
  cursor: pointer;
`;

const LightTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: auto;

  ${({ theme }) => theme.media.tablet} {
    gap: 12px;
  }

  ${({ theme }) => theme.media.mobile} {
    position: absolute;
    bottom: 8px;
    right: 8px;
    gap: 12px;
    width: 200px;
    flex-direction: column;
  }
`;

const LightVerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  ${({ theme }) => theme.media.mobile} {
    gap: 0;
  }
`;

const LightVerticalText = styled.p`
  writing-mode: vertical-lr;
  font-size: ${Theme.fontsize.desktop.main.title};
  font-weight: 400;
  color: ${Theme.colors.white};
  transform: rotate(180deg);

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.main.title};
  }

  ${({ theme }) => theme.media.mobile} {
    writing-mode: horizontal-tb;
    transform: none;
    width: 200px;
    font-size: ${Theme.fontsize.mobile.main.title};
  }
`;

const LightVerticalLine = styled.div`
  width: 3px;
  height: 180px;
  background-color: ${Theme.colors.white};

  ${({ theme }) => theme.media.tablet} {
    width: 2px;
    height: 100px;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 0;
    height: 0;
    background-color: none;
  }
`;

const LightDescContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin-top: auto;

  ${({ theme }) => theme.media.tablet} {
    gap: 30px;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 200px;
    gap: 12px;
    padding-bottom: 16px;
  }
`;

const LightDescBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const LightDesc = styled.p`
  font-size: ${Theme.fontsize.desktop.main.section};
  line-height: 1.4;
  font-weight: 400;
  color: ${Theme.colors.white};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.main.section};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.main.section};
  }
`;

//의자 이미지 영역
const ChairImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;

  ${({ theme }) => theme.media.tablet} {
    gap: 10px;
  }

  ${({ theme }) => theme.media.mobile} {
    position: relative;
    gap: 5px;
  }
`;

const LeftChairContainer = styled.div`
  display: flex;
  flex: 672;
  gap: 20px;
  ${({ theme }) => theme.media.tablet} {
    flex: 337;
    gap: 10px;
  }

  ${({ theme }) => theme.media.mobile} {
    flex: 159;
    padding-bottom: 80px;
    gap: 2px;
  }
`;

const LeftChairImageBox = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.media.tablet} {
    gap: 42px;
  }

  ${({ theme }) => theme.media.mobile} {
    justify-content: flex-start;
    gap: 0;
    padding-top: 16px;
  }
`;

const LeftImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 672 / 661;

  :hover .left-chair-hover-img {
    opacity: 1;
  }

  ${({ theme }) => theme.media.tablet} {
    aspect-ratio: 337 / 376;
  }

  ${({ theme }) => theme.media.mobile} {
    min-width: 139px;
    min-height: 196px;
    aspect-ratio: 159 / 216;
  }
`;

const LeftChair = styled.img`
  width: 100%;
  aspect-ratio: 672 / 661;

  ${({ theme }) => theme.media.tablet} {
    aspect-ratio: 337 / 376;
  }

  ${({ theme }) => theme.media.mobile} {
    min-width: 139px;
    min-height: 196px;
    aspect-ratio: 159 / 216;
  }
`;

const LeftChairHover = styled(LeftChair)`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
`;

const ChairCommentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 52px;
  padding-left: 16px;
  transform: translateY(-40px);
  z-index: 10;

  @media (max-width: 1294px) and (min-width: 1025px) {
    transform: translateY(-30px);
  }

  ${({ theme }) => theme.media.tablet} {
    gap: 42px;
    padding-left: 12px;
    transform: translateY(0);
  }

  ${({ theme }) => theme.media.mobile} {
    gap: 0;
    padding-left: 0;
    transform: translateY(0);
  }
`;

const TopChairDescBox = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.media.mobile} {
    position: absolute;
    width: 210px;
    top: 55px;
  }
`;

const TopChairDesc = styled.p`
  font-size: ${Theme.fontsize.desktop.main.section};
  line-height: 1.4;
  font-weight: 400;

  @media (max-width: 1294px) and (min-width: 1025px) {
    font-size: ${Theme.fontsize.desktop.content};
  }

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.main.section};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

const BottomChairDescBox = styled(TopChairDescBox)`
  margin-left: auto;

  ${({ theme }) => theme.media.mobile} {
    position: absolute;
    width: 200px;
    height: 100px;
    top: 110px;
    left: 78px;
  }
`;

const BottomChairDesc = styled(TopChairDesc)``;

//의자 수직 텍스트
const ChairVerticalTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  transform: rotate(180deg);

  ${({ theme }) => theme.media.tablet} {
    gap: 0px;
  }

  ${({ theme }) => theme.media.mobile} {
    gap: 0px;
  }
`;

const ChairVerticalText = styled.p`
  writing-mode: vertical-lr;
  font-size: ${Theme.fontsize.desktop.main.title};
  line-height: ${Theme.fontsize.desktop.main.title};
  font-weight: 400;
  color: ${Theme.colors.blacktext};
  transform: rotate(180deg);

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.main.title};
    line-height: ${Theme.fontsize.tablet.main.title};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.section};
    line-height: ${Theme.fontsize.mobile.section};
  }
`;

const ChairVerticalLine = styled.div`
  width: 3px;
  height: 180px;
  background-color: ${Theme.colors.blacktext};

  ${({ theme }) => theme.media.tablet} {
    width: 2px;
    height: 96px;
    transform: translate(8.3px, -7.5px);
  }

  ${({ theme }) => theme.media.mobile} {
    width: 2px;
    height: 56px;
    transform: translate(7px, -6px);
  }
`;

const RightImageContainer = styled.div`
  position: relative;
  flex: 770;
  width: 100%;
  aspect-ratio: 770 / 1156;

  :hover .right-chair-hover-img {
    opacity: 1;
  }

  ${({ theme }) => theme.media.tablet} {
    flex: 386;
    min-width: 386px;
    aspect-ratio: 386 / 658;
  }

  ${({ theme }) => theme.media.mobile} {
    flex: 182;
    min-width: 162px;
    min-height: 358px;
    aspect-ratio: 182 / 378;
  }
`;

const RightChair = styled.img`
  width: 100%;
  aspect-ratio: 770 / 1156;

  ${({ theme }) => theme.media.tablet} {
    aspect-ratio: 386 / 658;
  }

  ${({ theme }) => theme.media.mobile} {
    min-width: 162px;
    min-height: 358px;
    aspect-ratio: 182 / 378;
  }
`;

const RightChairHover = styled(RightChair)`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
`;

//하단 이미지 영역
const BottomImageBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 128px;
  width: 100%;
  aspect-ratio: 1920 / 2588;
  padding: 50px 50px 216px;
  background-color: #898861;

  ${({ theme }) => theme.media.tablet} {
    gap: 72px;
    height: 1394px;
    padding: 26px;
  }

  ${({ theme }) => theme.media.mobile} {
    gap: 20px;
    height: 637px;
    padding: 13px;
  }
`;

const BottomChairBox = styled.div`
  position: relative;
  width: 100%;
  max-width: 1210px;
  aspect-ratio: 1210 / 957;
  margin-left: auto;
  cursor: pointer;

  &:hover .hover-img {
    opacity: 1;
  }

  ${({ theme }) => theme.media.tablet} {
    max-width: 459px;
    height: 529px;
  }

  ${({ theme }) => theme.media.mobile} {
    max-width: 198px;
    height: 245px;
  }
`;

const ChairTextBox = styled.div`
  position: absolute;
  bottom: 136px;
  left: -220px;
  pointer-events: none;

  @media (max-width: 1720px) and (min-width: 1025px) {
    left: -24px;
  }

  ${({ theme }) => theme.media.tablet} {
    bottom: 36px;
    left: -180px;
  }

  ${({ theme }) => theme.media.mobile} {
    bottom: 24px;
    left: -72px;
  }
`;

const ChairTitle = styled.h3`
  font-size: ${Theme.fontsize.desktop.main.title};
  font-weight: 400;
  color: ${Theme.colors.whitetext};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.main.title};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.main.title};
  }
`;

const ChairDesc = styled.p`
  font-size: ${Theme.fontsize.desktop.main.section};
  font-weight: 400;
  color: ${Theme.colors.whitetext};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.main.section};
    margin-left: 24px;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.main.section};
  }
`;

const BottomDeskBox = styled.div`
  position: relative;
  width: 100%;
  max-width: 1329px;
  aspect-ratio: 1329 / 1265;
  cursor: pointer;

  &:hover .hover-img {
    opacity: 1;
  }

  ${({ theme }) => theme.media.tablet} {
    max-width: 536px;
    height: 668px;
  }

  ${({ theme }) => theme.media.mobile} {
    max-width: 246px;
    height: 298px;
  }
`;

const DesktextBox = styled.div`
  position: absolute;
  bottom: -165px;
  right: -100px;
  display: flex;
  flex-direction: column;
  gap: 52px;
  max-width: 956px;
  aspect-ratio: 956 / 445;
  padding: 30px 60px;
  background-color: #0c0c0c4d;
  z-index: 2; // 이미지 뒤에 가져려서 z-index로 레이어 순서 조정
  pointer-events: none;

  @media (max-width: 1720px) and (min-width: 1025px) {
    gap: 42px;
    padding: 24px 40px;
    right: -20px;
  }

  ${({ theme }) => theme.media.tablet} {
    bottom: -84px;
    right: -130px;
    gap: 32px;
    width: 571px;
    aspect-ratio: 571 / 264;
    padding: 16px 20px;
  }

  ${({ theme }) => theme.media.mobile} {
    bottom: -50px;
    right: -25px;
    gap: 14px;
    width: 260px;
    aspect-ratio: 260 / 165;
    padding: 8px;
  }
`;

const DeskTitle = styled.h3`
  color: ${Theme.colors.whitetext};
  font-size: ${Theme.fontsize.desktop.main.title};
  line-height: ${Theme.fontsize.desktop.main.title};
  font-weight: 400;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.main.title};
    line-height: ${Theme.fontsize.tablet.main.title};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.main.title};
    line-height: ${Theme.fontsize.mobile.main.title};
  }
`;

const DeskMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 52px;

  @media (max-width: 1720px) and (min-width: 1025px) {
    gap: 38px;
  }

  ${({ theme }) => theme.media.tablet} {
    gap: 21px;
  }

  ${({ theme }) => theme.media.mobile} {
    gap: 14px;
  }
`;

const FirstDeskMessageBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 300px;

  @media (max-width: 1720px) and (min-width: 1025px) {
    margin-left: 170px;
  }

  ${({ theme }) => theme.media.tablet} {
    margin-left: 152px;
  }

  ${({ theme }) => theme.media.mobile} {
    margin-left: 40px;
  }
`;

const FirstDeskMessage = styled.p`
  color: ${Theme.colors.whitetext};
  font-size: ${Theme.fontsize.desktop.main.section};
  line-height: 1.4;
  font-weight: 400;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.main.section};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.main.section};
  }
`;

const SecondDeskMessageBox = styled(FirstDeskMessageBox)`
  margin-left: 400px;

  @media (max-width: 1720px) and (min-width: 1025px) {
    margin-left: 240px;
  }

  ${({ theme }) => theme.media.tablet} {
    margin-left: 232px;
  }

  ${({ theme }) => theme.media.mobile} {
    margin-left: auto;
  }
`;

const SecondDeskMessage = styled(FirstDeskMessage)``;

const ChairImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ChairHoverImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
`;

const DeskImage = styled.img`
  width: 100%;
  height: 100%;
`;

const DeskHoverImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
`;

const BottomTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 265px;

  ${({ theme }) => theme.media.tablet} {
    height: 140px;
  }

  ${({ theme }) => theme.media.mobile} {
    height: 65px;
  }
`;

const BottomText = styled.p`
  font-size: ${Theme.fontsize.desktop.main.animationTitle};
  font-weight: 500;
  letter-spacing: 0.15rem;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.main.animationTitle};
    letter-spacing: 0.1rem;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.main.animationTitle};
    letter-spacing: 0.05rem;
  }
`;

export default function MainPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  // 인스타그램 qr
  const [isInstaOpen, setIsInstaOpen] = useState(false);
  // 이벤트 모달
  const [isEventOpen, setIsEventOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInstaOpen(true);
      setIsEventOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchMain();
        // 데이터가 배열인지 확인 후 저장하기
        if (result && Array.isArray(result.data.banners)) {
          setList(result.data.banners);
        }
      } catch (error) {
        console.error("데이터 로드 실패.", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  //받아온 배너 데이터 목록
  const firstBanner = list[0]; //소파
  const secondBanner = list[1]; //전등
  const thirdBanner = list[2]; //중단 왼쪽 의자
  const fourthBanner = list[3]; //중단 오른쪽 의자
  const fifthBanner = list[4]; //하단 의자
  const sixthBanner = list[5]; //하단 책상

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "32px",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <MainSection>
      <TopArea />
      <Contents>
        <ScrollReveal>
          {firstBanner && (
            <SofaImageBox>
              <SofaImage src={firstBanner.src[0]} alt={firstBanner.name || "Sofa Image"} />
              <Link to={`/products/${firstBanner.category}/${firstBanner.productId}`}>
                <SofaHoverImage
                  src={firstBanner.src[1]}
                  alt="Sofa Hover Image"
                  className="sofa-hover-img"
                />
              </Link>
              <SofaDescBox>
                <SofaTitle>Classic Leather, Timeless Modern</SofaTitle>
                <SofaDesc>The perfect balance of warmth and structure.</SofaDesc>
              </SofaDescBox>
            </SofaImageBox>
          )}
        </ScrollReveal>
        <NewProductList />
        <ScrollReveal>
          {secondBanner && (
            <LightImageBox>
              <LightImageContainer>
                <LightImage src={secondBanner.src[0]} alt={secondBanner.name || "Light Image"} />
                <Link to={`/products/${secondBanner.category}/${secondBanner.productId}`}>
                  <LightHoverImage
                    src={secondBanner.src[1]}
                    alt={secondBanner.name || "Light Hover Image"}
                    className="light-hover-img"
                  />
                </Link>
              </LightImageContainer>
              <LightTextContainer>
                <LightVerticalContainer>
                  <LightVerticalText>For Deep Sleep and Dream</LightVerticalText>
                  <LightVerticalLine></LightVerticalLine>
                </LightVerticalContainer>
                <LightDescContainer>
                  <LightDescBox>
                    <LightDesc>"The Light of Night,</LightDesc>
                    <LightDesc>Your Gentle Companion."</LightDesc>
                  </LightDescBox>
                  <LightDescBox>
                    <LightDesc>Leave the day’s exhaustion behind</LightDesc>
                    <LightDesc>and return to the warmth of</LightDesc>
                    <LightDesc>your own private sanctuary.</LightDesc>
                  </LightDescBox>
                  <LightDescBox>
                    <LightDesc>Where the soft touch of linen meets</LightDesc>
                    <LightDesc>a subtle glow, we curate the moments</LightDesc>
                    <LightDesc>where your night becomes brighter.</LightDesc>
                  </LightDescBox>
                </LightDescContainer>
              </LightTextContainer>
            </LightImageBox>
          )}
        </ScrollReveal>
        <ScrollReveal>
          <ChairImageContainer>
            <LeftChairContainer>
              <LeftChairImageBox>
                {thirdBanner && (
                  <LeftImageContainer>
                    <LeftChair
                      src={thirdBanner.src[0]}
                      alt={thirdBanner.name || "Left Chair Image"}
                    />
                    <Link to={`/products/${thirdBanner.category}/${thirdBanner.productId}`}>
                      <LeftChairHover
                        src={thirdBanner.src[1]}
                        alt={thirdBanner.name || "Left Chair Hover Image"}
                        className="left-chair-hover-img"
                      />
                    </Link>
                  </LeftImageContainer>
                )}
                <ChairCommentContainer>
                  <TopChairDescBox>
                    <TopChairDesc>Every fiber is crafted to hold</TopChairDesc>
                    <TopChairDesc>the warmth of your home. Beyond</TopChairDesc>
                    <TopChairDesc>the visual elegance, we focus on</TopChairDesc>
                  </TopChairDescBox>
                  <BottomChairDescBox>
                    <BottomChairDesc>the tactile experience that touches</BottomChairDesc>
                    <BottomChairDesc>your soul in a sanctuary of peace.</BottomChairDesc>
                  </BottomChairDescBox>
                </ChairCommentContainer>
              </LeftChairImageBox>
              <ChairVerticalTextBox>
                <ChairVerticalText>The Texture of Softness</ChairVerticalText>
                <ChairVerticalLine></ChairVerticalLine>
              </ChairVerticalTextBox>
            </LeftChairContainer>
            {fourthBanner && (
              <RightImageContainer>
                <RightChair
                  src={fourthBanner.src[0]}
                  alt={fourthBanner.name || "Right Chair Image"}
                />
                <Link to={`/products/${fourthBanner.category}/${fourthBanner.productId}`}>
                  <RightChairHover
                    src={fourthBanner.src[1]}
                    alt={fourthBanner.name || "Right Chair Hover Image"}
                    className="right-chair-hover-img"
                  />
                </Link>
              </RightImageContainer>
            )}
          </ChairImageContainer>
        </ScrollReveal>
        <ScrollReveal>
          <BottomImageBox>
            {fifthBanner && (
              <BottomChairBox>
                <ChairImage src={fifthBanner.src[0]} alt={fifthBanner.name || "Desk Image"} />
                <Link to={`/products/${fifthBanner.category}/${fifthBanner.productId}`}>
                  <ChairHoverImage
                    src={fifthBanner.src[1]}
                    alt="Hover Desk Image"
                    className="hover-img"
                  />
                </Link>
                <ChairTextBox>
                  <ChairTitle>TIMELESS TRACE</ChairTitle>
                  <ChairDesc>Preserving simple beauty in modern space.</ChairDesc>
                </ChairTextBox>
              </BottomChairBox>
            )}
            {sixthBanner && (
              <BottomDeskBox>
                <DeskImage src={sixthBanner.src[0]} alt={sixthBanner.name || "Bed Image"} />
                <Link to={`/products/${sixthBanner.category}/${sixthBanner.productId}`}>
                  <DeskHoverImage
                    src={sixthBanner.src[1]}
                    alt="Hover Bed Image"
                    className="hover-img"
                  />
                </Link>
                <DesktextBox>
                  <DeskTitle>The Whisper of Morning Light</DeskTitle>
                  <DeskMessageContainer>
                    <FirstDeskMessageBox>
                      <FirstDeskMessage>The softest embrace of sun and</FirstDeskMessage>
                      <FirstDeskMessage>linen, creating a peaceful moment</FirstDeskMessage>
                      <FirstDeskMessage>for your deepest rest.</FirstDeskMessage>
                    </FirstDeskMessageBox>
                    <SecondDeskMessageBox>
                      <SecondDeskMessage>Where the day begins with a</SecondDeskMessage>
                      <SecondDeskMessage>gentle glow, we curate spaces</SecondDeskMessage>
                      <SecondDeskMessage>for your own sanctuary.</SecondDeskMessage>
                    </SecondDeskMessageBox>
                  </DeskMessageContainer>
                </DesktextBox>
              </BottomDeskBox>
            )}
          </BottomImageBox>
        </ScrollReveal>
      </Contents>
      <ScrollReveal>
        <BottomTextContainer>
          <BottomText>STUDIO</BottomText>
        </BottomTextContainer>
      </ScrollReveal>

      <MainIntroModalCarousel isOpen={isEventOpen} onClose={() => setIsEventOpen(false)} />
      <InstagramModal isOpen={isInstaOpen} onClose={() => setIsInstaOpen(false)} />
    </MainSection>
  );
}
