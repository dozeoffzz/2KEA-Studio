import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Theme } from "../styles/theme";
import { Link } from "react-router-dom";
import TopArea from "../components/main/TopArea";
import ScrollReveal from "../components/common/ScrollReveal";
import NewProductList from "../components/main/NewProductList";
import MainIntroModalCarousel from "../components/modals/MainIntroModal";
import InstagramModal from "../components/modals/InstagramModal";
import { fetchMain } from "../apis/mainApi";

const MainSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 160px;
  width: 100%;
  padding: 160px 90px 0;
  transition: all 0.3s ease;

  ${({ theme }) => theme.media.tablet} {
    padding: 120px 70px 0;
    gap: 120px;
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 60px 50px 0;
    gap: 60px;
  }

  @media (max-width: 600px) {
    padding: 40px 20px 0;
  }
`;

const SofaImageBox = styled.div`
  position: relative;
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
  transition: all 0.3s ease;

  &:hover .sofa-hover-img {
    opacity: 1;
  }

  @media (max-width: 1300px) {
    width: 100%;
  }
`;

/* 호버때 이미자가 텍스트 덮어서 막으려고 이미지만 감싸는 wrapper추가한거 */
const SofaImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  transition: all 0.3s ease;
`;

/* 초록 박스 이미지 wrapper */
const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 12;
  overflow: hidden;

  ${({ theme }) => theme.media.mobile} {
    aspect-ratio: 16 / 14;
  }
`;

const SofaImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;
const SofaHoverImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
  cursor: pointer;
  display: block;
`;

const SofaDescBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;

  ${({ theme }) => theme.media.tablet} {
    margin-top: 14px;
    gap: 6px;
  }

  ${({ theme }) => theme.media.mobile} {
    margin-top: 10px;
    gap: 4px;
  }
