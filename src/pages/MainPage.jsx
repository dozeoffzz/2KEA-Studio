//패키지 및 컴포넌트 임포트
import styled from "@emotion/styled";
import { useState } from "react";
import { Theme } from "../styles/theme";
import { Link } from "react-router-dom";
import LIST_DATA from "../data/imageList";
import TopArea from "../components/main/TopArea";
import ScrollReveal from "../components/common/ScrollReveal";
// 인스타
import InstagramModal from "../components/modals/InstagramModal";

//이미지 임포트
import sofaImage from "../assets/imgs/main/sofa.webp";
import lightImage from "../assets/imgs/main/light.webp";
import leftChair from "../assets/imgs/main/leftchair.webp";
import rightChair from "../assets/imgs/main/rightchair.webp";
import chairImage from "../assets/imgs/main/chair.webp";
import deskImage from "../assets/imgs/main/desk.webp";

//호버시 이미지 임포트
import sofaHover from "../assets/imgs/main/sofahover.webp";
import deskHover from "../assets/imgs/main/deskhover.webp";
import chairHover from "../assets/imgs/main/chairhover.webp";

// 컴포넌트 스타일링
// 계획서에 명시되지 않은 부분은 피그마 참고해서 작업

//전체 컨테이너
const MainSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* margin-top: -100px; */
  overflow: hidden;
`;

//상단 이미지 이후 컨테이너
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 130px;
  width: 100%;
  padding: 265px 50px 0;
`;

//소파 이미지 영역
const SofaImageBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1592px;
  height: 1111px;
  margin: 0 80px 0 140px;

  &:hover .sofa-hover-img {
    opacity: 1;
  }
`;

const SofaImage = styled.img`
  min-width: 1592px;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SofaHoverImage = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  min-width: 1592px;
  width: 100%;
  height: 100%;
  margin-left: auto;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
  cursor: pointer;
`;

const SofaDesc = styled.div`
  position: relative;
  bottom: 50px;
  right: 100px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 3;

  h3 {
    font-size: ${Theme.fontsize.desktop.title};
    line-height: ${Theme.fontsize.desktop.title};
    font-weight: 400;
  }

  span {
    font-size: ${Theme.fontsize.desktop.section};
    line-height: ${Theme.fontsize.desktop.section};
    font-weight: 400;
    margin-left: 32px;
  }
`;

//리스트 영역
const ItemList = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ListTitle = styled.p`
  font-size: ${Theme.fontsize.desktop.title};
  line-height: ${Theme.fontsize.desktop.title};
  text-align: center;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 0;
  display: flex;
  gap: 10px;
`;

const LeftSlideButton = styled.button`
  width: ${Theme.fontsize.desktop.section};
  height: ${Theme.fontsize.desktop.section};
  background-color: inherit;
  border: none;
  color: ${Theme.colors.textsecondary};
  cursor: pointer;
  transition: transform 0.3s;

  svg {
    width: ${Theme.fontsize.desktop.section};
    height: ${Theme.fontsize.desktop.section};
    fill: currentColor;
  }

  :hover {
    transform: translateY(-3px);
  }
`;

const RightSlideButton = styled(LeftSlideButton)``;

const ListImageBox = styled.div`
  width: calc((436px * 4) + (20px * 3));
  overflow: hidden;
`;

//슬라이드용 컴포넌트
const ListSlide = styled.div`
  display: flex;
  gap: 20px;
  /* 구조분해 할당: 한번에 50%씩, 2개의 이미지 이동 */
  transform: translateX(${({ slide }) => slide * -50}%);
  transition: transform 0.6s ease-in-out;
`;

const ListImageWrapper = styled.div`
  position: relative;
  width: 436px;
  height: 550px;
  flex-shrink: 0;

  &:hover .list-hover-img {
    opacity: 1;
  }
`;

const DefaultImage = styled.img`
  width: 100%;
  height: 100%;
`;

const HoverImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
`;

//전등 이미지 영역
const LightImageBox = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;
  width: 100%;
  height: 985px;
  padding: 32px;
  background-color: ${Theme.colors.redaccent};
`;

//오버플로우 방지용 컨테이너
const LightImageContainer = styled.div`
  width: 838px;
  height: 863px;
  overflow: hidden;
`;

const LightImage = styled.img`
  width: 838px;
  height: 863px;
  cursor: pointer;
  transition: transform 0.6s ease-in-out;

  :hover {
    transform: translateX(128px) translateY(-64px) scale(1.8);
  }
`;

//수직 텍스트
const LightVerticalText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: auto;

  div {
    width: 3px;
    height: 180px;
    background-color: ${Theme.colors.white};
  }

  p {
    writing-mode: vertical-lr;
    font-size: ${Theme.fontsize.desktop.title};
    font-weight: 400;
    color: ${Theme.colors.white};
    transform: rotate(180deg);
  }
`;

