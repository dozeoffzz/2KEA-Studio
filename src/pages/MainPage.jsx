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
  padding: 265px 130px 0;

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
  height: 1111px;
  margin: 0 80px 0 auto;

  ${({ theme }) => theme.media.tablet} {
    max-width: 696px;
    height: 785px;
    margin: 0 15px 0 auto;
  }

  ${({ theme }) => theme.media.mobile} {
    max-width: 337px;
    height: 380px;
    margin: 0 0 0 auto;
  }

  &:hover .sofa-hover-img {
    opacity: 1;
  }
`;

const SofaImage = styled.img`
  width: 100%;
  max-width: 1592px;
  height: 100%;

  ${({ theme }) => theme.media.tablet} {
    max-width: 696px;
    height: 785px;
  }

  ${({ theme }) => theme.media.mobile} {
    max-width: 337px;
    height: 380px;
  }
`;

const SofaHoverImage = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 1592px;
  height: 1111px;
  margin-left: auto;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
  cursor: pointer;

  ${({ theme }) => theme.media.tablet} {
    max-width: 696px;
    height: 785px;
  }

  ${({ theme }) => theme.media.mobile} {
    max-width: 337px;
    height: 380px;
  }
`;

const SofaDescBox = styled.div`
  position: absolute;
  bottom: -40px;
  left: -100px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 3;

  ${({ theme }) => theme.media.tablet} {
    bottom: 6px;
    left: -60px;
  }
  ${({ theme }) => theme.media.mobile} {
    bottom: 0px;
    left: -16px;
  }
`;

const SofaTitle = styled.h3`
  font-size: ${Theme.fontsize.desktop.title};
  line-height: ${Theme.fontsize.desktop.title};
  font-weight: 400;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.title};
    line-height: ${Theme.fontsize.tablet.title};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.section};
    line-height: ${Theme.fontsize.mobile.section};
  }
`;

const SofaDesc = styled.span`
  font-size: ${Theme.fontsize.desktop.section};
  line-height: ${Theme.fontsize.desktop.section};
  font-weight: 400;
  margin-left: 96px;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.section};
    line-height: ${Theme.fontsize.tablet.section};
    margin-left: 40px;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.content};
    line-height: ${Theme.fontsize.mobile.content};
    margin-left: 28px;
  }
`;

//전등 이미지 영역
const LightImageBox = styled.div`
  position: relative;
  display: flex;
  gap: 32px;
  width: 100%;
  height: 985px;
  padding: 32px;
  background-color: ${Theme.colors.redaccent};

  ${({ theme }) => theme.media.tablet} {
    height: 594px;
    gap: 16px;
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
  height: 863px;

  :hover .light-hover-img {
    opacity: 1;
  }

  ${({ theme }) => theme.media.tablet} {
    max-width: 350px;
    height: 522px;
  }

  ${({ theme }) => theme.media.mobile} {
    max-width: 241px;
    height: 315px;
  }
`;

const LightImage = styled.img`
  width: 100%;
  max-width: 838px;
  height: 863px;

  ${({ theme }) => theme.media.tablet} {
    max-width: 350px;
    height: 522px;
  }

  ${({ theme }) => theme.media.mobile} {
    max-width: 241px;
    height: 315px;
  }
`;

const LightHoverImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 838px;
  height: 863px;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
  cursor: pointer;

  ${({ theme }) => theme.media.tablet} {
    max-width: 350px;
    height: 522px;
  }

  ${({ theme }) => theme.media.mobile} {
    max-width: 241px;
    height: 315px;
  }
`;

//수직 텍스트
const LightTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  margin-top: auto;

  ${({ theme }) => theme.media.tablet} {
    gap: 16px;
  }

  ${({ theme }) => theme.media.mobile} {
    position: absolute;
    bottom: 8px;
    right: 8px;
    gap: 10px;
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
  font-size: ${Theme.fontsize.desktop.title};
  font-weight: 400;
  color: ${Theme.colors.white};
  transform: rotate(180deg);

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.title};
  }

  ${({ theme }) => theme.media.mobile} {
    writing-mode: horizontal-tb;
    transform: none;
    font-size: ${Theme.fontsize.mobile.section};
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
    gap: 10px;
  }
`;

const LightDescBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const LightDesc = styled.p`
  font-size: ${Theme.fontsize.desktop.section};
  line-height: 1.4;
  font-weight: 400;
  color: ${Theme.colors.white};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

//의자 이미지 영역
const ChairImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 140px;
  width: 100%;
  height: 1156px;
  padding: 0 38px;

  ${({ theme }) => theme.media.tablet} {
    justify-content: space-between;
    gap: 20px;
    height: 658px;
    padding: 0 15px;
  }

  ${({ theme }) => theme.media.mobile} {
    position: relative;
    gap: 5px;
    height: 378px;
    padding: 0 18px;
  }
`;

const LeftChairContainer = styled.div`
  display: flex;
  gap: 110px;
  ${({ theme }) => theme.media.tablet} {
    gap: 0;
  }

  ${({ theme }) => theme.media.mobile} {
    height: 100%;
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
  width: 100%;
  max-width: 672px;
  height: 661px;

  :hover .left-chair-hover-img {
    opacity: 1;
  }

  ${({ theme }) => theme.media.tablet} {
    max-width: 337px;
    height: 376px;
  }

  ${({ theme }) => theme.media.mobile} {
    max-width: 159px;
    height: 216px;
  }
`;

const LeftChair = styled.img`
  width: 100%;
  max-width: 672px;
  height: 661px;

  ${({ theme }) => theme.media.tablet} {
    max-width: 337px;
    height: 376px;
  }

  ${({ theme }) => theme.media.mobile} {
    max-width: 159px;
    height: 216px;
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
  transform: translateY(-45px);
  z-index: 10;

  ${({ theme }) => theme.media.tablet} {
    gap: 42px;
    padding-left: 12px;
    transform: translateY(0);
  }

  ${({ theme }) => theme.media.mobile} {
    gap: 14px;
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
    top: 45px;
  }
`;

const TopChairDesc = styled.p`
  font-size: clamp(12px, 2vw, ${Theme.fontsize.desktop.section});
  line-height: 1.4;
  font-weight: 400;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
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
    top: 104px;
    right: 0;
    transform: translateX(70%);
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
  font-size: ${Theme.fontsize.desktop.title};
  line-height: ${Theme.fontsize.desktop.title};
  font-weight: 400;
  color: ${Theme.colors.blacktext};
  transform: rotate(180deg);

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.title};
    line-height: ${Theme.fontsize.tablet.title};
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
    transform: translate(11px, -9px);
  }

  ${({ theme }) => theme.media.mobile} {
    width: 2px;
    height: 56px;
    transform: translate(6px, -5px);
  }
`;

const RightImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 770px;
  height: 1156px;

  :hover .right-chair-hover-img {
    opacity: 1;
  }

  ${({ theme }) => theme.media.tablet} {
    max-width: 386px;
    height: 658px;
  }

  ${({ theme }) => theme.media.mobile} {
    max-width: 182px;
    height: 378px;
  }
`;

const RightChair = styled.img`
  width: 100%;
  max-width: 770px;
  height: 1156px;

  ${({ theme }) => theme.media.tablet} {
    max-width: 386px;
    height: 658px;
  }

  ${({ theme }) => theme.media.mobile} {
    max-width: 182px;
    height: 378px;
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
  height: 2588px;
  padding: 50px;
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
  height: 957px;
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
  top: calc(100% - 216px);
  left: -330px;
  pointer-events: none;

  ${({ theme }) => theme.media.tablet} {
    top: calc(100% - 108px);
    left: -180px;
  }

  ${({ theme }) => theme.media.mobile} {
    top: calc(100% - 72px);
    left: -120px;
  }
`;

const ChairTitle = styled.h3`
  font-size: ${Theme.fontsize.desktop.title};
  font-weight: 400;
  color: ${Theme.colors.whitetext};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.title};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.section};
  }