`;

/* 공통제목 */
const BigTitle = styled.p`
  font-size: ${Theme.fontsize.desktop.section};
  font-weight: 400;
  line-height: 1.2;

  @media (max-width: 1200px) {
    font-size: ${Theme.fontsize.desktop.sectionM};
  }

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.section};
  }

  @media (max-width: 850px) {
    font-size: ${Theme.fontsize.tablet.sectionM};
  }

  @media (max-width: 560px) {
    font-size: ${Theme.fontsize.mobile.section};
  }

  @media (max-width: 460px) {
    font-size: 18px;
  }

  @media (max-width: 400px) {
    font-size: 16px;
  }

  @media (max-width: 340px) {
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

/* 내용 텍스트 */
const SmallDesc = styled.p`
  font-size: ${Theme.fontsize.desktop.content};
  font-weight: 400;
  line-height: 1.6;
  word-break: keep-all;

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.tablet.contentM};
  }

  @media (max-width: 560px) {
    font-size: ${Theme.fontsize.mobile.contentM};
  }

  @media (max-width: 400px) {
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

const SofaDesc = styled(SmallDesc)`
  margin-left: 96px;

  ${({ theme }) => theme.media.tablet} {
    margin-left: 40px;
  }

  @media (max-width: 850px) {
    font-size: 16px;
  }

  @media (max-width: 460px) {
    font-size: 14px;
    margin-left: 30px;
  }
`;

/* 전등 */
const LightImageBox = styled.div`
  position: relative;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  background-color: ${Theme.colors.redaccent};

  ${({ theme }) => theme.media.tablet} {
    width: 96%;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;

const LightImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 8 / 8;
  overflow: hidden;
  transition: all 0.3s ease;

  :hover .light-hover-img {
    opacity: 1;
  }

  @media (max-width: 1350px) {
    aspect-ratio: 16 / 14;
  }

  @media (max-width: 1170px) {
    aspect-ratio: 16 / 17;
  }

  @media (max-width: 686px) {
    aspect-ratio: 12 / 14;
    min-height: 420px;
  }

  @media (max-width: 500px) {
    aspect-ratio: 12 / 16;
  }
`;

const LightImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;

  display: block;
  object-fit: cover;

  @media (max-width: 686px) {
    min-height: 420px;
  }

  @media (max-width: 480px) {
    min-height: 360px;
  }

  @media (max-width: 360px) {
    min-height: 320px;
  }
`;

const LightHoverImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 15%;
  transform: scaleX(-1);
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
  cursor: pointer;
`;

/* 이미지 위에 텍스트 올리려고 */
const LightTextContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px 40px 32px;
  background: ${({ theme }) => `linear-gradient(to top, ${theme.colors.redaccent} 60%, transparent)`};
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${({ theme }) => theme.media.tablet} {
    padding: 30px 30px 24px;
  }

  @media (max-width: 686px) {
    padding: 20px 16px 20px;
    gap: 6px;
  }

  @media (max-width: 400px) {
    padding: 14px 12px 16px;
    gap: 4px;
  }
`;

/* 조명 위에 텍스트도 동일하게 */
const LightVerticalText = styled.p`
  font-size: ${Theme.fontsize.desktop.section};
  font-weight: 400;
  color: ${Theme.colors.white};
  margin-bottom: 12px;

  @media (max-width: 1200px) {
    font-size: ${Theme.fontsize.desktop.sectionM};
  }

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.section};
    margin-bottom: 8px;
  }

  @media (max-width: 780px) {
    font-size: ${Theme.fontsize.tablet.sectionM};
  }

  @media (max-width: 560px) {
    font-size: ${Theme.fontsize.mobile.section};
  }

  @media (max-width: 400px) {
    font-size: ${Theme.fontsize.mobile.small};
    margin-bottom: 6px;
  }

  @media (max-width: 340px) {
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

const LightDescContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 686px) {
    gap: 6px;
  }

  @media (max-width: 400px) {
    gap: 4px;
  }
`;

/* 조명 내용 텍스트도 동일하게*/
const LightDesc = styled.p`
  font-size: ${Theme.fontsize.desktop.content};
  line-height: 1.6;
  font-weight: 400;
  color: ${Theme.colors.white};
  word-break: keep-all;

  @media (max-width: 1200px) {
    font-size: ${Theme.fontsize.desktop.contentM};
  }

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.tablet.contentM};
  }

  @media (max-width: 560px) {
    font-size: 13px;
  }

  @media (max-width: 460px) {
    font-size: 11px;
  }
`;

/* 의자 */
const ChairImageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  width: 94%;
  max-width: 1450px;
  margin: 0 auto;

  ${({ theme }) => theme.media.tablet} {
    width: 96%;
    gap: 10px;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    gap: 6px;
  }
`;

const LeftChairContainer = styled.div`
  display: flex;
  flex: 1;
  gap: 20px;
  align-items: flex-start;

  ${({ theme }) => theme.media.tablet} {
    gap: 10px;
  }

  ${({ theme }) => theme.media.mobile} {
    gap: 4px;
  }
`;

const LeftChairImageBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;

  ${({ theme }) => theme.media.tablet} {
    gap: 12px;
  }

  @media (max-width: 518px) {
    gap: 6px;
  }
`;

const LeftImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  transition: all 0.3s ease;

  :hover .left-chair-hover-img {
    opacity: 1;
  }

  @media (max-width: 1300px) {
    aspect-ratio: 6 / 7;
  }
`;

const LeftChair = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const LeftChairHover = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
`;

const ChairCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 8px;

  ${({ theme }) => theme.media.tablet} {
    gap: 10px;
  }

  @media (max-width: 518px) {
    gap: 4px;
    padding-left: 0;
  }
`;

const TopChairDescBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TopChairDesc = styled(SmallDesc)`
  @media (max-width: 676px) {
    font-size: 13px;
  }

  @media (max-width: 518px) {
    font-size: ${Theme.fontsize.mobile.mini};
    line-height: 1.4;
  }
`;

const BottomChairDescBox = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const BottomChairDesc = styled(SmallDesc)`
  @media (max-width: 676px) {
    font-size: 13px;
  }

  @media (max-width: 518px) {
    font-size: ${Theme.fontsize.mobile.mini};
    line-height: 1.4;
  }
`;

const ChairVerticalTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  transform: rotate(180deg);
  padding-bottom: 8px;

  ${({ theme }) => theme.media.tablet} {
    gap: 8px;
  }

  ${({ theme }) => theme.media.mobile} {
    gap: 4px;
  }
`;

/* 새로도 턱스트도 동일하게  */
const ChairVerticalText = styled.p`
  writing-mode: vertical-lr;
  font-size: ${Theme.fontsize.desktop.section};
  line-height: 1.2;
  font-weight: 400;
  color: ${Theme.colors.blacktext};
  transform: rotate(180deg);
  word-break: keep-all;

  @media (max-width: 1200px) {
    font-size: ${Theme.fontsize.desktop.sectionM};
  }

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.section};
  }

  @media (max-width: 780px) {
    font-size: ${Theme.fontsize.tablet.sectionM};
  }

  @media (max-width: 560px) {
    font-size: ${Theme.fontsize.mobile.section};
  }

  @media (max-width: 400px) {
    font-size: ${Theme.fontsize.mobile.small};
  }

  @media (max-width: 340px) {
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

const ChairVerticalLine = styled.div`
  width: 3px;
  height: 140px;
  background-color: ${Theme.colors.blacktext};

  ${({ theme }) => theme.media.tablet} {
    width: 2px;
    height: 100px;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 1px;
    height: 40px;
  }
`;

const RightImageContainer = styled.div`
  position: relative;
  flex: 1.15;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  transition: all 0.3s ease;

  :hover .right-chair-hover-img {
    opacity: 1;
  }

  @media (max-width: 1300px) {
    aspect-ratio: 5 / 7;
  }
`;

const RightChair = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const RightChairHover = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
`;

/* 바텀 이미지 영역 */
const BottomImageBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 94%;
  max-width: 1450px;
  margin: 0 auto;
  padding: 40px 36px 64px;
  background-color: ${Theme.colors.greenaccent};

  ${({ theme }) => theme.media.tablet} {
    width: 96%;
    gap: 36px;
    padding: 32px 24px 48px;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    gap: 24px;
    padding: 20px 16px 32px;
  }
`;

const BottomChairBox = styled.div`
  position: relative;
  width: 92%;
  max-width: 1280px;
  margin-left: auto;
  cursor: pointer;

  &:hover .hover-img {
    opacity: 1;
  }

  ${({ theme }) => theme.media.tablet} {
    width: 96%;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;

const ChairTextBox = styled.div`
  margin-top: 14px;

  ${({ theme }) => theme.media.tablet} {
    margin-top: 10px;
  }

  ${({ theme }) => theme.media.mobile} {
    margin-top: 8px;
  }
`;

const BottomDeskBox = styled.div`
  position: relative;
  width: 94%;
  max-width: 1320px;
  cursor: pointer;

  &:hover .hover-img {
    opacity: 1;
  }

  ${({ theme }) => theme.media.tablet} {
    width: 96%;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;

const DesktextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 14px;
  padding: 20px 32px;
  background-color: ${Theme.colors.overlay};

  ${({ theme }) => theme.media.tablet} {
    gap: 14px;
    padding: 14px 20px;
    margin-top: 10px;
  }

  ${({ theme }) => theme.media.mobile} {
    gap: 10px;
    padding: 10px 12px;
    margin-top: 8px;
  }
`;

const DeskMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${({ theme }) => theme.media.tablet} {
    gap: 12px;
  }

  ${({ theme }) => theme.media.mobile} {
    gap: 8px;
  }
`;

const FirstDeskMessageBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 160px;

  ${({ theme }) => theme.media.tablet} {
    margin-left: 100px;
  }

  ${({ theme }) => theme.media.mobile} {
    margin-left: 16px;
  }
`;

const SecondDeskMessageBox = styled(FirstDeskMessageBox)`
  margin-left: 240px;

  ${({ theme }) => theme.media.tablet} {
    margin-left: 160px;
  }

  ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`;

const ChairImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  object-position: center 45%;
`;

const ChairHoverImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
`;

const DeskImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  object-position: center 55%;
`;

const DeskHoverImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;

  opacity: 0;
  transition: opacity 0.6s ease-in-out;
`;

/* 바텀 STUDIO 텍스트 */
const BottomTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 100px 0;

  ${({ theme }) => theme.media.tablet} {
    padding: 70px 0;
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 40px 0;
  }
`;

/* STUDIO 2kea랑 동일하게 */
const BottomText = styled.p`
  font-size: 56px;
  font-weight: 500;
  letter-spacing: 0.3rem;

  ${({ theme }) => theme.media.tablet} {
    font-size: 40px;
    letter-spacing: 0.2rem;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: 28px;
    letter-spacing: 0.1rem;
  }
`;

export default function MainPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInstaOpen, setIsInstaOpen] = useState(false);
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

  const firstBanner = list[0];
  const secondBanner = list[1];
  const thirdBanner = list[2];
  const fourthBanner = list[3];
  const fifthBanner = list[4];
  const sixthBanner = list[5];

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
              <SofaImageWrapper>
                <SofaImage src={firstBanner.src[0]} alt={firstBanner.name || "Sofa Image"} />
                <Link to={`/products/${firstBanner.category}/${firstBanner.productId}`}>
                  <SofaHoverImage src={firstBanner.src[1]} alt="Sofa Hover Image" className="sofa-hover-img" />
                </Link>
              </SofaImageWrapper>
              <SofaDescBox>
                <BigTitle>Classic Leather, Timeless Modern</BigTitle>
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
                <LightTextContainer>
                  <LightVerticalText>For Deep Sleep and Dream</LightVerticalText>
                  <LightDescContainer>
                    <LightDesc>"The Light of Night, Your Gentle Companion."</LightDesc>
                    <LightDesc>
                      Leave the day's exhaustion behind and return to the warmth of your own private sanctuary.
                    </LightDesc>
                    <LightDesc>
                      Where the soft touch of linen meets a subtle glow, we curate the moments where your night becomes brighter.
                    </LightDesc>
                  </LightDescContainer>
                </LightTextContainer>
              </LightImageContainer>
            </LightImageBox>
          )}
        </ScrollReveal>

        <ScrollReveal>
          <ChairImageContainer>
            <LeftChairContainer>
              <LeftChairImageBox>
                {thirdBanner && (
                  <LeftImageContainer>
                    <LeftChair src={thirdBanner.src[0]} alt={thirdBanner.name || "Left Chair Image"} />
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
                    <TopChairDesc>
                      Every fiber is crafted to hold the warmth of your home. Beyond the visual elegance, we focus on
                    </TopChairDesc>
                  </TopChairDescBox>
                  <BottomChairDescBox>
                    <BottomChairDesc>the tactile experience that touches your soul in a sanctuary of peace.</BottomChairDesc>
                  </BottomChairDescBox>
                </ChairCommentContainer>
              </LeftChairImageBox>
              <ChairVerticalTextBox>
                <ChairVerticalText>The Texture of Softness</ChairVerticalText>
                <ChairVerticalLine />
              </ChairVerticalTextBox>
            </LeftChairContainer>
            {fourthBanner && (
              <RightImageContainer>
                <RightChair src={fourthBanner.src[0]} alt={fourthBanner.name || "Right Chair Image"} />
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
                <ImgWrapper>
                  <ChairImage src={fifthBanner.src[0]} alt={fifthBanner.name || "Desk Image"} />
                  <Link to={`/products/${fifthBanner.category}/${fifthBanner.productId}`}>
                    <ChairHoverImage src={fifthBanner.src[1]} alt="Hover Desk Image" className="hover-img" />
                  </Link>
                </ImgWrapper>
                <ChairTextBox>
                  <BigTitle style={{ color: Theme.colors.whitetext }}>TIMELESS TRACE</BigTitle>
                  <SmallDesc
                    style={{
                      color: Theme.colors.whitetext,
                      marginLeft: "16px",
                    }}
                  >
                    Preserving simple beauty in modern space.
                  </SmallDesc>
                </ChairTextBox>
              </BottomChairBox>
            )}
            {sixthBanner && (
              <BottomDeskBox>
                <ImgWrapper>
                  <DeskImage src={sixthBanner.src[0]} alt={sixthBanner.name || "Bed Image"} />
                  <Link to={`/products/${sixthBanner.category}/${sixthBanner.productId}`}>
                    <DeskHoverImage src={sixthBanner.src[1]} alt="Hover Bed Image" className="hover-img" />
                  </Link>
                </ImgWrapper>
                <DesktextBox>
                  <BigTitle style={{ color: Theme.colors.whitetext }}>The Whisper of Morning Light</BigTitle>
                  <DeskMessageContainer>
                    <FirstDeskMessageBox>
                      <SmallDesc style={{ color: Theme.colors.whitetext }}>
                        The softest embrace of sun and linen, creating a peaceful moment for your deepest rest.
                      </SmallDesc>
                    </FirstDeskMessageBox>
                    <SecondDeskMessageBox>
                      <SmallDesc style={{ color: Theme.colors.whitetext }}>
                        Where the day begins with a gentle glow, we curate spaces for your own sanctuary.
                      </SmallDesc>
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
