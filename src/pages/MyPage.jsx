import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { Theme } from "../styles/theme";
import { authMeApi } from "../apis/authMeApi";
import { useCartStore } from "../stores/useCartStore";
import defaultProfile from "../assets/icons/defaultProfile.svg";
import { NavLink } from "react-router-dom";
import MyProfile from "../components/common/MyProfile";
import SideMenuBar from "../components/common/SideMenuBar";

const MyPageContainer = styled.div`
  position: relative;
  /* margin-top: 180px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;

  ${({ theme }) => theme.media.tablet} {
    height: auto;
  }
  ${({ theme }) => theme.media.mobile} {
    height: auto;
  }
`;

const UserTypeText = styled.p`
  margin-top: 10px;
  text-align: right;
  width: 600px;
  font-size: ${Theme.fontsize.desktop.mini};
  color: red;
  ${({ theme }) => theme.media.tablet} {
    width: 550px;
  }
  ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`;

const MyInfo = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  min-width: 500px;
  font-size: ${Theme.fontsize.desktop.medium};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
    min-width: 500px;
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
    min-width: 300px;
  }
`;

// outline 제거하고 border-bottom만 남기고 카트 회원가입처럼 디자인 유지
const Input = styled.input`
  width: 80%;
  text-align: right;
  outline: none;
  border: none !important;
  border-bottom: 1px solid ${Theme.colors.black};
  background: transparent;
  font-size: ${Theme.fontsize.desktop.medium};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

const MobileWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${Theme.colors.black};
  width: 100%;
  padding-bottom: 10px;
  letter-spacing: 0.03rm;

  ${({ theme }) => theme.media.tablet} {
    width: 100%;
  }
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;

const EmailWrap = styled(MobileWrap)``;
const AddressWrap = styled(MobileWrap)``;
const IdWrap = styled(MobileWrap)``;

// 에러 메시지
const ErrorMsg = styled.p`
  font-size: ${Theme.fontsize.desktop.small};
  text-align: right;
  color: ${Theme.colors.redaccent};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.small};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

// 폰 010 고정  중간, 끝 가로로 묶는 박스
const PhoneInputWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;
  flex: 1;
`;

// 010 고정 텍스트랑 - 고정
const PhoneFixed = styled.span`
  font-size: ${Theme.fontsize.desktop.medium};
  white-space: nowrap;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

// 중간이랑 끝 4자리
const PhonePartInput = styled.input`
  width: 55px;
  text-align: center;
  outline: none;
  border: none;
  font-size: ${Theme.fontsize.desktop.medium};
  background: transparent;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
    width: 45px;
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
    width: 38px;
  }
`;

const Button = styled.button`
  margin: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 40px;
  font-size: ${Theme.fontsize.desktop.medium};
  background-color: ${Theme.colors.black};
  color: ${Theme.colors.whitetext};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.tablet.small};
  }
`;

const HeartItem = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonWrap = styled.div`
  margin-bottom: 10px;
  display: flex;
  gap: 20px;
`;

const ButtonIcon = styled.button`
  font-size: ${Theme.fontsize.desktop.section};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.section};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.tablet.small};
  }
`;

const RecentItemWrap = styled.div`
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RecentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: right;
  width: 200px;
  height: 294px;

  ${({ theme }) => theme.media.tablet} {
  }
  ${({ theme }) => theme.media.mobile} {
    width: 156px;
    height: 239px;
  }
`;

const RecentItemImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SliderWrapper = styled.div`
  overflow: hidden;
  width: 890px;

  ${({ theme }) => theme.media.tablet} {
    width: 660px;
  }
  ${({ theme }) => theme.media.mobile} {
    width: 342px;
  }
`;

const SliderTrack = styled.div`
  display: flex;
  gap: 30px;
  transition: transform 0.5s ease;