const LightDesc = styled.p`
  margin-top: auto;
  font-size: ${Theme.fontsize.desktop.section};
  font-weight: 400;
  color: ${Theme.colors.white};
`;

//의자 이미지 영역
const ChairImageBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1156px;
  padding: 0 38px 0;

  div {
    display: flex;
    flex-direction: column;
  }
`;

//의자 영역 텍스트
const ChairCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-left: 16px;
  transform: translateY(-45px);
`;

const TopChairComment = styled.p`
  font-size: ${Theme.fontsize.desktop.section};
  font-weight: 400;
`;

const BottomChairComment = styled(TopChairComment)`
  margin-left: auto;
`;

const ChairVerticalText = styled(LightVerticalText)`
  height: 100%;
  padding-top: 280px;
  transform: rotate(180deg);
  justify-content: center;

  div {
    background-color: ${Theme.colors.blacktext};
  }
  p {
    color: ${Theme.colors.blacktext};
  }
`;

//오버플로우 방지용 컨테이너
const LeftImageContainer = styled.div`
  width: 672px;
  height: 661px;
  overflow: hidden;
`;

const LeftChair = styled.img`
  width: 672px;
  height: 661px;
  transition: transform 0.6s ease-in-out;
  overflow: hidden;
  cursor: pointer;

  :hover {
    transform: translateX(100px) translateY(-100px) scale(1.5);
  }
`;
//오버플로우 방지용 컨테이너
const RightImageContainer = styled.div`
  width: 770px;
  height: 1156px;
  overflow: hidden;
`;

const RightChair = styled.img`
  width: 770px;
  height: 1156px;
  transition: transform 0.6s ease-in-out;
  overflow: hidden;
  cursor: pointer;

  :hover {
    transform: translateX(472px) translateY(-84px) scale(2.3);
  }
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
`;

const FirstArea = styled.div`
  position: relative;
  width: 1210px;
  height: 957px;
  margin-left: auto;
  cursor: pointer;

  div {
    position: absolute;
    top: calc(100% - 216px);
    left: -380px;
    pointer-events: none;
  }

  h3 {
    font-size: ${Theme.fontsize.desktop.title};
    font-weight: 400;
    color: ${Theme.colors.whitetext};
  }
  p {
    font-size: ${Theme.fontsize.desktop.section};
    font-weight: 400;
    color: ${Theme.colors.whitetext};
  }

  &:hover .hover-img {
    opacity: 1;
  }
`;
const SecondArea = styled.div`
  position: relative;
  width: 1329px;
  height: 1265px;
  cursor: pointer;

  &:hover .hover-img {
    opacity: 1;
  }
`;

