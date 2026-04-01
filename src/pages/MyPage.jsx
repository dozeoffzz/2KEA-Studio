import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { Theme } from "../styles/theme";
import { authMeApi } from "../apis/authMeApi";
import { useCartStore } from "../stores/useCartStore";
import defaultProfile from "../assets/icons/defaultProfile.svg";
import { NavLink } from "react-router-dom";

const MyPageContainer = styled.div`
  position: relative;
  margin-top: 180px;
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

const ProfileWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 600px;
`;

const ProfileInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  font-size: ${Theme.fontsize.desktop.medium};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

const ProfileInfo = styled.div`
  display: flex;
`;

const ProfileBuy = styled.div`
  padding: 10px 0 20px 0;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid ${Theme.colors.black};
`;

const ProfileStatus = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const ProfileCart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ProfileDelivery = styled(ProfileCart)``;
const ProfileDeliveryDone = styled(ProfileCart)``;

const ProfileImg = styled.div`
  margin-bottom: 65px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  ${({ theme }) => theme.media.tablet} {
    width: 100px;
    height: 100px;
  }
  ${({ theme }) => theme.media.mobile} {
    width: 100px;
    height: 100px;
  }
`;
const ImgEdit = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.blacktext};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.medium};
  }
`;
const UserType = styled.p`
  position: absolute;
  right: -20px;
  bottom: -20px;
  text-align: right;
  font-size: ${Theme.fontsize.desktop.medium};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
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
    width: 300px;
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
    min-width: 550px;
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

const NameWrap = styled.div`
  position: absolute;
  top: -20px;
  left: 0;
  font-size: ${Theme.fontsize.desktop.content};
  text-align: left;
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

const RecentItemContainer = styled.div`
  display: flex;
  gap: 30px;
`;
const RecentItemWrap = styled.div`
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
`;

const RecentItemImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default function MyPage() {
  const [isEdit, setIsEdit] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  // useCartStore에서 카트 아이템 갯수 가져오기
  const cartItem = useCartStore((state) => state.cartItems);
  // 프로필 이미지 변경을 위한 상태값
  const [profileImg, setProfileImg] = useState(defaultProfile);
  // 수정사항을 저장하기 위한 상태값
  const [editData, setEditData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  // 최근 본 상품 리스트를 가져오기 위한 상태값
  const [recentProducts, setRecentProducts] = useState([]);
  const fileInputRef = useRef(null);
  // api 연결하기
  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        const data = await authMeApi(token);

        if (data.success) {
          // 로컬스토리지에서 주소 가져오기
          const savedAddress = localStorage.getItem("address");
          // 로컬스토리지에서 이미지 저장갑 가져오기
          const savedImg = localStorage.getItem("profileImg");
          // 입력한 주소 또는 기본주소
          setUserInfo({ ...data.userInfo, address: savedAddress || "서울특별시 강남구 테헤란로 123" });
          // 저장한 이미지가 있다면 불러오기
          if (savedImg) {
            setProfileImg(savedImg);
          }
        }
      } catch (error) {
        console.error("false", error);
      }
    }
    fetchUser();
  }, []);
  // 이미지 변경 로직
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    // edit눌렀을때 이미지 변경할 수 있는 로직
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImg(reader.result);
    };
    reader.readAsDataURL(file);
  }
  // edit버튼 클릭 시 input 열기
  function handleEditClick() {
    fileInputRef.current.click();
  }
  // 수정 값 저장하기
  function handleSave() {
    // api로 주소는 안 받아오니까 로컬스토리지에 저장
    localStorage.setItem("address", editData.address);
    // 이미지 변경값 저장
    localStorage.setItem("profileImg", profileImg);
    // 유저 정보,수정 정보 저장
    setUserInfo({
      ...userInfo,
      ...editData,
    });
    setIsEdit(false);
    alert("정보가 수정되었습니다.");
    // 수정 완료후 스크롤 위로 올라가게
    window.scrollTo(0, 0);
  }

  // 수정 누를 때 값 입력하기
  function handleEditToggle() {
    if (!isEdit) {
      setEditData({
        name: userInfo?.name || "",
        phone: userInfo?.mobile || "",
        email: userInfo?.email || "",
        address: userInfo?.address || "",
      });
    }
    setIsEdit(!isEdit);
  }
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentProducts")) || [];
    setRecentProducts(stored);
  }, []);
  return (
    <MyPageContainer>
      <ProfileWrap>
        <ProfileImg>
          {isEdit ? (
            <NameWrap>
              <Input value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
            </NameWrap>
          ) : (
            <NameWrap>
              <p>{userInfo?.name || "USER NAME"}</p>
            </NameWrap>
          )}
          <img src={profileImg} alt="프로필 이미지" />
          {isEdit ? <ImgEdit onClick={handleEditClick}>Edit</ImgEdit> : null}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <UserType>*{userInfo?.userType}</UserType>
        </ProfileImg>
        <ProfileInfoWrap>
          <ProfileInfo>
            <p>최근 3개월</p>
          </ProfileInfo>
          <ProfileBuy>
            <p>구매 금액:0</p>
            <p>구매 건수:0</p>
            <p>보유 P:1,220p</p>
          </ProfileBuy>
          <ProfileStatus>
            <ProfileCart>
              <p>쇼핑카트</p>
              <p>{cartItem.length}</p>
            </ProfileCart>
            <ProfileDelivery>
              <p>배송 중</p>
              <p>0</p>
            </ProfileDelivery>
            <ProfileDeliveryDone>
              <p>배송 완료</p>
              <p>0</p>
            </ProfileDeliveryDone>
          </ProfileStatus>
        </ProfileInfoWrap>
      </ProfileWrap>
      <UserTypeText>*개인/사업자 변경은 문의 후 변경가능합니다.</UserTypeText>
      <MyInfo>
        <IdWrap>
          <p>Id</p>
          <p>{userInfo?.loginId}</p>
        </IdWrap>
        {isEdit ? (
          <MobileWrap>
            <p>Phone</p>
            <Input value={editData.phone} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} />
          </MobileWrap>
        ) : (
          <MobileWrap>
            <p>Phone</p>
            <p></p>
          </MobileWrap>
        )}
        {isEdit ? (
          <EmailWrap>
            <p>Email</p>
            <Input value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} />
          </EmailWrap>
        ) : (
          <EmailWrap>
            <p>Email</p>
            <p></p>
          </EmailWrap>
        )}
        {isEdit ? (
          <div>
            <AddressWrap>
              <p>Address</p>
              <Input value={editData.address} onChange={(e) => setEditData({ ...editData, address: e.target.value })} />
            </AddressWrap>
          </div>
        ) : (
          <div>
            <AddressWrap>
              <p>Address</p>
              <p>{userInfo?.address}</p>
            </AddressWrap>
          </div>
        )}
      </MyInfo>
      {isEdit ? <Button onClick={handleSave}>완료</Button> : <Button onClick={handleEditToggle}>수정</Button>}
      <RecentItemWrap>
        <p>최근 본 상품</p>
        <div>
          {recentProducts.length === 0 ? (
            <p>최근 본 상품이 없습니다.</p>
          ) : (
            <RecentItemContainer>
              {recentProducts.map((item) => (
                <NavLink to={`/products/${item.category}/${item.id}`}>
                  <RecentItem key={item.id}>
                    <RecentItemImg src={item.img} alt={item.name} />
                    <p>{item.name}</p>
                  </RecentItem>
                </NavLink>
              ))}
            </RecentItemContainer>
          )}
        </div>
      </RecentItemWrap>
    </MyPageContainer>
  );
}