`;

export default function MyPage() {
  const [isEdit, setIsEdit] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  // useCartStore에서 카트 아이템 갯수 가져오기
  const cartItem = useCartStore((state) => state.cartItems);
  // 프로필 이미지 변경을 위한 상태값
  const [profileImg, setProfileImg] = useState(defaultProfile);

  // 수정사항을 저장하기 위한 상태값
  // 폰 phoneMid, phoneEnd 로 분리
  const [editData, setEditData] = useState({
    name: "",
    phoneMid: "",
    phoneEnd: "",
    email: "",
    address: "",
  });

  // 폰 중간 4자리 입력하면 끝번호로 자동 이동
  const phoneEndRef = useRef(null);

  // 에러 상태값
  const [errors, setErrors] = useState({});
  // 에러 메시지 상태값
  const [msgs, setMsgs] = useState({});

  // 최근 본 상품 리스트를 가져오기 위한 상태값
  const [recentProducts, setRecentProducts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("recentProducts")) || [];
    } catch {
      return [];
    }
  });

  const [orderData, setOrderData] = useState({
    totalQuantity: 0,
    totalPrice: 0,
    point: 0,
    delivery: { inDelivery: 0, done: 0 },
  });
  useEffect(() => {
    // 상품 주문한 아이템
    const order = JSON.parse(localStorage.getItem("orderData")) || {};
    // 주문하고 얻은 포인트
    const point = Number(localStorage.getItem("point") || 0);
    // 배송중,배송완료 상태
    const delivery = JSON.parse(localStorage.getItem("delivery")) || {
      inDelivery: 0,
      done: 0,
    };

    setOrderData({
      // 주문한 총 갯수
      totalQuantity: order.totalQuantity || 0,
      // 주문한 총 갯수
      totalPrice: order.totalPrice || 0,
      // 포인트
      point,
      // 배송 상태
      delivery,
    });
  }, []);

  // api 연결하기
  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        const data = await authMeApi(token);
        if (data.success) {
          // 로컬스토리지에서 주소 가져오기
          const savedAddress = localStorage.getItem("address");
          // 로컬스토리지에서 주소 가져오기
          const savedImg = localStorage.getItem("profileImg");
          // 입력한 주소 또는 기본주소
          setUserInfo({
            ...data.userInfo,
            address: savedAddress || "서울특별시 강남구 테헤란로 123",
          });
          // 저장한 이미지가 있다면 불러오기
          if (savedImg) setProfileImg(savedImg);
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchUser();
  }, []);

  const fileInputRef = useRef(null);

  // 이미지 변경 로직
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // edit버튼 클릭 시 input 열기
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImg(reader.result);
      localStorage.setItem("profileImg", reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 이미지 변경값 저장
  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  // 입력 핸들러 카트, 회원가입이랑 동일하게
  function handleInput(e) {
    const { name, value } = e.target;
    let okValue = value;

    // 폰 중간이랑 끝 숫자만 4자리로 입력
    if (name === "phoneMid" || name === "phoneEnd") {
      okValue = value.replace(/[^0-9]/g, "");
      if (okValue.length > 4) return;
    }

    // 이름 한글만 입력
    if (name === "name") {
      okValue = value.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
    }

    // 이메일 한글 못쓰게
    if (name === "email") {
      okValue = value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
    }

    setEditData((prev) => ({ ...prev, [name]: okValue }));

    // 입력하면 에러 없애기
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
      setMsgs((prev) => ({ ...prev, [name]: "" }));
    }

    // 폰 중간 4자리 입력하면 끝번호로 자동 이동
    if (name === "phoneMid" && okValue.length === 4) {
      phoneEndRef.current.focus();
    }
  }

  // 유효성 검사
  function validateEdit() {
    let newErrors = {};
    let newMsgs = {};

    // 이름 한글만 2~10글자
    const nameRegex = /^[가-힣]{2,10}$/;
    if (!editData.name.trim()) {
      newErrors.name = true;
      newMsgs.name = "이름을 입력해주세요";
    } else if (!nameRegex.test(editData.name)) {
      newErrors.name = true;
      newMsgs.name = "이름은 한글로 2~10글자 입력해주세요";
    }

    // 폰 중간, 끝 각 4자리
    if (!editData.phoneMid.trim() || !editData.phoneEnd.trim()) {
      newErrors.phoneMid = true;
      newMsgs.phoneMid = "전화번호를 입력해주세요";
    } else if (editData.phoneMid.length < 4 || editData.phoneEnd.length < 4) {
      newErrors.phoneMid = true;
      newMsgs.phoneMid = "전화번호는 각 4자리씩 입력해주세요";
    }

    // 이메일
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!editData.email.trim()) {
      newErrors.email = true;
      newMsgs.email = "이메일을 입력해주세요";
    } else if (!emailRegex.test(editData.email)) {
      newErrors.email = true;
      newMsgs.email = "이메일 형식이 올바르지 않습니다";
    }

    // 주소는 빈칸 체크
    if (!editData.address.trim()) {
      newErrors.address = true;
      newMsgs.address = "주소를 입력해주세요";
    }

    setErrors(newErrors);
    setMsgs(newMsgs);

    // 에러 없으면 저장하고 진행
    return Object.keys(newErrors).length === 0;
  }

  // 수정 값 저장하기
  const handleSave = () => {
    // 저장 전 유효성 검사 통과해야 저장됨
    const isValid = validateEdit();
    if (!isValid) return;

    // api로 주소는 안 받아오니까 로컬스토리지에 저장
    localStorage.setItem("address", editData.address);
    // 이미지 변경값 저장
    localStorage.setItem("profileImg", profileImg);
    // 폰 phoneMid, phoneEnd 합쳐서 저장
    setUserInfo((prev) => ({
      ...prev,
      ...editData,
      phone: `010-${editData.phoneMid}-${editData.phoneEnd}`,
    }));
    setIsEdit(false);
    // 수정 누를 때 값 입력하기
    window.scrollTo(0, 0);
  };

  // 수정 누를 때 값 입력하기
  const handleEditToggle = () => {
    if (!isEdit) {
      // 폰 중간이랑 끝 분리
      const phoneParts = (userInfo?.phone || "").split("-");
      setEditData({
        name: userInfo?.name || "",
        phoneMid: phoneParts[1] || "",
        phoneEnd: phoneParts[2] || "",
        email: userInfo?.email || "",
        address: userInfo?.address || "",
      });
      // 수정버튼 누르면 에러 초기화
      setErrors({});
      setMsgs({});
    }
    setIsEdit(!isEdit);
  };

  // 최근 본 상품 슬라이드

  // 현재 페이지
  const [currentIndex, setCurrentIndex] = useState(0);
  // 제품이미지 크기 + gap
  // 데스크탑,테블릿,모바일 크기에 따라 얼마나 움직일지
  const itemWidth =
    window.innerWidth <= 767 ? 186 : window.innerWidth <= 1024 ? 230 : 230;

  const visibleCount =
    window.innerWidth <= 767
      ? 2 // 모바일 2개 보이게 하기
      : window.innerWidth <= 1024
        ? 3 // 태블릿 3개 보이게
        : 4; // 데스크탑 4개 보이게

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = recentProducts.length - visibleCount;
      if (prev >= maxIndex) return prev;
      return Math.min(prev + 2, maxIndex);
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 2, 0));
  };

  const translateX = -(currentIndex * itemWidth);

  return (
    <MyPageContainer>
      <MyProfile
        userInfo={userInfo}
        orderData={orderData}
        cartItem={cartItem}
        isEdit={isEdit}
        editData={editData}
        setEditData={setEditData}
        profileImg={profileImg}
        handleEditClick={handleEditClick}
        handleImageChange={handleImageChange}
        fileInputRef={fileInputRef}
      />
      <UserTypeText>*개인/사업자 변경은 문의 후 변경가능합니다.</UserTypeText>

      <MyInfo>
        <IdWrap>
          <p>Id</p>
          <p>{userInfo?.loginId}</p>
        </IdWrap>

        {/* 이름 수정할때 인풋으로 */}
        <MobileWrap>
          <p>NIckname</p>
          {isEdit ? (
            <Input
              name="name"
              value={editData.name}
              onChange={handleInput}
              placeholder="한글 2~10글자"
            />
          ) : (
            <p>{userInfo?.name}</p>
          )}
        </MobileWrap>
        {/* 이름 에러 메시지 */}
        {isEdit && msgs.name && <ErrorMsg>{msgs.name}</ErrorMsg>}

        {/* 폰 수정모드면 010 고정 + 중간, 끝 입력 */}
        <MobileWrap>
          <p>Phone</p>
          {isEdit ? (
            <PhoneInputWrap>
              {/* 010 readOnly input으로 고정 - 다른 입력창이랑 높이 맞추기 */}
              <PhonePartInput
                value="010"
                readOnly
                style={{
                  width: "35px",
                  cursor: "default",
                  letterSpacing: "0.03em",
                }}
              />
              {/* 첫번째 - */}
              <PhoneFixed>-</PhoneFixed>
              {/* 중간 4자리 입력하면 끝번호로 자동 이동 */}
              <PhonePartInput
                name="phoneMid"
                type="text"
                value={editData.phoneMid}
                placeholder="0000"
                maxLength="4"
                inputMode="numeric"
                onChange={handleInput}
              />
              {/* 두번째 - */}
              <PhoneFixed>-</PhoneFixed>
              {/* 끝 4자리 */}
              <PhonePartInput
                name="phoneEnd"
                type="text"
                value={editData.phoneEnd}
                placeholder="0000"
                maxLength="4"
                inputMode="numeric"
                ref={phoneEndRef}
                onChange={handleInput}
              />
            </PhoneInputWrap>
          ) : (
            <p>{userInfo?.phone}</p>
          )}
        </MobileWrap>
        {/* 폰 에러 메시지 */}
        {isEdit && msgs.phoneMid && <ErrorMsg>{msgs.phoneMid}</ErrorMsg>}

        <EmailWrap>
          <p>Email</p>
          {isEdit ? (
            <Input
              name="email"
              value={editData.email}
              onChange={handleInput}
              placeholder="이메일 입력"
            />
          ) : (
            <p>{userInfo?.email}</p>
          )}
        </EmailWrap>
        {/* 이메일 에러 메시지 */}
        {isEdit && msgs.email && <ErrorMsg>{msgs.email}</ErrorMsg>}

        <AddressWrap>
          <p>Address</p>
          {isEdit ? (
            <Input
              name="address"
              value={editData.address}
              onChange={handleInput}
              placeholder="주소 입력"
            />
          ) : (
            <p>{userInfo?.address}</p>
          )}
        </AddressWrap>
        {/* 주소 에러 메시지 */}
        {isEdit && msgs.address && <ErrorMsg>{msgs.address}</ErrorMsg>}
      </MyInfo>

      <Button onClick={isEdit ? handleSave : handleEditToggle}>
        {isEdit ? "완료" : "수정"}
      </Button>

      <RecentItemWrap>
        {recentProducts.length === 0 ? (
          <p>최근 본 상품이 없습니다.</p>
        ) : (
          <div>
            <HeartItem>
              <p>관심 상품</p>
              <ButtonWrap>
                <ButtonIcon onClick={handlePrev}>&lt;</ButtonIcon>
                <ButtonIcon onClick={handleNext}>&gt;</ButtonIcon>
              </ButtonWrap>
            </HeartItem>
            <SliderWrapper>
              <SliderTrack style={{ transform: `translateX(${translateX}px)` }}>
                {recentProducts.map((item) => (
                  <NavLink
                    to={`/products/${item.category}/${item.id}`}
                    key={item.id}
                  >
                    <RecentItem>
                      <RecentItemImg src={item.img} />
                      <p>{item.name}</p>
                    </RecentItem>
                  </NavLink>
                ))}
              </SliderTrack>
            </SliderWrapper>
          </div>
        )}
      </RecentItemWrap>
      <SideMenuBar />
    </MyPageContainer>
  );
}