const Desktext = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1256px;
  height: 445px;
  padding: 23px 46px;
  margin: -285px 0 0 200px;
  background-color: #0c0c0c4d;
  z-index: 2; // 이미지 뒤에 가져려서 z-index로 레이어 순서 조정
  pointer-events: none;

  div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  h3 {
    color: ${Theme.colors.whitetext};
    font-size: ${Theme.fontsize.desktop.title};
    font-weight: 400;
  }

  p {
    color: ${Theme.colors.whitetext};
    font-size: ${Theme.fontsize.desktop.section};
    font-weight: 400;
    margin-left: 450px;
  }

  span {
    color: ${Theme.colors.whitetext};
    font-size: ${Theme.fontsize.desktop.section};
    font-weight: 400;
    margin-left: 600px;
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
`;

const BottomText = styled.p`
  font-size: 100px;
  font-weight: 400;
`;

export default function MainPage() {
  const [slide, setSlide] = useState(0); //리스트 슬라이드 저장값

  //슬라이드 50%씩 이동(이동 로직은 상단 ListSlide 컴포넌트 스타일 참고)
  const nextSlide = () => {
    if (slide === 2) return; //슬라이드 값이2 즉, 100% 이동한 경우 경우 실행 X
    setSlide((prev) => prev + 1);
  };

  //이전 슬라이드 50%씩 이동
  const previousSlide = () => {
    if (!slide) return; // 슬라이드 값이 없을때 즉, 슬라이드가 실행되지 않았을때 실행 X
    setSlide((prev) => prev - 1);
  };

  // 인스타그램 qr
  const [isInstaOpen, setIsInstaOpen] = useState(true);

  return (
    <MainSection>
      <TopArea />
      <Contents>
        <ScrollReveal>
          <SofaImageBox>
            <SofaImage src={sofaImage} alt="Sofa Image" />
            <Link to={"/detailpage/1"}>
              <SofaHoverImage src={sofaHover} alt="Sofa Hover Image" className="sofa-hover-img" />
            </Link>
            <SofaDesc>
              <h3>Classic Leather, Timeless Modern</h3>
              <span>The perfect balance of warmth and structure.</span>
            </SofaDesc>
          </SofaImageBox>
        </ScrollReveal>
        <ScrollReveal>
          <ItemList>
            <ListTitle>NEW TRACE: THE COLLECTION</ListTitle>
            <ButtonContainer>
              <RightSlideButton onClick={previousSlide}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chevron-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                  />
                </svg>
              </RightSlideButton>
              <LeftSlideButton onClick={nextSlide}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </LeftSlideButton>
            </ButtonContainer>
            <ListImageBox>
              {/* 슬라이드용 컴포넌트 */}
              <ListSlide slide={slide}>
                {/* 이미지 데이터 배열 받아오기 */}
                {LIST_DATA.map((image) => (
                  <ListImageWrapper key={image.id}>
                    <DefaultImage src={image.defaultSrc} alt={`List Image ${image.id}`} />
                    <HoverImage src={image.hoverSrc} alt={`Hover List Image ${image.id}`} className="list-hover-img" />
                  </ListImageWrapper>
                ))}
              </ListSlide>
            </ListImageBox>
          </ItemList>
        </ScrollReveal>
        <ScrollReveal>
          <LightImageBox>
            <LightImageContainer>
              <Link to={"/detailpage/1"}>
                <LightImage src={lightImage} alt="Light Image" />
              </Link>
            </LightImageContainer>
            <LightVerticalText>
              <p>For Deep Sleep and Dream</p>
              <div></div>
            </LightVerticalText>
            <LightDesc>
              "The Light of Night,
              <br />
              Your Gentle Companion."
              <br />
              <br />
              Leave the day’s exhaustion behind
              <br />
              and return to the warmth of
              <br />
              your own private sanctuary.
              <br />
              <br />
              Where the soft touch of linen meets
              <br />
              a subtle glow, we curate the moments
              <br />
              where your night becomes brighter.
            </LightDesc>
          </LightImageBox>
        </ScrollReveal>
        <ScrollReveal>
          <ChairImageBox>
            <div>
              <LeftImageContainer>
                <Link to={"/detailpage/1"}>
                  <LeftChair src={leftChair} alt="Left Chair Image" />
                </Link>
              </LeftImageContainer>
              <ChairCommentContainer>
                <TopChairComment>
                  Every fiber is crafted to hold
                  <br />
                  the warmth of your home. Beyond
                  <br />
                  the visual elegance, we focus on
                </TopChairComment>
                <BottomChairComment>
                  the tactile experience that touches
                  <br />
                  your soul in a sanctuary of peace.
                </BottomChairComment>
              </ChairCommentContainer>
            </div>
            <ChairVerticalText>
              <p>The Texture of Softness</p>
              <div></div>
            </ChairVerticalText>
            <RightImageContainer>
              <Link to={"/detailpage/1"}>
                <RightChair src={rightChair} alt="Right Chair Image" />
              </Link>
            </RightImageContainer>
          </ChairImageBox>
        </ScrollReveal>
        <ScrollReveal>
          <BottomImageBox>
            <FirstArea>
              <ChairImage src={chairImage} alt="Desk Image" />
              <Link to={"/detailpage/1"}>
                <ChairHoverImage src={chairHover} alt="Hover Desk Image" className="hover-img" />
              </Link>
              <div>
                <h3>TIMELESS TRACE</h3>
                <p>Preserving simple beauty in modern space.</p>
              </div>
            </FirstArea>
            <SecondArea>
              <DeskImage src={deskImage} alt="Bed Image" />
              <Link to={"/detailpage/1"}>
                <DeskHoverImage src={deskHover} alt="Hover Bed Image" className="hover-img" />
              </Link>
              <Desktext>
                <h3>The Whisper of Morning Light</h3>
                <div>
                  <p>
                    The softest embrace of sun and
                    <br />
                    linen, creating a peaceful moment
                    <br />
                    for your deepest rest.
                  </p>
                  <span>
                    Where the day begins with a
                    <br />
                    gentle glow, we curate spaces
                    <br />
                    for your own sanctuary.
                  </span>
                </div>
              </Desktext>
            </SecondArea>
          </BottomImageBox>
        </ScrollReveal>
      </Contents>
      <ScrollReveal>
        <BottomTextContainer>
          <BottomText>STUDIO</BottomText>
        </BottomTextContainer>
      </ScrollReveal>
      {/* 인스타 qr */}
      <InstagramModal isOpen={isInstaOpen} onClose={() => setIsInstaOpen(false)} />
    </MainSection>
  );
}
