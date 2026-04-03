import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
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
  min-width: 600px;
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

const Input = styled.input`
  width: 80%;
  text-align: right;
  outline: 1px solid ${Theme.colors.black};
`;
const MobileWrap = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${Theme.colors.black};
  width: 100%;
  padding-bottom: 10px;

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
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: right;
  width: 200px;
  height: 250px;

  ${({ theme }) => theme.media.tablet} {
  }
  ${({ theme }) => theme.media.mobile} {
    width: 156px;
    height: 195px;
  }
`;

const ItemName = styled.p`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  font-size: ${Theme.fontsize.desktop.small};
`;

const RecentItemImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.9s ease;
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
  // 이미지 호버시 변경을 위해 상태값 저장
  const [hoverImg, setHoverImg] = useState(null);

  // 수정사항을 저장하기 위한 상태값
  const [editData, setEditData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
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
          const savedUser = JSON.parse(localStorage.getItem("userInfo"));
          // 로컬스토리지에서 주소 가져오기
          const savedAddress = localStorage.getItem("address");
          // 로컬스토리지에서 이미지 가져오기
          const savedImg = localStorage.getItem("profileImg");
          // 입력한 주소 또는 기본주소
          const finalUser = {
            ...data.userInfo,
            ...(savedUser || {}),
            address: savedAddress || data.userInfo.address,
          };

          setUserInfo(finalUser);
          // 저장한 이미지가 있다면 불러오기
          if (savedImg) setProfileImg(savedImg);
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchUser();
  }, []);
  // 수정 값 저장하기
  const handleSave = () => {
    const updatedUser = {
      name: editData.name,
      phone: editData.phone,
      email: editData.email,
      address: editData.address,
    };

    // 로컬스토리지 저장
    localStorage.setItem("userInfo", JSON.stringify(updatedUser));

    // api로 주소는 안 받아오니까 로컬스토리지에 저장
    localStorage.setItem("address", editData.address);
    // 이미지 변경값 저장
    localStorage.setItem("profileImg", profileImg);
    // 유저 정보,수정 정보 저장
    setUserInfo((prev) => ({ ...prev, ...updatedUser }));
    setIsEdit(false);
    // 수정 누를 때 값 입력하기
    window.scrollTo(0, 0);
  };
  // 수정 누를 때 값 입력하기
  const handleEditToggle = () => {
    if (!isEdit) {
      setEditData({
        name: userInfo?.name || "",
        phone: userInfo?.phone || "",
        email: userInfo?.email || "",
        address: userInfo?.address || "",
      });
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
      />
      <UserTypeText>*개인/사업자 변경은 문의 후 변경가능합니다.</UserTypeText>
      <MyInfo>
        <IdWrap>
          <p>Id</p>
          <p>{userInfo?.loginId}</p>
        </IdWrap>
        <MobileWrap>
          <p>Phone</p>
          {isEdit ? (
            <Input
              value={editData.phone}
              onChange={(e) =>
                setEditData({ ...editData, phone: e.target.value })
              }
            />
          ) : (
            <p>{userInfo?.phone}</p>
          )}
        </MobileWrap>
        <EmailWrap>
          <p>Email</p>
          {isEdit ? (
            <Input
              value={editData.email}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
            />
          ) : (
            <p>{userInfo?.email}</p>
          )}
        </EmailWrap>
        <AddressWrap>
          <p>Address</p>
          {isEdit ? (
            <Input
              value={editData.address}
              onChange={(e) =>
                setEditData({ ...editData, address: e.target.value })
              }
            />
          ) : (
            <p>{userInfo?.address}</p>
          )}
        </AddressWrap>
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
                {recentProducts.map((item, index) => (
                  <NavLink
                    to={`/products/${item.category}/${item.id}`}
                    key={item.id}
                  >
                    <RecentItem
                      onMouseEnter={() => setHoverImg(index)}
                      onMouseLeave={() => setHoverImg(null)}
                    >
                      <RecentItemImg
                        src={item.img[0]}
                        alt={item.name}
                        visible={hoverImg !== index}
                      />
                      <RecentItemImg
                        src={item.img[1]}
                        alt={item.name}
                        visible={hoverImg === index}
                      />
                    </RecentItem>
                    <ItemName>{item.name}</ItemName>
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