`;

const ChairDesc = styled.p`
  font-size: ${Theme.fontsize.desktop.section};
  font-weight: 400;
  color: ${Theme.colors.whitetext};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
    margin-left: 24px;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

const BottomDeskBox = styled.div`
  position: relative;
  width: 100%;
  max-width: 1329px;
  height: 1265px;
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
  left: 200px;
  display: flex;
  flex-direction: column;
  gap: 44px;
  width: 100%;
  min-width: 1256px;
  height: 445px;
  padding: 30px 60px;
  background-color: #0c0c0c4d;
  z-index: 2; // 이미지 뒤에 가져려서 z-index로 레이어 순서 조정
  pointer-events: none;

  ${({ theme }) => theme.media.tablet} {
    bottom: -84px;
    left: 100px;
    gap: 32px;
    min-width: 571px;
    height: 264px;
    padding: 16px 20px;
  }

  ${({ theme }) => theme.media.mobile} {
    bottom: -50px;
    left: 0;
    gap: 12px;
    min-width: 300px;
    height: 160px;
    padding: 6px;
  }
`;

const DeskTitle = styled.h3`
  color: ${Theme.colors.whitetext};
  font-size: ${Theme.fontsize.desktop.title};
  line-height: ${Theme.fontsize.desktop.title};
  font-weight: 400;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.title};
    line-height: ${Theme.fontsize.tablet.title};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.section};
    line-height: ${Theme.fontsize.mobile.section};
  }
`;

const DeskMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;

  ${({ theme }) => theme.media.tablet} {
    gap: 21px;
  }

  ${({ theme }) => theme.media.mobile} {
    gap: 14px;
  }
`;

const FirstDeskMessage = styled.p`
  color: ${Theme.colors.whitetext};
  font-size: ${Theme.fontsize.desktop.section};
  line-height: 1.4;
  font-weight: 400;
  margin-left: 450px;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
    margin-left: 152px;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
    margin-left: 90px;
  }
`;

const SecondDeskMessage = styled(FirstDeskMessage)`
  margin-left: 600px;

  ${({ theme }) => theme.media.tablet} {
    margin-left: 232px;
  }

  ${({ theme }) => theme.media.mobile} {
    margin-left: auto;
  }
`;

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
  font-size: 100px;
  font-weight: 400;

  ${({ theme }) => theme.media.tablet} {
    font-size: 70px;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: 28px;
  }
`;

export default function MainPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
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

  //이미지를 미리 로딩 및 디코딩하여 최초 호버시 딜레이 방지
  useEffect(() => {
    list.forEach((banner) => {
      if (banner.src[1]) {
        const img = new Image();
        img.src = banner.src[1];

        //decode 는 Promise를 반환하므로 catch 메서드로 불필요한 에러 방지
        img.decode().catch((err) => {
          console.warn(`${banner.name}`, err);
        });
      }
    });
  }, [list]);

  //받아온 배너 데이터 목록
  const firstBanner = list[0]; //소파
  const secondBanner = list[1]; //전등
  const thirdBanner = list[2]; //중단 왼쪽 의자
  const fourthBanner = list[3]; //중단 오른쪽 의자
  const fifthBanner = list[4]; //하단 의자
  const sixthBanner = list[5]; //하단 책상

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
                  <DeskMessage>
                    <FirstDeskMessage>
                      The softest embrace of sun and
                      <br />
                      linen, creating a peaceful moment
                      <br />
                      for your deepest rest.
                    </FirstDeskMessage>
                    <SecondDeskMessage>
                      Where the day begins with a
                      <br />
                      gentle glow, we curate spaces
                      <br />
                      for your own sanctuary.
                    </SecondDeskMessage>
                  </DeskMessage>
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
